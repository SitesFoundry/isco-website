/*
 * Writes a real HTML file for every route the app can render.
 *
 * Why this exists: the site is a single-page app, so for years every URL
 * returned the same document. Product pages carried the homepage's title, its
 * canonical and no product text at all, and GitHub Pages answered deep links
 * with HTTP 404. Search engines were told, on every page, to index the
 * homepage instead.
 *
 * This script server-renders the app once per route and stitches the result
 * into the shell Vite produced, replacing the head with that route's metadata
 * (src/lib/seo.ts). The output is a normal static site: `/products/.../` is a
 * directory with an index.html, served with HTTP 200, containing the product's
 * own title, description, structured data and readable content.
 *
 * The client is still the same React app. index.html keeps a small style sheet
 * that pins the reveal animations visible for crawlers and hides the English
 * markup from visitors about to get another language; main.tsx removes it
 * before mounting. Nothing in this file ships to the browser.
 *
 * Runs after `vite build` and before scripts/postbuild.mjs, which verifies the
 * result. Every step asserts what it produced — a prerender that silently
 * writes nothing looks exactly like a successful build.
 */
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const shellPath = join(dist, "index.html");
const ssrOut = join(root, "node_modules", ".prerender");

const SEO_START = /<!--\s*seo:start[\s\S]*?-->/;
const SEO_END = /<!--\s*seo:end\s*-->/;

/** The built client entry carries the CSS/JS tags the prerendered pages need. */
const shell = await readFile(shellPath, "utf8").catch(() => {
  throw new Error(
    `prerender: ${shellPath} is missing — run \`vite build\` first`,
  );
});

if (!SEO_START.test(shell) || !SEO_END.test(shell)) {
  throw new Error(
    "prerender: the seo:start / seo:end markers are missing from index.html. " +
      "Without them every route would keep the homepage metadata.",
  );
}

// --- Build the server bundle -------------------------------------------------
await rm(ssrOut, { recursive: true, force: true });
await build({
  root,
  configFile: join(root, "vite.config.ts"),
  logLevel: "warn",
  build: {
    ssr: "src/prerender.tsx",
    outDir: ssrOut,
    emptyOutDir: true,
    copyPublicDir: false,
    sourcemap: false,
  },
});

const serverEntry = join(ssrOut, "prerender.js");
const serverBuild = await stat(serverEntry).catch(() => null);
if (!serverBuild || serverBuild.size === 0) {
  throw new Error(`prerender: the server bundle ${serverEntry} was not built`);
}

const server = await import(pathToFileURL(serverEntry).href);
const { renderApp, getSeo, getStaticRoutes, buildHeadHtml, SITE_ORIGIN } =
  server;

/** One complete document: the shell, with this route's head and body. */
function assemble(seo, body) {
  // React 19 hoists image preloads to the top of the rendered output. They
  // belong in <head>, not inside #root, so lift them out.
  const preloadMatch = body.match(/^(?:<link\b[^>]*\/>)+/);
  const preloads = preloadMatch ? preloadMatch[0] : "";
  const markup = preloadMatch ? body.slice(preloads.length) : body;

  let html = shell;
  const start = html.match(SEO_START);
  const end = html.match(SEO_END);
  const head = `${buildHeadHtml(seo)}${preloads ? `\n    ${preloads}` : ""}`;
  html =
    html.slice(0, start.index) +
    `\n    ${head}\n    ` +
    html.slice(end.index + end[0].length);

  if (!html.includes('<div id="root"></div>')) {
    throw new Error("prerender: #root is missing from the shell");
  }
  html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

  if (!html.includes(seo.canonical)) {
    throw new Error(`prerender: head for ${seo.path} has no canonical URL`);
  }
  if (html.includes("seo:start") || html.includes("seo:end")) {
    throw new Error(`prerender: markers survived in ${seo.path}`);
  }
  return html;
}

// --- One document per route --------------------------------------------------
const routes = getStaticRoutes();
const written = [];

for (const route of routes) {
  const seo = getSeo(route.path);
  if (seo.kind === "not-found") {
    throw new Error(
      `prerender: ${route.path} resolves to the not-found page — the sitemap ` +
        "would advertise a URL the app cannot render",
    );
  }

  const body = renderApp(route.path);
  if (body.length < 500) {
    throw new Error(
      `prerender: ${route.path} rendered only ${body.length} bytes, which ` +
        "means the route did not match",
    );
  }

  const html = assemble(seo, body);
  const file =
    route.path === "/"
      ? shellPath
      : join(dist, route.path.replace(/^\//, ""), "index.html");
  await mkdir(join(file, ".."), { recursive: true });
  await writeFile(file, html, "utf8");
  written.push({ route, file, bytes: Buffer.byteLength(html) });
}

// --- 404: a real not-found page, and noindex --------------------------------
const notFoundSeo = getSeo("/this-page-does-not-exist");
if (notFoundSeo.robots !== "noindex, follow") {
  throw new Error("prerender: the 404 page must not be indexable");
}
await writeFile(
  join(dist, "404.html"),
  assemble(notFoundSeo, renderApp("/this-page-does-not-exist")),
  "utf8",
);

// --- sitemap.xml -------------------------------------------------------------
/*
 * Generated from the same route list that was just written to disk, so the
 * sitemap cannot advertise a page that was not prerendered. `lastmod` is the
 * build date: every deployment republishes the markup even when the copy has
 * not changed.
 */
const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_ORIGIN}${route.path === "/" ? "/" : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
const sitemapPath = join(dist, "sitemap.xml");
await writeFile(sitemapPath, sitemap, "utf8");
const sitemapStat = await stat(sitemapPath);
if (sitemapStat.size === 0) {
  throw new Error("prerender: sitemap.xml is empty");
}

console.log(
  `prerender: ${written.length} routes + 404.html; sitemap.xml with ` +
    `${routes.length} urls (${sitemapStat.size} bytes); largest page ` +
    `${Math.max(...written.map((w) => w.bytes))} bytes`,
);
