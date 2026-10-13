import { asset } from "@/lib/asset";

/*
 * Catalogue data for the inverter and battery ranges.
 *
 * Kept separate from solarProducts.ts because the shape differs: a module is one
 * product with one fixed set of properties, while an inverter family is five
 * models sharing most of a spec sheet and a battery comes in four unrelated
 * form factors. Forcing both into the module interface would have meant a type
 * with most fields optional.
 *
 * Everything here is language-neutral — part numbers, ratings, measurements.
 * The labels that describe them are keys into SPEC_LABELS in src/lib/i18n.ts,
 * so this file stays translatable rather than becoming a wall of English prose.
 *
 * Sources: data sheet/hybrid inverter/ and data sheet/bess/.
 * Values marked with a colspan note were drawn as merged cells; the model they
 * belong to was established from the cell's x-span, not assumed.
 */

export interface KeyFact {
  /** Key into SPEC_LABELS */
  labelKey: string;
  value: string;
}

export interface SpecGroup {
  /** Key into SPEC_LABELS */
  titleKey: string;
  rows: KeyFact[];
}

export interface Product {
  /** Route segment: /products/<category>/<slug> */
  slug: string;
  /** Shown as the heading — power or capacity only, matching the module pages. */
  model: string;
  /** Secondary line, e.g. a family name. */
  variant: string;
  /** The manufacturer's own code, shown as the part number. */
  partNumber: string;
  image: string;
  /** One-sentence description, English. */
  summary: string;
  /** Bullet points, English. */
  features: string[];
  keyFacts: KeyFact[];
  specGroups: SpecGroup[];
}

const F = (
  labelKey: string,
  value: string,
): KeyFact => ({ labelKey, value });

const G = (titleKey: string, rows: KeyFact[]): SpecGroup => ({ titleKey, rows });

/* ───────────────────────── Inverters ───────────────────────── */

/*
 * EPEVER ELS series, low-voltage single-phase on-grid hybrid inverter.
 *
 * The datasheet lists five models in one table and merges cells where a rating
 * covers several of them. Those merges are recorded explicitly here: 190A is the
 * charge current for ELS7K5 *and* ELS8K, not for ELS7K5 alone, and writing it
 * per model without knowing that would have published a wrong figure.
 */
/*
 * Rows that apply to every model in the family. The datasheet draws each of
 * these once, spanning all five columns, so they are stated once here too.
 */
const INV_BATTERY: KeyFact[] = [
  F("inv_batteryType", "Lithium battery / Lead-acid battery"),
  F("inv_batteryVoltage", "40–60 V"),
  F("inv_batteryRated", "48 V / 51.2 V"),
  F("inv_chargingRule", "3-stage charging or BMS command"),
];

const INV_PV_SHARED: KeyFact[] = [
  F("inv_pvMaxVoltage", "500 V"),
  F("inv_pvStartup", "100 V"),
  F("inv_pvRated", "300 V"),
  F("inv_pvMpptRange", "90–450 V"),
  F("inv_pvCurrentPerMppt", "20 A"),
  F("inv_pvShortCircuit", "27 A"),
];

const INV_AC_SHARED: KeyFact[] = [
  F("inv_acVoltage", "220 / 230 / 240 V"),
  F("inv_acFrequency", "50 / 60 Hz"),
  F("common_thdi", "< 3%"),
  F("inv_powerFactor", "0.99 (± 0.8 leading to 0.8 lagging)"),
  F("inv_switchTime", "10 ms"),
];

const INV_ENVIRONMENT: KeyFact[] = [
  F("inv_operatingTemp", "-25 °C to +60 °C (derating above 45 °C)"),
  F("inv_humidity", "0–95% RH (non-condensing)"),
  F("inv_altitude", "4,000 m (derating above 2,000 m)"),
  F("inv_ip", "IP65"),
  F("inv_noise", "< 60 dB"),
];

const INV_GENERAL: KeyFact[] = [
  F("inv_dimensions", "840 × 513 × 283 mm"),
  F("inv_weight", "52 kg"),
  F("inv_topology", "High-frequency isolation (battery)"),
  F("inv_cooling", "Intelligent air cooling"),
  F("inv_mounting", "Wall mounted"),
  F("inv_commBms", "RS485 / CAN"),
  F("inv_commMeter", "RS485"),
  F("inv_commPortal", "WiFi / Bluetooth (external)"),
  F("common_display", "Colour LCD & app"),
  F("inv_warranty", "5 years"),
];

