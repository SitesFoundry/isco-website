/*
 * Completes dist/ after `vite build`.
 *
 * GitHub Pages serves `404.html` for any path it cannot resolve to a real file.
 * This site is a single-page app, so a deep link such as
 * /products/boiler/combi-boiler-link is not a file on disk. Publishing a copy
 * of index.html as 404.html lets the app boot on those paths and route them
 * client-side, instead of showing GitHub's own 404 page.
 *
 * The trade-off is the HTTP status code: those responses are 404 even though
 * the page renders correctly, and crawlers see that. Replacing this with real
 * per-route HTML is the SEO follow-up noted in README.md.
 *
 * Every step asserts that it actually produced output — a copy that silently
 * does nothing is worse than no copy, because the site looks fine until a deep
 * link is opened.
 */
import { copyFile, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dist = join(import.meta.dirname, "..", "dist");
const index = join(dist, "index.html");
const notFound = join(dist, "404.html");
const sitemap = join(dist, "sitemap.xml");

/** Read the boiler slugs straight from the product data so the sitemap cannot
 *  drift away from the pages the app can actually render. */
async function boilerSlugs() {
  const source = await readFile(
    join(import.meta.dirname, "..", "src", "data", "boilerProducts.ts"),
    "utf8",
  );
  const slugs = [...source.matchAll(/slug:\s*["']([^"']+)["']/g)].map(
    (m) => m[1],
  );
  if (slugs.length === 0) {
    throw new Error(
      "postbuild: found no `slug:` entries in src/data/boilerProducts.ts — " +
        "the sitemap would be published without any product pages",
    );
  }
  return [...new Set(slugs)].sort();
}

// --- 404.html: the SPA fallback for deep links ------------------------------
const built = await stat(index).catch(() => null);
if (!built || built.size === 0) {
  throw new Error(`postbuild: ${index} is missing or empty — did the build run?`);
}
await copyFile(index, notFound);

const copied = await stat(notFound);
if (copied.size !== built.size) {
  throw new Error(
    `postbuild: 404.html is ${copied.size} bytes but index.html is ${built.size}`,
  );
}

// --- sitemap.xml -----------------------------------------------------------
const origin = "https://www.iscogmbh.com";
const slugs = await boilerSlugs();
const urls = ["/", ...slugs.map((s) => `/products/boiler/${s}`)];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${origin}${u}</loc>
    <changefreq>monthly</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(sitemap, sitemapXml, "utf8");

const written = await stat(sitemap);
if (written.size === 0) throw new Error("postbuild: sitemap.xml is empty");

console.log(
  `postbuild: 404.html ← index.html (${copied.size} bytes); ` +
    `sitemap.xml with ${urls.length} urls (${written.size} bytes)`,
);
