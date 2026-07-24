/**
 * Post-build prerender script.
 * Starts a local server from dist/, visits each SEO route with Puppeteer,
 * and saves the rendered HTML so crawlers get static content instantly.
 *
 * Usage: node scripts/prerender.mjs
 * Runs automatically via: npm run build (see package.json)
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;

const LOCALES = ['fr', 'nl', 'es', 'pt', 'ru', 'de'];
const CITIES = ['antwerp', 'brussels', 'ghent', 'bruges', 'liege', 'leuven', 'charleroi', 'namur'];
const GUIDES = ['how-it-works', 'safety-tips', 'first-meeting', 'for-visitors', 'profile-tips'];
const COMPARISONS = ['pinklights-vs-dating-apps', 'pinklights-vs-classified-ads', 'best-platforms-belgium'];

const ENGLISH_ROUTES = [
  '/', '/privacy', '/terms',
  '/find', ...CITIES.map(c => `/find/${c}`),
  '/guides', ...GUIDES.map(g => `/guides/${g}`),
  '/faq',
  '/compare', ...COMPARISONS.map(c => `/compare/${c}`),
  '/about', '/safety',
];

const LOCALE_ROUTES = LOCALES.flatMap(locale => [
  `/${locale}/find`, ...CITIES.map(c => `/${locale}/find/${c}`),
  `/${locale}/guides`, ...GUIDES.map(g => `/${locale}/guides/${g}`),
  `/${locale}/faq`,
  `/${locale}/compare`, ...COMPARISONS.map(c => `/${locale}/compare/${c}`),
  `/${locale}/about`, `/${locale}/safety`,
]);

const SEO_ROUTES = [...ENGLISH_ROUTES, ...LOCALE_ROUTES];

// Simple static file server for the dist/ directory
function startServer() {
  const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

  const server = createServer((req, res) => {
    const url = req.url || '/';
    const filePath = join(DIST, url);

    // Try to serve the exact file
    if (existsSync(filePath) && !filePath.endsWith('/')) {
      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const types = {
          html: 'text/html', js: 'application/javascript', css: 'text/css',
          png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
          svg: 'image/svg+xml', ico: 'image/x-icon', json: 'application/json',
          woff: 'font/woff', woff2: 'font/woff2', txt: 'text/plain',
          xml: 'application/xml',
        };
        res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
        res.end(content);
        return;
      } catch { /* fall through to SPA */ }
    }

    // SPA fallback
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

async function prerender() {
  console.log('Starting prerender...');

  const server = await startServer();
  console.log(`Server running at http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;
  let failed = 0;

  for (const route of SEO_ROUTES) {
    try {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      });

      // Wait a bit for React to finish rendering
      await page.waitForSelector('h1', { timeout: 5000 }).catch(() => {});

      const html = await page.content();

      // Determine output path
      const outPath = route === '/'
        ? join(DIST, 'index.html')
        : join(DIST, route, 'index.html');

      const outDir = dirname(outPath);
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }

      writeFileSync(outPath, html, 'utf-8');
      console.log(`  ✓ ${route}`);
      success++;

      await page.close();
    } catch (err) {
      console.error(`  ✗ ${route}: ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerender complete: ${success} succeeded, ${failed} failed`);

  if (failed > 0) {
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