const INV_PROTECTION: KeyFact[] = [
  F("inv_surgeProtection", "DC Type II / AC Type III"),
  F("inv_dcSwitch", "Yes"),
  F("inv_afci", "Optional"),
  F("inv_rapidShutdown", "Optional"),
  F("inv_basicProtection",
    "PV insulation resistance detection, residual current detection, PV reverse polarity protection, anti-islanding, AC over-current, AC short circuit, AC over-voltage, over-temperature"),
];

/* The five models share one spec table; the differing values live here so the
 * per-model rows below stay readable and a correction touches one place. */
/* sitemap:inverters — scripts/postbuild.mjs slices between this marker and the
   next one to collect product URLs. Do not write the other marker's name in
   prose: the parser takes the first occurrence, and a mention inside this
   comment would collapse the slice. */
const INVERTER_MODELS = [
  {
    slug: "7-5kw", model: "7.5kW", partNumber: "ELS7K5",
    rated: "7,499 W", pvMax: "12,000 W", apparent: "7,499 VA",
    gridInput: "12,100 VA", outCurrent: "40 A", gridCurrent: "55 A",
    mppt: "3", charge: "190 A", maxEff: "96.50%", euroEff: "95.5%",
    overload: "2× rated power for 10 s",
  },
  {
    slug: "8kw", model: "8kW", partNumber: "ELS8K",
    rated: "8,000 W", pvMax: "12,000 W", apparent: "8,800 VA",
    gridInput: "12,100 VA", outCurrent: "40 A", gridCurrent: "55 A",
    mppt: "3", charge: "190 A", maxEff: "96.50%", euroEff: "95.5%",
    overload: "2× rated power for 10 s",
  },
  {
    slug: "10kw", model: "10kW", partNumber: "ELS10K",
    rated: "10,000 W", pvMax: "15,000 W", apparent: "11,000 VA",
    gridInput: "14,960 VA", outCurrent: "50 A", gridCurrent: "68 A",
    mppt: "4", charge: "240 A", maxEff: "97%", euroEff: "96.2%",
    overload: "2× rated power for 10 s",
  },
  {
    slug: "12kw", model: "12kW", partNumber: "ELS12K",
    rated: "12,000 W", pvMax: "18,000 W", apparent: "13,200 VA",
    gridInput: "17,600 VA", outCurrent: "60 A", gridCurrent: "80 A",
    mppt: "4", charge: "275 A", maxEff: "97.50%", euroEff: "96.5%",
    overload: "2× rated power for 10 s",
  },
  {
    slug: "15kw", model: "15kW", partNumber: "ELS15K",
    rated: "15,000 W", pvMax: "22,500 W", apparent: "15,000 VA",
    gridInput: "17,600 VA", outCurrent: "68.2 A", gridCurrent: "80 A",
    mppt: "4", charge: "275 A", maxEff: "97.60%", euroEff: "96.6%",
    overload: "1.5× rated power for 10 s",
  },
];

const INVERTER_SUMMARY =
  "Low-voltage single-phase on-grid hybrid inverter for residential, industrial, and commercial storage, with generator input and UPS-level changeover.";

const INVERTER_FEATURES = [
  "150% PV oversizing capability, up to 22,500 W of PV input across the range",
  "Up to 4 MPPTs with 20 A per string",
  "UPS-level switching in under 10 ms",
  "Generator connection, load connection, and AC coupling with grid-tied PV inverters",
  "Parallel capability: up to 6 units, on-grid and off-grid",
  "Zero export function and feed-in power limit",
  "IP65, built-in Type II surge protection, optional AFCI and rapid shutdown",
];

