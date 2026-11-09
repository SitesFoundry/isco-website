/*
 * One source of truth for everything a crawler reads about a page.
 *
 * The site has two different ways of producing <head>: the build prerenders a
 * static document per route (scripts/prerender.mjs), and the app rewrites the
 * same tags when a visitor navigates without a page load. Both used to write
 * their own tags — the static ones lived in index.html and said the same thing
 * on every URL, and the runtime ones lived in a component that only the home
 * page mounted. Two writers meant the homepage canonical was declared on
 * product pages, so those pages told Google to index the homepage instead.
 *
 * Everything below is plain data derived from the catalogue modules. Adding a
 * product to src/data/solarProducts.ts or solarSystems.ts is enough to get its
 * page, its metadata, its structured data and its sitemap entry.
 */
import { SITE_ORIGIN } from "@/lib/asset";
import {
  BOILER_PRODUCTS,
  getBoilerBySlug,
} from "@/data/boilerProducts";
import {
  COMMON_SPECS,
  SOLAR_CATEGORIES,
  SOLAR_MODULES,
  findCategory,
  findSolarModule,
} from "@/data/solarProducts";
import {
  BESS,
  INVERTER_FAMILY,
  findProductIn,
  productsForCategory,
} from "@/data/solarSystems";
import { getTranslations, specLabel } from "@/lib/i18n";

export type PageKind =
  | "home"
  | "category"
  | "solar-module"
  | "system"
  | "boiler"
  | "not-found";

export interface BreadcrumbItem {
  /** English label, as shown in the breadcrumb trail. */
  name: string;
  /** Root-relative path; "/" for the homepage. */
  path: string;
}

export interface PageSeo {
  /** Root-relative path, no trailing slash (except the homepage). */
  path: string;
  kind: PageKind;
  title: string;
  description: string;
  canonical: string;
  /** Absolute URL — social crawlers cannot resolve a root-relative image. */
  image: string;
  imageAlt: string;
  robots: string;
  breadcrumbs: BreadcrumbItem[];
  jsonLd: Record<string, unknown>[];
}

export interface StaticRoute {
  path: string;
  /** sitemap.xml priority */
  priority: string;
  changefreq: string;
}

const ORG_NAME = "ISCO GmbH";
const ORG_EMAIL = "sales@iscogmbh.com";

/*
 * Catalogue images are stored through asset(), so under a project-site preview
 * they carry the /isco-website/ prefix. Metadata must always name the production
 * URL, so the deploy prefix is stripped here rather than leaking into canonical
 * and social tags.
 */
const DEPLOY_BASE = import.meta.env.BASE_URL;

/**
 * The URL GitHub Pages actually serves.
 *
 * A directory index (`dist/products/720w/index.html`) is not served at
 * /products/720w: Pages answers that with a 301 to /products/720w/. Canonical,
 * og:url, structured-data URLs and the sitemap must therefore name the slash
 * form — pointing them at the redirecting form invites Search Console to report
 * every submitted URL as "page with redirect".
 */
export function canonicalPath(path: string): string {
  if (path === "/" || path.endsWith(".html") || path.includes("#")) return path;
  return `${path.replace(/\/+$/, "")}/`;
}

const absolute = (pathOrUrl: string): string => {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  const path =
    DEPLOY_BASE !== "/" && pathOrUrl.startsWith(DEPLOY_BASE)
      ? `/${pathOrUrl.slice(DEPLOY_BASE.length)}`
      : pathOrUrl;
  return `${SITE_ORIGIN}${path}`;
};

const HOME_SEO = {
  title: "ISCO GmbH | Solar Modules, Inverters & HVAC Systems",
  description:
    "ISCO GmbH in Frankfurt supplies TOPCon solar modules, hybrid inverters, battery storage and gas boilers across Europe — full datasheets and direct contact.",
  image: "/images/hero-banner.webp",
  imageAlt: "ISCO GmbH solar and HVAC solutions",
};

