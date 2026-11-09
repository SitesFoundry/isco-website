/*
 * Verifies what scripts/prerender.mjs wrote.
 *
 * The prerenderer can fail in ways that still look like a successful build: a
 * route that quietly rendered the homepage, a sitemap entry with no file
 * behind it, one title left on every page. Those are exactly the defects this
 * site shipped with for months, so the checks below assert the properties that
 * were broken, not merely that files exist.
 *
 * Runs last: `vite build && node scripts/prerender.mjs && node scripts/postbuild.mjs`
 */
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const dist = join(root, "dist");

const fail = (message) => {
  throw new Error(`postbuild: ${message}`);
};

const read = async (path) => readFile(path, "utf8").catch(() => null);

const distFileFor = (pathname) =>
  pathname === "/"
    ? join(dist, "index.html")
    : join(dist, pathname.replace(/^\//, ""), "index.html");

const titleOf = (html) => html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
const canonicalOf = (html) =>
  html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
const descriptionOf = (html) =>
  html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
const robotsOf = (html) =>
  html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
const ogImageOf = (html) =>
  html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] ?? "";

/** Visible words, with tags and scripts removed. */
const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// --- the shell ---------------------------------------------------------------
const home = await read(join(dist, "index.html"));
if (!home) fail("dist/index.html is missing — did the prerender run?");

if (home.includes("seo:start") || home.includes("seo:end")) {
  fail("index.html still contains the seo markers — the head was not replaced");
}
if (!home.includes('<div id="root">')) fail("index.html has no #root element");
if (home.match(/<div id="root"><\/div>/)) {
  fail("index.html has an empty #root — nothing was prerendered into it");
}

// --- sitemap ----------------------------------------------------------------
const sitemap = await read(join(dist, "sitemap.xml"));
if (!sitemap) fail("sitemap.xml is missing");

const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length < 20) {
  fail(`sitemap.xml lists only ${urls.length} urls — the catalogue is larger`);
}

const origin = "https://www.iscogmbh.com";
for (const url of urls) {
  if (!url.startsWith(`${origin}/`)) {
    fail(`sitemap url ${url} is not on ${origin}`);
  }
}

const paths = urls.map((url) => url.slice(origin.length) || "/");
if (new Set(paths).size !== paths.length) {
  fail("sitemap.xml contains duplicate urls");
}
if (paths.includes("/404")) fail("the 404 page must not be in the sitemap");

// --- every advertised page is a real, distinct, indexable document ----------
const titles = new Map();
const descriptions = new Map();
let checked = 0;

for (const path of paths) {
  const file = distFileFor(path);
  const exists = await stat(file).catch(() => null);
  if (!exists || exists.size === 0) {
    // This is the defect that matters most: a sitemap advertising a URL that
    // returns 404 is worse than no sitemap, because it is a claim we make.
    fail(`sitemap advertises ${path} but ${file} does not exist`);
  }

  const html = await read(file);
  if (!html) fail(`${file} is unreadable`);

  const title = titleOf(html);
  const description = descriptionOf(html);
  const canonical = canonicalOf(html);

  if (!title) fail(`${path} has no <title>`);
  if (title.length > 65) {
    fail(`${path} has a ${title.length}-character title: "${title}"`);
  }
  if (!description || description.length < 70) {
    fail(`${path} has a missing or too-short description`);
  }
  if (description.length > 165) {
    fail(`${path} has a ${description.length}-character description`);
  }
  if (canonical !== `${origin}${path === "/" ? "/" : path}`) {
    fail(
      `${path} declares canonical ${canonical || "(none)"} — it must point at ` +
        "its own URL",
    );
  }
  if (robotsOf(html) !== "index, follow") {
    fail(`${path} is not indexable (robots: ${robotsOf(html) || "none"})`);
  }
  if (!html.includes('id="root">')) fail(`${path} has an empty #root`);

  // A prerendered page is only worth having if the content and the entity
  // markup actually made it into the document.
  const text = textOf(html);
  if (text.length < 500) {
    fail(`${path} contains only ${text.length} characters of text`);
  }
  if ((html.match(/<h1/g) || []).length !== 1) {
    fail(`${path} must contain exactly one <h1>`);
  }

  const image = ogImageOf(html);
  if (!image.startsWith(`${origin}/`)) {
    fail(`${path} has a relative or missing og:image (${image || "none"})`);
  }
  const imageFile = join(dist, decodeURIComponent(image.slice(origin.length)));
  const imageExists = await stat(imageFile).catch(() => null);
  if (!imageExists?.isFile()) {
    fail(`${path} points og:image at ${image}, which is not in dist/`);
  }

  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  if (blocks.length === 0) fail(`${path} has no JSON-LD`);
  for (const [, json] of blocks) {
    let schema;
    try {
      schema = JSON.parse(json);
    } catch {
      fail(`${path} contains invalid JSON-LD`);
    }
    if (!schema["@context"] || !schema["@type"]) {
      fail(`${path} has a JSON-LD block without @context/@type`);
    }
  }

  if (titles.has(title)) {
    fail(
      `${path} and ${titles.get(title)} share the title "${title}" — each page ` +
        "needs its own",
    );
  }
  titles.set(title, path);

  const descriptionOwner = descriptions.get(description);
  if (descriptionOwner) {
    fail(
      `${path} and ${descriptionOwner} share the same meta description`,
    );
  }
  descriptions.set(description, path);

  checked += 1;
}

// --- 404 --------------------------------------------------------------------
const notFound = await read(join(dist, "404.html"));
if (!notFound) fail("404.html is missing — deep links would show GitHub's page");
if (robotsOf(notFound) !== "noindex, follow") {
  fail("404.html must carry `noindex, follow`");
}

// --- robots.txt -------------------------------------------------------------
const robotsTxt = await read(join(dist, "robots.txt"));
if (!robotsTxt) fail("robots.txt is missing");
if (!robotsTxt.includes(`${origin}/sitemap.xml`)) {
  fail("robots.txt does not point at sitemap.xml");
}

console.log(
  `postbuild: ${checked} pages verified — unique titles and descriptions, ` +
    `self-referencing canonicals, indexable, one h1 each, prerendered text, ` +
    `reachable og:image, valid JSON-LD; 404.html noindex; sitemap and ` +
    "robots.txt agree",
);