export const INVERTER_FAMILY: Product[] = INVERTER_MODELS.map((m) => ({
  slug: m.slug,
  model: m.model,
  variant: "ELS Series",
  partNumber: m.partNumber,
  image: asset("/images/inverter-els.png"),
  summary: INVERTER_SUMMARY,
  features: INVERTER_FEATURES,
  keyFacts: [
    F("inv_ratedOutput", m.rated),
    F("inv_pvMaxInput", m.pvMax),
    F("inv_mpptCount", m.mppt),
    F("inv_chargeCurrent", m.charge),
    F("inv_maxEfficiency", m.maxEff),
    F("inv_euroEfficiency", m.euroEff),
  ],
  specGroups: [
    G("spec_gridOutput", [
      F("inv_ratedOutput", m.rated),
      F("inv_maxApparent", m.apparent),
      F("inv_maxGridInput", m.gridInput),
      F("inv_maxOutputCurrent", m.outCurrent),
      F("inv_maxGridInputCurrent", m.gridCurrent),
      ...INV_AC_SHARED,
    ]),
    G("spec_offGridOutput", [
      F("inv_ratedOutput", m.rated),
      F("inv_overload", m.overload),
      F("common_outputVoltage", "220 / 230 / 240 V"),
      F("common_outputFrequency", "50/60 Hz (±0.5%)"),
      F("common_thdu", "< 3% (linear loads)"),
    ]),
    G("spec_pvInput", [
      F("inv_pvMaxInput", m.pvMax),
      F("inv_mpptCount", m.mppt),
      ...INV_PV_SHARED,
    ]),
    G("spec_efficiency", [
      F("inv_maxEfficiency", m.maxEff),
      F("inv_euroEfficiency", m.euroEff),
      F("inv_maxDischargeEfficiency", "94.6%"),
    ]),
    G("spec_battery", [
      ...INV_BATTERY,
      F("inv_chargeCurrent", m.charge),
    ]),
    G("spec_protection", INV_PROTECTION),
    G("spec_environment", INV_ENVIRONMENT),
    G("spec_general", INV_GENERAL),
  ],
}));

/* ───────────────────────── Batteries ───────────────────────── */

