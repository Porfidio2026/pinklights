/**
 * Generates sitemap.xml from the route list.
 * Run: node scripts/generate-sitemap.mjs
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://www.pink-lights.be';
const LOCALES = ['fr', 'nl', 'es', 'pt', 'ru', 'de'];
const CITIES = ['antwerp', 'brussels', 'ghent', 'bruges', 'liege', 'leuven', 'charleroi', 'namur'];
const GUIDES = ['how-it-works', 'safety-tips', 'first-meeting', 'for-visitors', 'profile-tips'];
const COMPARISONS = ['pinklights-vs-dating-apps', 'pinklights-vs-classified-ads', 'best-platforms-belgium'];

const entries = [];

function add(path, changefreq, priority) {
  entries.push({ path, changefreq, priority });
}

// Core
add('/', 'daily', '1.0');
add('/search', 'daily', '0.8');
add('/privacy', 'yearly', '0.3');
add('/terms', 'yearly', '0.3');

// Trust
add('/about', 'monthly', '0.7');
add('/safety', 'monthly', '0.7');
add('/faq', 'monthly', '0.7');

// Cities
add('/find', 'weekly', '0.9');
CITIES.forEach(c => add(`/find/${c}`, 'weekly', '0.8'));

// Guides
add('/guides', 'monthly', '0.7');
GUIDES.forEach(g => add(`/guides/${g}`, 'monthly', '0.6'));

// Comparisons
add('/compare', 'monthly', '0.6');
COMPARISONS.forEach(c => add(`/compare/${c}`, 'monthly', '0.6'));

// Translated versions
for (const locale of LOCALES) {
  add(`/${locale}/find`, 'weekly', '0.7');
  CITIES.forEach(c => add(`/${locale}/find/${c}`, 'weekly', '0.6'));
  add(`/${locale}/guides`, 'monthly', '0.5');
  GUIDES.forEach(g => add(`/${locale}/guides/${g}`, 'monthly', '0.5'));
  add(`/${locale}/faq`, 'monthly', '0.5');
  add(`/${locale}/compare`, 'monthly', '0.5');
  COMPARISONS.forEach(c => add(`/${locale}/compare/${c}`, 'monthly', '0.5'));
  add(`/${locale}/about`, 'monthly', '0.5');
  add(`/${locale}/safety`, 'monthly', '0.5');
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url><loc>${SITE}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join('\n')}
</urlset>
`;

const outPath = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`Sitemap generated: ${entries.length} URLs → ${outPath}`);
