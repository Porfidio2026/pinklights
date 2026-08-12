/**
 * True while the page is being captured by scripts/prerender.mjs.
 *
 * Prerendering runs a real browser, so effects and data fetching happen there
 * exactly as they do for a visitor — which means anything rendered during the
 * crawl gets frozen into the static HTML and shipped until the next deploy.
 * That is fine for marketing copy and wrong for live profile data: a profile
 * removed after a build would linger in the committed HTML.
 *
 * The prerender script sets window.__PRERENDER__ before any app code runs, so
 * components can opt out of appearing in the snapshot while still rendering
 * normally for real visitors. The app mounts with createRoot rather than
 * hydrateRoot, so omitting content here cannot cause a hydration mismatch.
 */
declare global {
  interface Window {
    __PRERENDER__?: boolean;
  }
}

export const isPrerender = (): boolean =>
  typeof window !== 'undefined' && window.__PRERENDER__ === true;

export {};
