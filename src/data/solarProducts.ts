import { asset } from "@/lib/asset";

/*
 * Product catalogue data.
 *
 * Everything here is language-neutral: part numbers, measurements, electrical
 * values. Display text (headings, spec labels, marketing copy) lives in
 * src/lib/i18n.ts so it can be translated. Keep the two apart — mixing prose
 * into this file is what makes a catalogue impossible to localise later.
 *
 * Sources: the four ISCO datasheets in ../../"solar module data sheet"/.
 */

/* ───────────────────────── Categories ───────────────────────── */

export interface ProductCategory {
  /** Route segment: /products/<slug> */
  slug: string;
  /** i18n key holding the display name */
  nameKey: string;
  /** i18n key holding the one-line description */
  descKey: string;
  /** true when the category has real product pages behind it */
  populated: boolean;
}

/*
 * The five Solar categories, in the order they appear in the nav dropdown.
 * `populated: false` marks a category that currently renders the template
 * state; give it products and flip the flag when its content arrives.
 */
/* sitemap:categories — scripts/postbuild.mjs reads the slugs between this
   marker and the next one below to build sitemap.xml. Do not repeat either
   marker's text in prose: the parser matches the first occurrence, and a
   mention inside a comment would collapse the slice to nothing. */
export const SOLAR_CATEGORIES: ProductCategory[] = [
  {
    slug: "solar-modules",
    nameKey: "solar_panels_title",
    descKey: "solar_panels_desc",
    populated: true,
  },
  {
    slug: "inverters",
    nameKey: "solar_inverters_title",
    descKey: "solar_inverters_desc",
    populated: false,
  },
  {
    slug: "bess",
    nameKey: "solar_storage_title",
    descKey: "solar_storage_desc",
    populated: false,
  },
  {
    slug: "mounting",
    nameKey: "solar_mounting_title",
    descKey: "solar_mounting_desc",
    populated: false,
  },
  {
    slug: "cables",
    nameKey: "solar_cables_title",
    descKey: "solar_cables_desc",
    populated: false,
  },
  {
    slug: "accessories",
    nameKey: "solar_accessories_title",
    descKey: "solar_accessories_desc",
    populated: false,
  },
];

export function findCategory(slug: string): ProductCategory | undefined {
  return SOLAR_CATEGORIES.find((c) => c.slug === slug);
}

/* ───────────────────── Solar modules ───────────────────── */

/** One column of the STC table. */
export interface PowerStep {
  pmax: string;
  voc: string;
  isc: string;
  vmp: string;
  imp: string;
  eff: string;
}

export interface SolarModule {
  /** Route segment: /products/solar-modules/<slug> */
  slug: string;
  /** What the model is called on screen — power rating only, per brief. */
  model: string;
  /** Distinguishes the two black-framed variants from the silver ones. */
  variant: "" | "Full Black";
  partNumber: string;
  image: string;

  powerRange: string;
  peakEfficiency: string;
  cellType: string;
  cellConfiguration: string;
  dimensions: string;
  weight: string;
  frontGlass: string;
  rearGlass: string;
  frame: string;
  junctionBox: string;
  cable: string;

  /* Packaging — the figures a buyer checks before booking a container. */
  loadingQuantity: string;
  modulesPerPallet: string;
  container: string;

  stc: PowerStep[];
}

/*
 * Values shared by all four modules, taken from the datasheets. Kept here
 * rather than repeated four times so a correction cannot drift between models.
 */
const COMMON = {
  frontGlass: "2.0mm high transmittance, reinforced glass",
  junctionBox: "Protection class IP68",
  cable:
    "4.0mm² — positive pole 200 mm, negative pole 250 mm (wire length can be customised)",
  container: "40HQ",
};