/* sitemap:bess — see the note on the marker above. */
export const BESS: Product[] = [
  {
    slug: "1kwh",
    model: "1kWh",
    variant: "Portable Power Station",
    partNumber: "HT-PE0001",
    image: asset("/images/bess-1kwh.png"),
    summary:
      "Portable outdoor power station with a LiFePO4 battery, dual AC and PV charging, and pure sine wave output.",
    features: [
      "LiFePO4 cells for safety, durability and long cycle life",
      "AC fast charging in about 2 hours; PV input up to 300 W for a full charge in about 3 hours",
      "Only 8 kg with an integrated carrying handle",
      "Temperature-controlled active cooling",
      "Pure sine wave output for sensitive equipment",
      "Multiple output ports for travel, camping, emergency and outdoor work",
    ],
    keyFacts: [
      F("bess_ratedEnergy", "1000 Wh"),
      F("bess_ratedPower", "500 W"),
      F("common_batteryType", "LiFePO4"),
      F("bess_dimensions", "339 × 149 × 273 mm"),
      F("common_weight", "8 kg"),
      F("common_outputWaveform", "Pure sine wave"),
    ],
    specGroups: [
      G("spec_battery", [
        F("common_batteryType", "LiFePO4"),
        F("bess_ratedEnergy", "1000 Wh"),
        F("bess_ratedPower", "500 W"),
        F("bess_ratedBatteryVoltage", "3.2 V"),
      ]),
      G("spec_ac", [
        F("bess_acInputRange", "90–280 VAC ±5 VAC"),
        F("bess_acOutputRange", "230 VAC ±5 VAC"),
        F("common_outputWaveform", "Pure sine wave"),
      ]),
      G("spec_pvInput", [
        F("bess_pvInputVoltage", "DC 11–55 V"),
        F("bess_pvInputCurrent", "10 A"),
        F("bess_pvInputPower", "300 W"),
      ]),
      G("spec_ports", [
        F("bess_portAc", "2 × 230 VAC"),
        F("bess_portUsbA", "6 × 5 V / 2.4 A"),
        F("bess_portUsbC", "3 × 5 V / 3 A"),
        F("bess_portPv", "1 × 300 W"),
        F("bess_fastCharge", "PPS / PD / QC / AFC / FCP / SCP / PE / SFCP"),
      ]),
      G("spec_environment", [
        F("common_operatingTemp", "-10 °C to +40 °C"),
        F("bess_altitude", "≤ 3,000 m"),
        F("bess_humidity", "20–95% RH"),
      ]),
      G("spec_general", [
        F("bess_dimensions", "339 × 149 × 273 mm"),
        F("common_weight", "8 kg"),
        F("common_cooling", "Fan"),
      ]),
    ],
  },
  {
    slug: "16kwh",
    model: "16kWh",
    variant: "Home Energy Storage Battery",
    partNumber: "HT-PE0016-16-2h",
    image: asset("/images/bess-16kwh.png"),
    summary:
      "Floor-standing low-voltage residential battery with an integrated BMS, IP65 protection and parallel expansion up to 15 units.",
    features: [
      "16,076.8 Wh of usable energy from LiFePO4 cells",
      "At least 6,000 cycles at 90% depth of discharge",
      "IP65 for indoor or sheltered outdoor installation",
      "RS232 / CAN / RS485 for compatibility with mainstream inverters",
      "Expandable to 15 units in parallel",
      "Fanless natural convection cooling, maintenance-free",
      "Optional aerosol fire suppression, Bluetooth monitoring and wheels",
    ],
    keyFacts: [
      F("bess_ratedEnergy", "16,076.8 Wh"),
      F("bess_ratedCapacity", "314 Ah"),
      F("bess_cycleLife", "≥ 6,000 cycles at 90% DOD"),
      F("bess_dimensions", "867.5 × 500 × 230 mm"),
      F("common_weight", "≈ 120 kg"),
      F("inv_ip", "IP65"),
    ],
    specGroups: [
      G("spec_battery", [
        F("common_batteryType", "LiFePO4"),
        F("bess_ratedVoltage", "51.2 V"),
        F("bess_ratedCapacity", "314 Ah"),
        F("bess_ratedEnergy", "16,076.8 Wh"),
        F("bess_voltageRange", "44.8–57.6 V"),
        F("bess_cycleLife", "≥ 6,000 cycles at 90% DOD (25 °C, 0.5C)"),
        F("bess_chargeCurrentRecommended", "100 A"),
        F("bess_chargeCurrentMax", "157 A"),
      ]),
      G("spec_general", [
        F("bess_communication", "RS232 / CAN / RS485"),
        F("bess_scalability", "Up to 15 units in parallel"),
        F("common_cooling", "Natural convection"),
        F("inv_ip", "IP65"),
        F("bess_installation", "Floor-standing"),
        F("bess_dimensions", "867.5 × 500 × 230 mm (with wheels)"),
        F("common_weight", "≈ 120 kg"),
      ]),
      G("spec_environment", [
        F("bess_chargeTemp", "0 °C to +55 °C"),
        F("bess_dischargeTemp", "-20 °C to +60 °C"),
        F("bess_storageTemp", "Within 3 months: 20–45 °C; beyond: 25 ±3 °C"),
        F("bess_humidity", "65 ±20% RH"),
        F("bess_altitude", "≤ 3,000 m"),
      ]),
      G("spec_certification", [
        F("bess_certifications", "UN38.3, MSDS"),
      ]),
      G("spec_optional", [
        F("bess_optionalFeatures",
          "Aerosol fire suppression system, Bluetooth, wheels"),
      ]),
    ],
  },
  {
    slug: "261kwh",
    model: "261kWh",
    variant: "Liquid-Cooled C&I Cabinet",
    partNumber: "HT-125-261-LC",
    image: asset("/images/bess-261kwh.png"),
    summary:
      "All-in-one commercial and industrial cabinet integrating battery packs, BMS, EMS, PCS, thermal management and fire suppression.",
    features: [
      "All-in-one design: packs, BMS, EMS, PCS, thermal management and fire suppression in one cabinet",
      "Three-level overcurrent protection at pack, cluster and PCS level",
      "Arc fault detection with millisecond-level disconnection",
      "AI-based cell pre-diagnosis for early warning and thermal runaway suppression",
      "Intelligent liquid cooling with cluster-level management",
      "1.4 m² footprint per cabinet, parallelable for cluster control",
      "OTA remote upgrade and four-layer data protection",
    ],
    keyFacts: [
      F("bess_ratedEnergy", "261 kWh"),
      F("bess_ratedPower", "125 kW"),
      F("bess_gridVoltage", "400 V"),
      F("bess_cellType", "LiFePO4 / 314 Ah"),
      F("common_weight", "≈ 2,200 kg"),
      F("inv_ip", "IP55 (battery compartment)"),
    ],
    specGroups: [
      G("spec_ac", [
        F("bess_ratedPower", "125 kW"),
        F("bess_gridVoltage", "400 V"),
        F("bess_voltageDeviation", "-15% to +15%"),
        F("inv_powerFactor", "1 (leading) to 1 (lagging)"),
        F("common_thdi", "< 2% at rated power"),
        F("bess_connectionMode", "3W + N + PE, three-phase four-wire"),
      ]),
      G("spec_battery", [
        F("bess_cellType", "LiFePO4 / 314 Ah"),
        F("bess_configuration", "1P52S × 5"),
        F("bess_nominalVoltage", "832 V"),
        F("bess_ratedEnergy", "261 kWh"),
        F("bess_thermalManagement", "Intelligent liquid cooling"),
        F("bess_chargeDischargePower", "0.5P"),
      ]),
      G("spec_fireSafety", [
        F("bess_fireSuppression",
          "Compartment-level and pack-level perfluorohexanone, plus compartment-level water suppression"),
      ]),
      G("spec_general", [
        F("bess_communication", "CAN / RS485 / Modbus TCP"),
        F("bess_dimensions", "1000 × 1400 × 2350 mm (W × D × H)"),
        F("common_weight", "≈ 2,200 kg"),
        F("inv_ip", "IP55 (battery compartment)"),
      ]),
      G("spec_environment", [
        F("bess_dischargeTemp", "-20 °C to +55 °C"),
        F("bess_chargeTemp", "0 °C to +55 °C"),
        F("bess_humidity", "0–99% RH (non-condensing)"),
        F("bess_altitude", "4,000 m (derating above 2,000 m)"),
      ]),
    ],
  },
  {
    slug: "5mwh",
    model: "5MWh",
    variant: "Liquid-Cooled DC Skid",
    partNumber: "HTDESS 2500/5000-LC",
    image: asset("/images/bess-5mwh.png"),
    summary:
      "Containerised liquid-cooled DC skid for utility and large industrial storage, with IP55 and C5 anti-corrosion protection.",
    features: [
      "5,015 kWh or 6,250 kWh configurations in the same footprint",
      "IP55 with C5 anti-corrosion rating for outdoor deployment",
      "Three-level fire detection at module, cluster and compartment level",
      "Cell temperature difference within a module held to 3 °C or less",
      "30 ms response when discharge mode is activated",
      "System charge/discharge efficiency up to 94%",
      "Non-walk-in modular design saving 35% of floor space",
    ],
    keyFacts: [
      F("bess_ratedEnergy", "5,015 / 6,250 kWh"),
      F("bess_nominalVoltage", "1331.2 V"),
      F("bess_cRate", "0.5C"),
      F("bess_dimensions", "6058 × 2438 × 2896 mm"),
      F("common_weight", "< 43 t and < 45 t"),
      F("inv_ip", "IP55, C5 anti-corrosion"),
    ],
    specGroups: [
      G("spec_battery", [
        F("common_batteryType", "LiFePO4"),
        F("bess_configuration", "12P416S (PE0104) / 8P416S (PE0104)"),
        F("bess_ratedEnergy", "5,015 kWh / 6,250 kWh"),
        F("bess_cellCapacity", "314 Ah / 587 Ah"),
        F("bess_cRate", "0.5C"),
        F("bess_nominalVoltage", "1331.2 V"),
        F("bess_thermalManagement", "Liquid cooling"),
      ]),
      G("spec_fireSafety", [
        F("bess_fireSuppression",
          "Optional: perfluorohexanone, aerosol, water spray"),
        F("bess_fireDetection",
          "AI early warning with three-level detection (module, cluster, compartment)"),
      ]),
      G("spec_efficiency", [
        F("bess_systemEfficiency", "Up to 94% charge/discharge"),
        F("bess_responseTime", "30 ms"),
      ]),
      G("spec_general", [
        F("bess_dimensions", "6058 × 2438 × 2896 mm (W × D × H)"),
        F("common_weight", "< 43 t / < 45 t"),
        F("inv_ip", "IP55"),
        F("bess_antiCorrosion", "C5"),
        F("inv_noise", "≤ 85 dB"),
      ]),
      G("spec_environment", [
        F("common_operatingTemp", "-30 °C to +50 °C (derating at 45 °C and above)"),
        F("bess_humidity", "0–95% RH (non-condensing)"),
        F("bess_altitude", "≤ 5,000 m (derating above 2,000 m)"),
      ]),
    ],
  },
];

/* sitemap:end */

/* ───────────────────────── Lookup ───────────────────────── */

export function findInverter(slug: string): Product | undefined {
  return INVERTER_FAMILY.find((p) => p.slug === slug);
}

export function findBess(slug: string): Product | undefined {
  return BESS.find((p) => p.slug === slug);
}

/**
 * Which catalogue a category slug draws its products from.
 * Returning the array (not a copy) keeps ordering identical everywhere.
 */
export function productsForCategory(slug: string): Product[] | undefined {
  if (slug === "inverters") return INVERTER_FAMILY;
  if (slug === "bess") return BESS;
  return undefined;
}

export function findProductIn(slug: string, productSlug: string): Product | undefined {
  const list = productsForCategory(slug);
  return list?.find((p) => p.slug === productSlug);
}
