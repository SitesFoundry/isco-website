# ISCO GmbH website

Marketing site for ISCO GmbH (Solar & HVAC), served at
`https://www.iscogmbh.com`.

This is a React single-page app built with Vite and Tailwind 4, published to
GitHub Pages. It replaces the previous Manus-hosted deployment.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Three steps:

1. `vite build` writes the client bundle into `dist/`.
2. `scripts/prerender.mjs` server-renders every route and writes one HTML file
   per URL, each with its own title, description, canonical, Open Graph tags and
   JSON-LD, plus `404.html` and `sitemap.xml`. This is what makes deep links
   return HTTP 200 with real content (see below).
3. `scripts/postbuild.mjs` verifies the result: every sitemap URL has a file,
   every page has a unique title and description, every canonical points at its
   own URL, and the 404 page is `noindex`. It fails the build otherwise.

`dist/` is the only folder that gets deployed. It is generated in CI and is not
committed.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes
`dist/` to GitHub Pages. Require this one-time repository setting:

- `Settings → Pages → Build and deployment → Source`: **GitHub Actions**

### The `SITE_BASE` variable

`vite.config.ts` reads `SITE_BASE` and Vite exposes it to the app as
`import.meta.env.BASE_URL`; `src/App.tsx` hands the same value to the wouter
router. The deploy workflow sets it for the target:

| Serving context | `SITE_BASE` |
| --- | --- |
| Custom domain, from the domain root | `/` |
| GitHub Pages project-site preview (`/isco-website/`) | `/isco-website/` |

Nothing else needs to change. Asset paths built through `src/lib/asset.ts` and
the router base both follow this one value, so the two can never disagree. If
the preview URL is ever needed again, set `SITE_BASE: /isco-website/` and
redeploy.

### Custom domain

Set it under `Settings → Pages → Custom domain`, then point DNS at GitHub.

**Do not add a `CNAME` file.** It is ignored when the site is published by a
GitHub Actions workflow, and GitHub does not create or require one for this
publishing source. The setting in the repository is what counts.

DNS for this domain is managed at Cloudflare, and the records must be
**DNS only (grey cloud)**, not proxied, so that GitHub can provision the TLS
certificate itself:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `sitesfoundry.github.io` |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |

With records for both the apex and `www`, GitHub redirects the apex to
`www.iscogmbh.com`.

## Deep links and `404.html`

Every route now exists on disk as `dist/<path>/index.html`, so
`/products/boiler/olympia` is served by GitHub Pages as an ordinary file: HTTP
200, with that product's own metadata and prerendered content.

`404.html` only handles genuinely unknown paths. GitHub Pages serves it with
HTTP 404, it carries `noindex, follow`, and the app still routes client-side for
things like a mistyped product slug.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | The document shell: fonts, icons, and the `seo:start` / `seo:end` block the prerenderer replaces |
| `src/main.tsx` | Mounts the app; removes the prerender-only style first |
| `src/App.tsx` | Providers and routes; sets the router base |
| `src/lib/seo.ts` | Per-route titles, descriptions, canonicals and JSON-LD — the single source for both the prerenderer and the client |
| `src/components/SEOHead.tsx` | Updates the head after an in-app navigation |
| `src/lib/i18n.ts` | All copy, in six languages (de, en, ru, es, fr, it) |
| `src/lib/asset.ts` | Prefixes `public/` paths with the deploy base |
| `src/data/solarProducts.ts` | Solar categories and module datasheets |
| `src/data/solarSystems.ts` | Inverter and battery catalogues |
| `src/data/boilerProducts.ts` | Boiler catalogue: specs, features, images |
| `src/components/` | Page sections (Hero, About, Solar, HVAC, Why, Contact, …) and breadcrumbs |
| `src/pages/` | `Home`, `ProductCategory`, `SolarModuleDetail`, `ProductDetail`, `BoilerDetail`, `NotFound` |
| `src/hooks/useInView.ts` | Scroll-reveal; sections start at opacity 0 |
| `public/images/` | The content images; committed, never hot-linked |
| `public/robots.txt` | Allows all crawlers, points at the sitemap |
| `scripts/prerender.mjs` | Renders every route to static HTML, writes the sitemap and 404 |
| `scripts/postbuild.mjs` | Verifies titles, descriptions, canonicals and sitemap coverage |

## Images

All eleven content images live in `public/images/` and are committed. They were
previously hot-linked to Manus's CloudFront bucket
(`d2xsxph8kpxj0f.cloudfront.net`), which meant the site would have lost every
image the moment the Manus account lapsed. Nothing in this repository references
Manus, Cloudflare, or any external image host.