/* sitemap:modules — the second marker; see the note above SOLAR_CATEGORIES. */
export const SOLAR_MODULES: SolarModule[] = [
  {
    slug: "450w",
    model: "450W",
    variant: "Full Black",
    partNumber: "HTM440~465DMH6-48NT",
    image: asset("/images/solar-module-450w.jpg"),

    powerRange: "440–465 W",
    peakEfficiency: "23.27%",
    cellType: "182×105mm Mono",
    cellConfiguration: "96 (6×16)",
    dimensions: "1762 × 1134 × 30 mm",
    weight: "24.5 kg",
    frontGlass: COMMON.frontGlass,
    rearGlass: "2.0mm — part of the structure is grid-like black ceramic glass",
    frame: "Black anodized aluminum alloy",
    junctionBox: COMMON.junctionBox,
    cable: COMMON.cable,

    loadingQuantity: "962 pcs",
    modulesPerPallet: "37 pcs + 37 pcs",
    container: COMMON.container,

    stc: [
      { pmax: "440", voc: "34.84", isc: "15.79", vmp: "29.42", imp: "14.96", eff: "22.02" },
      { pmax: "445", voc: "34.99", isc: "15.90", vmp: "29.57", imp: "15.05", eff: "22.27" },
      { pmax: "450", voc: "35.14", isc: "16.01", vmp: "29.72", imp: "15.15", eff: "22.52" },
      { pmax: "455", voc: "35.29", isc: "16.12", vmp: "29.87", imp: "15.24", eff: "22.77" },
      { pmax: "460", voc: "35.44", isc: "16.23", vmp: "30.02", imp: "15.33", eff: "23.02" },
      { pmax: "465", voc: "35.59", isc: "16.33", vmp: "30.17", imp: "15.42", eff: "23.27" },
    ],
  },

  {
    slug: "500w",
    model: "500W",
    variant: "Full Black",
    partNumber: "HTM490~510DMH6-54NT",
    image: asset("/images/solar-module-500w.jpg"),

    powerRange: "490–510 W",
    peakEfficiency: "22.93%",
    cellType: "182×105mm Mono",
    cellConfiguration: "108 (6×18)",
    dimensions: "1961 × 1134 × 30 mm",
    weight: "27 kg",
    frontGlass: COMMON.frontGlass,
    rearGlass: "2.0mm — part of the structure is grid-like black ceramic glass",
    frame: "Black anodized aluminum alloy",
    junctionBox: COMMON.junctionBox,
    cable: COMMON.cable,

    loadingQuantity: "888 pcs",
    modulesPerPallet: "37 pcs + 37 pcs",
    container: COMMON.container,

    stc: [
      { pmax: "490", voc: "39.01", isc: "15.71", vmp: "32.94", imp: "14.88", eff: "22.03" },
      { pmax: "495", voc: "39.16", isc: "15.80", vmp: "33.09", imp: "14.96", eff: "22.26" },
      { pmax: "500", voc: "39.31", isc: "15.90", vmp: "33.24", imp: "15.05", eff: "22.48" },
      { pmax: "505", voc: "39.46", isc: "16.00", vmp: "33.39", imp: "15.13", eff: "22.71" },
      { pmax: "510", voc: "39.61", isc: "16.10", vmp: "33.54", imp: "15.21", eff: "22.93" },
    ],
  },

  {
    slug: "630w",
    model: "630W",
    variant: "",
    partNumber: "HTM615~640DMH6-66NT",
    image: asset("/images/solar-module-630w.jpg"),

    powerRange: "615–640 W",
    peakEfficiency: "23.69%",
    cellType: "182×105mm Mono",
    cellConfiguration: "132 (6×22)",
    dimensions: "2382 × 1134 × 30 mm",
    weight: "32.5 kg",
    frontGlass: COMMON.frontGlass,
    rearGlass: "2.0mm — part of the structure is grid-like white ceramic glass",
    frame: "Anodized aluminum alloy",
    junctionBox: COMMON.junctionBox,
    cable: COMMON.cable,

    loadingQuantity: "740 pcs",
    modulesPerPallet: "37 pcs + 37 pcs",
    container: COMMON.container,

    stc: [
      { pmax: "615", voc: "48.22", isc: "15.94", vmp: "40.77", imp: "15.09", eff: "22.77" },
      { pmax: "620", voc: "48.37", isc: "16.02", vmp: "40.92", imp: "15.16", eff: "22.95" },
      { pmax: "625", voc: "48.52", isc: "16.10", vmp: "41.07", imp: "15.22", eff: "23.14" },
      { pmax: "630", voc: "48.67", isc: "16.18", vmp: "41.22", imp: "15.29", eff: "23.32" },
      { pmax: "635", voc: "48.82", isc: "16.26", vmp: "41.37", imp: "15.35", eff: "23.51" },
      { pmax: "640", voc: "48.97", isc: "16.34", vmp: "41.52", imp: "15.42", eff: "23.69" },
    ],
  },

  {
    slug: "720w",
    model: "720W",
    variant: "",
    partNumber: "HTM710~730DMH8-66NT",
    image: asset("/images/solar-module-720w.jpg"),

    powerRange: "710–730 W",
    peakEfficiency: "23.50%",
    cellType: "210×105mm Mono",
    cellConfiguration: "132 (6×22)",
    dimensions: "2384 × 1303 × 33 mm",
    weight: "37.5 kg",
    frontGlass: COMMON.frontGlass,
    rearGlass: "2.0mm — part of the structure is grid-like white ceramic glass",
    frame: "Anodized aluminum alloy",
    junctionBox: COMMON.junctionBox,
    cable: COMMON.cable,

    loadingQuantity: "594 pcs",
    modulesPerPallet: "33 pcs",
    container: COMMON.container,

    stc: [
      { pmax: "710", voc: "48.67", isc: "18.24", vmp: "40.89", imp: "17.37", eff: "22.86" },
      { pmax: "715", voc: "48.82", isc: "18.31", vmp: "41.04", imp: "17.43", eff: "23.02" },
      { pmax: "720", voc: "48.97", isc: "18.38", vmp: "41.19", imp: "17.48", eff: "23.18" },
      { pmax: "725", voc: "49.12", isc: "18.45", vmp: "41.34", imp: "17.54", eff: "23.34" },
      { pmax: "730", voc: "49.27", isc: "18.52", vmp: "41.49", imp: "17.60", eff: "23.50" },
    ],
  },
];

/* Electrical and mechanical values identical across all four modules. */
export const COMMON_SPECS = {
  technology: "TOPCon Bifacial",
  cellTechnology: "N-type multi-busbar (MBB) half-cell",
  operatingTemperature: "-40 °C ~ +85 °C",
  maximumSystemVoltage: "1000 / 1500 V",
  temperatureCoefficientPm: "-0.290 %/°C",
  temperatureCoefficientVoc: "-0.250 %/°C",
  temperatureCoefficientIsc: "+0.045 %/°C",
  nmot: "41±3 °C",
  degradation:
    "First year < 1.0%, then 0.40% per year over 30 years (years 2–30)",
  productWarranty: "12 years",
  powerWarranty: "30 years",
  certifications: [
    "IEC 61215:2021",
    "IEC 61730:2023",
    "IEC 62941:2019",
    "ISO 9001:2015",
    "ISO 14001:2015",
    "ISO 45001:2018",
  ],
};

export function findSolarModule(slug: string): SolarModule | undefined {
  return SOLAR_MODULES.find((m) => m.slug === slug);
}
