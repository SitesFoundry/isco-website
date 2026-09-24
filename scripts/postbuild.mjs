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

/**
 * Slugs declared inside one array of a data module.
 *
 * The slice is bounded by markers in the source rather than matched across the
 * whole file. solarProducts.ts declares both category slugs (`solar-modules`)
 * and module slugs (`450w`) with the same `slug:` key, and a whole-file regex
 * would emit /products/450w for a page that actually lives at
 * /products/solar-modules/450w — a sitemap advertising URLs that 404.
 *
 * Every step fails loudly on an empty result: a sitemap that silently omits
 * every product page is worse than a failed build.
 */
async function slugsIn(relPath, startMarker, endMarker) {
  const source = await readFile(
    join(import.meta.dirname, "..", relPath),
    "utf8",
  );
  const from = source.indexOf(startMarker);
  const to = endMarker ? source.indexOf(endMarker, from + 1) : source.length;
  if (from === -1 || to === -1) {
    throw new Error(
      `postbuild: sitemap markers not found in ${relPath} — looked for ` +
        `"${startMarker}"${endMarker ? ` … "${endMarker}"` : ""}`,
    );
  }

  const slugs = [
    ...source.slice(from, to).matchAll(/slug:\s*["']([^"']+)["']/g),
  ].map((m) => m[1]);

  if (slugs.length === 0) {
    throw new Error(
      `postbuild: no \`slug:\` entries between the markers in ${relPath} — ` +
        "the sitemap would omit those pages",
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

// Every route the app can actually render, derived from the same data the
// pages read — so the sitemap cannot drift away from the catalogue.
const boilerSlugs = await slugsIn(
  "src/data/boilerProducts.ts",
  "export const BOILER_PRODUCTS",
  "export function getBoilerBySlug",
);
const categorySlugs = await slugsIn(
  "src/data/solarProducts.ts",
  "sitemap:categories",
  "sitemap:modules",
);
const moduleSlugs = await slugsIn(
  "src/data/solarProducts.ts",
  "sitemap:modules",
  null,
);

const urls = [
  "/",
  ...boilerSlugs.map((s) => `/products/boiler/${s}`),
  ...categorySlugs.map((s) => `/products/${s}`),
  ...moduleSlugs.map((s) => `/products/solar-modules/${s}`),
];

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