/*
 * The category copy is written for search results rather than reused from the
 * page body: it has to state the range and the numbers a buyer searches for
 * (power class, efficiency, capacity) within the character budget Google shows.
 *
 * Keys must match the slugs in SOLAR_CATEGORIES. The build fails loudly on a
 * category without an entry here (scripts/prerender.mjs refuses to write a
 * not-found page into the sitemap), which is deliberate: a new category should
 * not go live with the homepage's title.
 */
const CATEGORY_SEO: Record<
  string,
  { title: string; description: string; image: string }
> = {
  "solar-modules": {
    title: "Solar Modules 450–720 W | TOPCon Bifacial — ISCO GmbH",
    description:
      "TOPCon bifacial solar modules from 450 W to 720 W with up to 23.69% efficiency. Datasheets with dimensions, weight, pallet and 40HQ loading quantities.",
    image: "/images/solar-section.webp",
  },
  inverters: {
    title: "Hybrid Inverters 7.5–15 kW | EPEVER ELS — ISCO GmbH",
    description:
      "Single-phase low-voltage hybrid inverters from 7.5 kW to 15 kW: up to 4 MPPTs, 10 ms UPS changeover, parallel operation of up to six units, IP65.",
    image: "/images/inverter-els.png",
  },
  bess: {
    title: "Battery Energy Storage 1 kWh – 5 MWh | ISCO GmbH",
    description:
      "LiFePO4 battery storage: portable power stations, 16 kWh home batteries, 261 kWh commercial cabinets and 5 MWh liquid-cooled skids. Full specifications.",
    image: "/images/bess-261kwh.png",
  },
  mounting: {
    title: "PV Mounting Systems | FRP & Metal Brackets — ISCO",
    description:
      "Lightweight FRP composite and metal PV mounting brackets in multiple colours, supplied as complete four-panel kits for residential rooftop arrays.",
    image: "/images/solar-section.webp",
  },
  cables: {
    title: "PV Cables & MC4 Connectors | ISCO GmbH",
    description:
      "Solar DC cables and MC4 connectors in multiple specifications for safe, code-compliant photovoltaic installations, supplied with ISCO solar modules.",
    image: "/images/solar-section.webp",
  },
  accessories: {
    title: "Solar-Powered Appliances 12/24/48 V | ISCO GmbH",
    description:
      "DC-powered air conditioners, freezers, fridges, water pumps, fans and TVs for off-grid sites, running on stored solar energy with grid power as backup.",
    image: "/images/solar-section.webp",
  },
};

/* ───────────────────────── Structured data ───────────────────────── */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Kennedyallee 93",
  addressLocality: "Frankfurt am Main",
  postalCode: "60596",
  addressCountry: "DE",
};

function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: ORG_NAME,
    legalName: "ISCO GmbH",
    url: SITE_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: absolute("/images/isco-logo-footer.png"),
      width: 190,
      height: 128,
    },
    image: absolute("/images/about-company.webp"),
    description:
      "Supplier of solar modules, hybrid inverters, battery storage and HVAC systems for residential, commercial and industrial projects across Europe.",
    email: ORG_EMAIL,
    address: postalAddress,
    areaServed: { "@type": "Place", name: "Europe" },
    contactPoint: {
      "@type": "ContactPoint",
      email: ORG_EMAIL,
      contactType: "sales",
      availableLanguage: [
        "German",
        "English",
        "Russian",
        "Spanish",
        "French",
        "Italian",
      ],
    },
  };
}

function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: ORG_NAME,
    url: SITE_ORIGIN,
    inLanguage: ["en", "de", "ru", "es", "fr", "it"],
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    description:
      "ISCO GmbH — solar modules, inverters, battery storage and HVAC systems from Frankfurt am Main.",
  };
}

function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_ORIGIN}/#localbusiness`,
    name: ORG_NAME,
    url: SITE_ORIGIN,
    image: absolute("/images/about-company.webp"),
    email: ORG_EMAIL,
    address: postalAddress,
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(canonicalPath(item.path)),
    })),
  };
}

