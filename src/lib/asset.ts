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

/*
 * The canonical origin. Some consumers cannot resolve a root-relative path:
 * an Open Graph or Twitter card image is fetched by a social crawler that has
 * no page to resolve against, and a structured-data URL is read by other
 * machines. Those need the origin spelled out, so it lives here once rather
 * than being repeated as a string literal at each call site.
 */
export const SITE_ORIGIN = "https://www.iscogmbh.com";

export function asset(path: string): string {
  return `${BASE}${path.replace(/^\/+/, "")}`;
}

/**
 * An absolute URL for a public/ path, for consumers outside the browser:
 * og:image, twitter:image, and structured-data image fields.
 */
export function absoluteUrl(path: string): string {
  return `${SITE_ORIGIN}${asset(path)}`;
}
