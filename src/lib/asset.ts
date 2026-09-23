/*
 * Resolves a path inside public/ against Vite's base URL.
 *
 * Vite rewrites the asset references it processes itself — imports, url() in
 * CSS, and public/ references in index.html. It does NOT touch string literals
 * inside components, so a hard-coded "/images/hero.webp" reaches the browser
 * unchanged. That works when the site is served from a domain root and silently
 * 404s when it is served from a sub-path, which is exactly what the GitHub Pages
 * project-site preview does: the images vanished and every structural check
 * still passed, because the file existed and the URL resolved — just not there.
 *
 * Build every public/ path through this helper so the deploy target decides the
 * prefix. See vite.config.ts for SITE_BASE.
 */
const BASE = import.meta.env.BASE_URL;

export function asset(path: string): string {
  return `${BASE}${path.replace(/^\/+/, "")}`;
}