**Build every image path through `asset()`.** Vite rewrites the asset references
it processes itself — imports, `url()` in CSS, and `public/` references in
`index.html` — but it does **not** touch string literals inside components. A
hard-coded `"/images/hero-banner.webp"` reaches the browser unchanged: it works
when the site is served from a domain root and 404s under `/isco-website/`. The
symptom is specific and easy to miss, because every structural check still
passes — the file exists and the URL resolves, just not there. The hero renders
as a bare gradient with a broken-image icon in the corner.

## Fonts

The Outfit and Source Sans 3 files are self-hosted in `src/assets/fonts/`, with
`src/fonts.css` declaring the faces. Vite fingerprints them and rewrites the
`url()`s for the deploy base, so they work at the domain root and under a
project-site sub-path alike.

The site used to load both families from Google Fonts, which meant every visit
made requests to two third-party hosts before it could render text — and, for a
German company, the GDPR question German courts have already ruled on. Only the
Latin, Latin Extended and Cyrillic subsets are kept, because those are the four
scripts the six languages use. The browser still downloads only the subsets a
page's characters need.

## Contact form

`src/components/ContactSection.tsx` posts through `src/lib/api.ts` to Formspree
(`f/mzezgbwe`), which is a hosted endpoint rather than a function in this
repository. The production domain was tested end-to-end.

The free tier covers 50 submissions per month. Beyond that the endpoint stops
accepting mail **without telling the visitor** — the form still reports success.
Check the Formspree dashboard monthly.

## SEO status

Every route is prerendered at build time:

- **One document per URL.** `/`, six category pages, four solar modules, five
  inverters, four batteries and four boilers: 24 URLs, each with its own title,
  description, canonical, Open Graph card and readable content in the markup.
- **Structured data** in the document itself: `Organization`, `WebSite` and
  `LocalBusiness` on the homepage; `Product` and `BreadcrumbList` on product
  pages; `CollectionPage` and `BreadcrumbList` on category pages.
- **Deep links return HTTP 200**, because each route is a real file.
- **`sitemap.xml`** is generated from the same route list that is written to
  disk, so it cannot advertise a page that does not exist.
- **Unknown paths** return HTTP 404 with `noindex`.
- **In-app navigation** updates the head from the same metadata module
  (`src/lib/seo.ts`), so a link shared after browsing previews the page the
  visitor is actually on.

Still open:

- All six languages share one URL; the language is client-side state, so only
  the English version is indexable. Language-prefixed URLs (`/de/…`) with
  `hreflang` were considered and deliberately not added — product copy is
  largely English and the catalogue is small.
- `solar_panels_desc` in `src/lib/i18n.ts` mentions flexible and foldable
  modules that are not in the catalogue yet. That is intentional: those ranges
  are planned. The efficiency figure was corrected from 25%+ to 23%+, which is
  what the published modules reach (23.69% peak).

## Verifying SEO

`npm run build` ends with automated checks, but they only prove the markup.
To see what a crawler and a visitor actually get, use `_audit/seo-probe.mjs`
against a local server: it reads the rendered head, clicks an in-app link to
confirm the head follows the navigation, and reloads with JavaScript disabled
to confirm the prerendered content is readable without the app.

## Verifying a change

A successful build says nothing about whether the page is correct. Render it.

Serving `dist/` with a plain static server is **not** enough: it returns its own
404 page instead of the contents of `404.html`, so the deep-link fallback looks
broken when it works. Use a server that mimics GitHub Pages. The tools used
during the migration live outside this repository in the parent folder's
`_audit/` directory:

| Tool | Purpose |
| --- | --- |
| `pages-sim-server.mjs` | Static server that reproduces the GitHub Pages 404 fallback |
| `fullpage-shot.mjs` | Full-page screenshot over the DevTools Protocol |
| `scroll-probe.mjs` | Scrolls one viewport at a time, captures each, and reports section opacity |
| `seo-probe.mjs` | Reads the rendered head, exercises an in-app navigation, and reloads with JavaScript disabled |

Two traps these tools exist to catch:

- **`captureBeyondViewport` renders the whole document without scrolling it**,
  so every scroll-reveal section below the hero stays at opacity 0 and the page
  comes out blank. It looks exactly like a broken build and is not one. Use
  `scroll-probe.mjs`, which scrolls for real, to judge what a visitor sees.
- **Raising the window height is not a full-page capture.** The hero is sized in
  viewport units, so it simply grows to fill any height you give it and the
  capture shows nothing else.