function productSchema(input: {
  name: string;
  sku: string;
  description: string;
  image: string;
  url: string;
  category: string;
  properties: { name: string; value: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    sku: input.sku,
    mpn: input.sku,
    url: input.url,
    description: input.description,
    image: [absolute(input.image)],
    category: input.category,
    brand: { "@type": "Brand", name: ORG_NAME },
    manufacturer: { "@id": `${SITE_ORIGIN}/#organization` },
    additionalProperty: input.properties.map((p) => ({
      "@type": "PropertyValue",
      name: p.name,
      value: p.value,
    })),
  };
}

function collectionSchema(input: {
  name: string;
  description: string;
  path: string;
  products: { name: string; path: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absolute(canonicalPath(input.path)),
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.products.length,
      itemListElement: input.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: absolute(canonicalPath(p.path)),
      })),
    },
  };
}

/* ───────────────────────── Page descriptions ───────────────────────── */

/** The efficiency at the nominal power in the model name, e.g. 22.52 at 450 W. */
function moduleEfficiencyAtNominal(
  stc: { pmax: string; eff: string }[],
  model: string,
): string {
  const watts = model.replace(/[^\d.]/g, "");
  const row = stc.find((s) => s.pmax === watts) ?? stc[stc.length - 1];
  return `${row.eff}%`;
}

/** "16kWh" reads as one word to search engines; titles want "16 kWh". */
function spacedUnits(text: string): string {
  return text.replace(/(\d)\s*(kWh|MWh|kW|W)\b/g, "$1 $2");
}

