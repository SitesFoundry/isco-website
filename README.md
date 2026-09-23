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

Two steps:

1. `vite build` writes the bundle into `dist/`.
2. `scripts/postbuild.mjs` completes `dist/`:
   - copies `index.html` to `404.html`, which is what makes deep links work on
     GitHub Pages (see below);
   - generates `sitemap.xml` from the boiler slugs in
     `src/data/boilerProducts.ts`.

`dist/` is the only folder that gets deployed. It is generated in CI and is not
committed.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes
`dist/` to GitHub Pages. Require this one-time repository setting:

- `Settings → Pages → Build and deployment → Source`: **GitHub Actions**

### The `SITE_BASE` variable

`vite.config.ts` reads `SITE_BASE` and Vite exposes it to the app as
`import.meta.env.BASE_URL`; `src/App.tsx` hands the same value to the wouter
router. The deploy workflow currently sets:

```yaml
env:
  SITE_BASE: /isco-website/
```

That value matches **preview hosting as a GitHub Pages project site**, where the
site lives at `https://SitesFoundry.github.io/isco-website/`. When the custom
domain serves the site from the domain root, change it to:

```yaml
env:
  SITE_BASE: /
```

Nothing else needs to change. Asset paths built through `src/lib/asset.ts` and
the router base both follow this one value, so the two can never disagree.

### Custom domain

To attach `www.iscogmbh.com`: add a `CNAME` file at the repository root
containing `www.iscogmbh.com`, set the domain under `Settings → Pages`, and
point DNS at GitHub. DNS for this domain is managed at Cloudflare.

## Deep links and `404.html`

GitHub Pages answers any path that is not a real file with the **contents of
`404.html`** and HTTP status **404**. `scripts/postbuild.mjs` therefore publishes
a copy of `index.html` as `404.html`, so a path such as
`/products/boiler/olympia` boots the app, which then routes it client-side.

The trade-off is the status code: those responses are 404 even though the page
renders correctly, and crawlers see that. See "SEO status" below.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.html` | The single HTML entry point: metadata, Open Graph, fonts |
| `src/main.tsx` | Mounts the app |
| `src/App.tsx` | Providers and routes; sets the router base |
| `src/lib/i18n.ts` | All copy, in six languages (de, en, ru, es, fr, it) |
| `src/lib/asset.ts` | Prefixes `public/` paths with the deploy base |
| `src/data/boilerProducts.ts` | Boiler catalogue: specs, features, images |
| `src/components/` | Page sections (Hero, About, Solar, HVAC, Why, Contact, …) |
| `src/pages/` | `Home`, `BoilerDetail`, `NotFound` |
| `src/hooks/useInView.ts` | Scroll-reveal; sections start at opacity 0 |
| `public/images/` | The eleven content images; committed, never hot-linked |
| `public/robots.txt` | Allows all crawlers, points at the sitemap |
| `scripts/postbuild.mjs` | Completes `dist/` after the Vite build |

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

## Contact form

`src/components/ContactSection.tsx` posts to `/api/contact` through
`src/lib/api.ts`.

**This endpoint does not exist on GitHub Pages.** It was served by a Cloudflare
Pages Function in the previous deployment, which this repository does not
include. Until a replacement is wired up, the form renders and validates but
every submission fails. See the handover notes for the decision.

## SEO status

The site is a client-side rendered SPA, inherited from the Manus build. Known
gaps, deliberately deferred:

- One HTML file serves every route, so per-page titles, descriptions and
  structured data are injected by JavaScript (`src/components/SEOHead.tsx`)
  rather than present in the markup.
- Deep links return HTTP 404 (see above).
- All six languages share one URL; the language is client-side state, so the
  translations are not separately indexable.
- The previous deployment's `robots.txt` advertised a `/sitemap.xml` that
  returned `index.html`. `scripts/postbuild.mjs` now generates a real sitemap,
  so that reference resolves.

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

Two traps these tools exist to catch:

- **`captureBeyondViewport` renders the whole document without scrolling it**,
  so every scroll-reveal section below the hero stays at opacity 0 and the page
  comes out blank. It looks exactly like a broken build and is not one. Use
  `scroll-probe.mjs`, which scrolls for real, to judge what a visitor sees.
- **Raising the window height is not a full-page capture.** The hero is sized in
  viewport units, so it simply grows to fill any height you give it and the
  capture shows nothing else.
