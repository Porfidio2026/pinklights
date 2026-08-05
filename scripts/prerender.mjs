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

// How many pages render at once, and the wall-clock ceiling for the whole crawl.
// Anything not rendered by the deadline is simply served as the SPA shell.
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY) || 8;
const TIME_BUDGET_MS = Number(process.env.PRERENDER_BUDGET_MS) || 5 * 60 * 1000;

// Smallest #root payload we accept as a genuine render. The SPA shell ships an
// empty #root, so anything near zero means the app failed to mount.
const MIN_RENDERED_CHARS = 500;

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

  // Chrome is not guaranteed to be present or launchable in every build
  // environment. Prerendering is a progressive enhancement for crawlers, so a
  // missing browser must degrade to shipping the plain SPA, never fail the build.
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  } catch (err) {
    console.warn(`\nSkipping prerender, could not launch Chrome: ${err.message}`);
    console.warn('The SPA build in dist/ is intact and deployable.\n');
    server.close();
    return;
  }

  let success = 0;
  let failed = 0;
  const startedAt = Date.now();

  async function renderRoute(route) {
    // Bail out rather than let a slow crawl eat the whole CI build budget.
    if (Date.now() - startedAt > TIME_BUDGET_MS) {
      failed++;
      return;
    }

    let page;
    try {
      page = await browser.newPage();

      // 'domcontentloaded' rather than 'networkidle0': analytics and error
      // reporting hold connections open, so the network never goes idle and
      // every route would burn its full timeout. The h1 wait below is what
      // actually tells us React has rendered.
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });

      await page.waitForSelector('h1', { timeout: 5000 }).catch(() => {});

      // A page that threw during module init (a missing VITE_* var, say) still
      // returns valid HTML with an empty #root. Writing that would ship a blank
      // page to crawlers while reporting success, so treat it as a failure and
      // leave the SPA fallback in place.
      const rootLength = await page.evaluate(
        () => document.getElementById('root')?.innerHTML.length ?? 0,
      );
      if (rootLength < MIN_RENDERED_CHARS) {
        throw new Error(`rendered empty (#root had ${rootLength} chars)`);
      }

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
    } catch (err) {
      console.error(`  ✗ ${route}: ${err.message}`);
      failed++;
    } finally {
      await page?.close().catch(() => {});
    }
  }

  // Render in parallel. Serial rendering of every locale variant takes tens of
  // minutes, which is longer than most CI build limits allow.
  const queue = [...SEO_ROUTES];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      let route;
      while ((route = queue.shift()) !== undefined) {
        await renderRoute(route);
      }
    }),
  );

  await browser.close();
  server.close();

  console.log(`\nPrerender complete: ${success} succeeded, ${failed} failed`);

  // Routes that failed to render simply fall back to the SPA shell, which still
  // works for users and is indexable. Failing the build here would block the
  // whole deploy over a single slow page.
  if (failed > 0) {
    console.warn(`${failed} route(s) fell back to client-side rendering.`);
  }
}

prerender().catch((err) => {
  console.error(`\nPrerender failed: ${err.message}`);
  console.error('Continuing anyway, dist/ holds a working SPA build.\n');
});
