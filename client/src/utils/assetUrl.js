/**
 * Prepend Vite's BASE_URL to any public-folder path.
 *
 * - Local dev:      BASE_URL = '/'   →  '/images/foo.png'
 * - GitHub Pages:   BASE_URL = '/laxman-portfolio/'  →  '/laxman-portfolio/images/foo.png'
 *
 * Usage:  assetUrl('/images/profile.png')
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // strip trailing slash

export function assetUrl(path) {
  // path should start with '/'
  return `${base}${path}`;
}