function truncate(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : cut.length)}…`;
}

function solarModuleSeo(slug: string): PageSeo | null {
  const module = findSolarModule(slug);
  if (!module) return null;

  const label = `${module.model}${module.variant ? ` ${module.variant}` : ""}`;
  const path = `/products/solar-modules/${module.slug}`;
  const efficiency = moduleEfficiencyAtNominal(module.stc, module.model);
  const description = `${label} TOPCon bifacial module (${module.partNumber}): ${efficiency} efficiency, ${module.dimensions}, ${module.weight}, ${module.loadingQuantity} per 40HQ container.`;

  return {
    path,
    kind: "solar-module",
    title: `${spacedUnits(label)} TOPCon Bifacial Solar Module | ISCO GmbH`,
    description: truncate(description),
    canonical: absolute(canonicalPath(path)),
    image: absolute(module.image),
    imageAlt: `ISCO ${label} TOPCon bifacial solar module`,
    robots: "index, follow",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Solar Modules", path: "/products/solar-modules" },
      { name: label, path },
    ],
    jsonLd: [
      productSchema({
        name: `ISCO ${label} TOPCon Bifacial Solar Module`,
        sku: module.partNumber,
        description: `${label} bifacial solar module with ${module.powerRange} power range and ${module.peakEfficiency} peak efficiency, for residential and commercial PV systems.`,
        image: module.image,
        url: absolute(canonicalPath(path)),
        category: "Solar Modules",
        properties: [
          { name: "Power range", value: module.powerRange },
          { name: "Peak efficiency", value: module.peakEfficiency },
          { name: "Cell type", value: module.cellType },
          { name: "Dimensions", value: module.dimensions },
          { name: "Weight", value: module.weight },
          { name: "Modules per pallet", value: module.modulesPerPallet },
          { name: "Loading quantity", value: module.loadingQuantity },
          { name: "Product warranty", value: COMMON_SPECS.productWarranty },
          { name: "Power warranty", value: COMMON_SPECS.powerWarranty },
        ],
      }),
    ],
  };
}

function systemProductSeo(
  categorySlug: string,
  slug: string,
): PageSeo | null {
  const product = findProductIn(categorySlug, slug);
  const category = findCategory(categorySlug);
  if (!product || !category) return null;

  const isInverter = categorySlug === "inverters";
  const path = `/products/${categorySlug}/${product.slug}`;
  const categoryName = isInverter ? "Inverters" : "BESS";
  const label = `${product.model} ${product.variant}`.trim();
  const keyFacts = product.keyFacts
    .slice(0, 4)
    .map((f) => f.value)
    .join(", ");

  const title = isInverter
    ? `${spacedUnits(product.model)} Hybrid Inverter ${product.partNumber} | ISCO GmbH`
    : `${spacedUnits(label)} | ISCO GmbH`;

  return {
    path,
    kind: "system",
    title,
    description: truncate(
      `${label} (${product.partNumber}): ${product.summary} Key figures: ${keyFacts}.`,
    ),
    canonical: absolute(canonicalPath(path)),
    image: absolute(product.image),
    imageAlt: `ISCO ${label}`,
    robots: "index, follow",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: categoryName, path: `/products/${categorySlug}` },
      { name: label, path },
    ],
    jsonLd: [
      productSchema({
        name: `ISCO ${label}`,
        sku: product.partNumber,
        description: product.summary,
        image: product.image,
        url: absolute(canonicalPath(path)),
        category: categoryName,
        properties: product.keyFacts.map((f) => ({
          name: specLabel("en", f.labelKey),
          value: f.value,
        })),
      }),
    ],
  };
}

function boilerSeo(slug: string): PageSeo | null {
  const product = getBoilerBySlug(slug);
  if (!product) return null;

  const typeLabel =
    product.type === "combi" ? "Combi Gas Boiler" : "Condensing Combi Boiler";
  const path = `/products/boiler/${product.slug}`;

  return {
    path,
    kind: "boiler",
    title: `${product.name} ${typeLabel} ${product.heroMetric} | ISCO GmbH`,
    description: truncate(
      `${product.name} ${typeLabel.toLowerCase()} from ISCO GmbH with ${product.heroMetric} output (${product.powerRange}). ${product.certifications.join(", ")}; wall-mounted, WiFi-ready, OEM options.`,
    ),
    canonical: absolute(canonicalPath(path)),
    image: absolute(product.image),
    imageAlt: `ISCO ${product.name} ${typeLabel}`,
    robots: "index, follow",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "HVAC", path: "/#hvac" },
      { name: product.name, path },
    ],
    jsonLd: [
      productSchema({
        name: `ISCO ${product.name} ${typeLabel}`,
        sku: product.series,
        description: `${product.name} ${typeLabel} with ${product.powerRange} output for residential heating and hot water. ${product.certifications.join(", ")}.`,
        image: product.image,
        url: absolute(canonicalPath(path)),
        category: "HVAC — Gas Boilers",
        properties: [
          { name: "Power range", value: product.powerRange },
          { name: "Type", value: typeLabel },
          { name: "Certifications", value: product.certifications.join(", ") },
        ],
      }),
    ],
  };
}

function categorySeo(slug: string): PageSeo | null {
  const category = findCategory(slug);
  if (!category) return null;

  const copy = CATEGORY_SEO[slug];
  if (!copy) return null;

  const path = `/products/${slug}`;
  const englishName =
    (getTranslations("en") as unknown as Record<string, string>)[
      category.nameKey
    ] ?? category.nameKey;
  const products =
    slug === "solar-modules"
      ? SOLAR_MODULES.map((m) => ({
          name: `${m.model}${m.variant ? ` ${m.variant}` : ""}`,
          path: `/products/solar-modules/${m.slug}`,
        }))
      : (productsForCategory(slug) ?? []).map((p) => ({
          name: `${p.model} ${p.variant}`.trim(),
          path: `/products/${slug}/${p.slug}`,
        }));

  return {
    path,
    kind: "category",
    title: copy.title,
    description: copy.description,
    canonical: absolute(canonicalPath(path)),
    image: absolute(copy.image),
    imageAlt: `${copy.title} — ISCO GmbH`,
    robots: "index, follow",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: englishName, path },
    ],
    jsonLd: [
      collectionSchema({
        name: copy.title.split("|")[0].trim(),
        description: copy.description,
        path,
        products,
      }),
    ],
  };
}

function homeSeo(): PageSeo {
  return {
    path: "/",
    kind: "home",
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    canonical: absolute("/"),
    image: absolute(HOME_SEO.image),
    imageAlt: HOME_SEO.imageAlt,
    robots: "index, follow",
    breadcrumbs: [],
    jsonLd: [],
  };
}

function notFoundSeo(): PageSeo {
  return {
    // The file really exists (dist/404.html); pointing the canonical at a URL
    // that 404s would be a defect of its own.
    path: "/404.html",
    kind: "not-found",
    title: "Page not found | ISCO GmbH",
    description:
      "This page does not exist. Browse ISCO solar modules, inverters, battery storage and boilers, or contact our sales team in Frankfurt.",
    canonical: absolute("/404.html"),
    image: absolute(HOME_SEO.image),
    imageAlt: HOME_SEO.imageAlt,
    robots: "noindex, follow",
    breadcrumbs: [],
    jsonLd: [],
  };
}

/* ───────────────────────── Public API ───────────────────────── */

/** Normalises a router location: "/products/x/" and "/products/x" are one page. */
export function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const withoutTrailingSlash = pathname.replace(/\/+$/, "");
  return withoutTrailingSlash.startsWith("/")
    ? withoutTrailingSlash
    : `/${withoutTrailingSlash}`;
}

export function getSeo(pathname: string): PageSeo {
  const path = normalizePath(pathname);

  if (path === "/") {
    // Identity markup belongs on the homepage; other pages reference it by @id.
    const home = homeSeo();
    return {
      ...home,
      jsonLd: [organizationSchema(), websiteSchema(), localBusinessSchema()],
    };
  }

  const solarModule = path.match(/^\/products\/solar-modules\/([^/]+)$/);
  if (solarModule) return solarModuleSeo(solarModule[1]) ?? notFoundSeo();

  const system = path.match(/^\/products\/(inverters|bess)\/([^/]+)$/);
  if (system) return systemProductSeo(system[1], system[2]) ?? notFoundSeo();

  const boiler = path.match(/^\/products\/boiler\/([^/]+)$/);
  if (boiler) return boilerSeo(boiler[1]) ?? notFoundSeo();

  const category = path.match(/^\/products\/([^/]+)$/);
  if (category) return categorySeo(category[1]) ?? notFoundSeo();

  return notFoundSeo();
}

/**
 * Every URL that renders real content. Used by the prerenderer and the sitemap,
 * so a new catalogue entry cannot ship as an unlisted page.
 */
export function getStaticRoutes(): StaticRoute[] {
  const routes: StaticRoute[] = [
    { path: "/", priority: "1.0", changefreq: "monthly" },
  ];

  for (const category of SOLAR_CATEGORIES) {
    routes.push({
      path: `/products/${category.slug}`,
      priority: category.populated ? "0.8" : "0.4",
      changefreq: "monthly",
    });
  }

  for (const module of SOLAR_MODULES) {
    routes.push({
      path: `/products/solar-modules/${module.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  for (const inverter of INVERTER_FAMILY) {
    routes.push({
      path: `/products/inverters/${inverter.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  for (const battery of BESS) {
    routes.push({
      path: `/products/bess/${battery.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  for (const boiler of BOILER_PRODUCTS) {
    routes.push({
      path: `/products/boiler/${boiler.slug}`,
      priority: "0.7",
      changefreq: "monthly",
    });
  }

  return routes;
}

/**
 * The complete <head> block for one page, as an HTML string.
 *
 * Kept here — next to the data it renders — so the prerenderer cannot drift from
 * the metadata the client writes on navigation.
 */
export function buildHeadHtml(seo: PageSeo): string {
  const tags: string[] = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    `<meta name="author" content="${ORG_NAME}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${ORG_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:image" content="${seo.image}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.image}" />`,
  ];

  for (const schema of getPageJsonLd(seo)) tags.push(jsonLdTag(schema));

  return tags.join("\n    ");
}

/**
 * Breadcrumbs first, then the page's own entities. Shared by the prerenderer
 * and the client so a navigation cannot produce a different graph than a
 * freshly loaded page.
 */
export function getPageJsonLd(seo: PageSeo): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [];
  if (seo.breadcrumbs.length > 0) {
    schemas.push(breadcrumbSchema(seo.breadcrumbs));
  }
  schemas.push(...seo.jsonLd);
  return schemas;
}

function jsonLdTag(schema: Record<string, unknown>): string {
  // "</" inside a JSON-LD string would close the script element early.
  const json = JSON.stringify(schema).replace(/<\//g, "<\\/");
  return `<script type="application/ld+json">${json}</script>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
