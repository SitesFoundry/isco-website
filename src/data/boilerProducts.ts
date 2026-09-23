import { asset } from "@/lib/asset";
/**
 * Boiler product data for ISCO GmbH
 * Link & Oxygen: Combi Boiler — specs from official Excel datasheet
 * Master & Olympia: Condensing Combi Boiler — representative specs (pending brochure)
 *
 * Selling points are categorized into 4 groups (shared across all products):
 * 1. Experience & Trust
 * 2. Product Range & Technology
 * 3. Flexibility & Customization
 * 4. Smart & Expandable
 */

/* ─── Combi Boiler variant (conventional) ─── */
export interface CombiVariant {
  power: string;
  nominalHeatInput: string;
  minimalHeatInput: string;
  nominalHeatOutput: string;
  minimalHeatOutput: string;
  hotWaterHeatInput: string;
  dhwFlowRate30K: string;
  maxHeatingPressure: string;
  dhwPressure: string;
  electricalSupply: string;
  electricalPower: string;
  protectionDegree: string;
  shockProtection: string;
  flueDiameter: string;
  dimensions: string;
  gasInlet: string;
  heatingConnection: string;
  dhwConnection: string;
}

/* ─── Condensing Boiler variant ─── */
export interface CondensingVariant {
  power: string;
  gasInlet: string;
  heatingConnection: string;
  dhwConnection: string;
  noxEmission: string;
  gasPressure: string;
  nominalHeatInput: string;
  minimalHeatInput: string;
  nominalHeatOutput: string;
  minimalHeatOutput: string;
  condensingEfficiency: string;
  hotWaterHeatInput: string;
  dhwFlowRate30K: string;
  maxHeatingPressure: string;
  dhwPressure: string;
  electricalSupply: string;
  electricalPower: string;
  protectionDegree: string;
  shockProtection: string;
  dimensions: string;
}

export interface SellingPointCategory {
  titleKey: string;
  icon: 'shield' | 'cpu' | 'settings' | 'wifi';
  pointKeys: string[];
}

export interface BoilerProduct {
  slug: string;
  name: string;
  series: string;
  type: 'combi' | 'condensing';
  image: string;
  /** Headline metric for the hero card */
  heroMetric: string;
  heroMetricLabel: string;
  powerRange: string;
  /** Features shown as chips / bullet points — i18n translation keys */
  featureKeys: string[];
  /** Combi variants (only for type === 'combi') */
  combiVariants?: CombiVariant[];
  /** Condensing variants (only for type === 'condensing') */
  condensingVariants?: CondensingVariant[];
  certifications: string[];
}

/** Shared selling points for all boiler products — 4 categories */
export const SELLING_POINT_CATEGORIES: SellingPointCategory[] = [
  {
    titleKey: 'sp_trust_title',
    icon: 'shield',
    pointKeys: [
      'sp_trust_1', // 20 years, 30+ countries
      'sp_trust_2', // CE certified
      'sp_trust_3', // 5-year warranty
      'sp_trust_4', // Free installation toolkit
    ],
  },
  {
    titleKey: 'sp_tech_title',
    icon: 'cpu',
    pointKeys: [
      'sp_tech_1', // Conventional + condensing
      'sp_tech_2', // EU brand components
      'sp_tech_3', // ErP compliant, up to 105%
      'sp_tech_4', // Power range 20-150kW
    ],
  },
  {
    titleKey: 'sp_flex_title',
    icon: 'settings',
    pointKeys: [
      'sp_flex_1', // Heat-only and Combi
      'sp_flex_2', // Flexible core component config
      'sp_flex_3', // OEM/ODM accepted
      'sp_flex_4', // SKD available
      'sp_flex_5', // Standard + compact designs
    ],
  },
  {
    titleKey: 'sp_smart_title',
    icon: 'wifi',
    pointKeys: [
      'sp_smart_1', // Heat pump + water tank compatible
      'sp_smart_2', // WiFi control
      'sp_smart_3', // 10+ panel styles
    ],
  },
];

/* ─── Combi Boiler shared data from Excel (GAR Table) ─── */
const COMBI_VARIANTS: CombiVariant[] = [
  {
    power: '18 kW',
    nominalHeatInput: '20',
    minimalHeatInput: '8',
    nominalHeatOutput: '18',
    minimalHeatOutput: '7.1',
    hotWaterHeatInput: '20',
    dhwFlowRate30K: '8.7',
    maxHeatingPressure: '3 bar',
    dhwPressure: '0.5–7 bar',
    electricalSupply: 'AC 230V, 50Hz',
    electricalPower: '97',
    protectionDegree: 'IPX4D',
    shockProtection: 'Class I',
    flueDiameter: '60/100',
    dimensions: '700 × 400 × 260',
    gasInlet: 'G3/4"',
    heatingConnection: 'G3/4"',
    dhwConnection: 'G1/2"',
  },
  {
    power: '24 kW',
    nominalHeatInput: '26.3',
    minimalHeatInput: '10.5',
    nominalHeatOutput: '23.7',
    minimalHeatOutput: '9.3',
    hotWaterHeatInput: '26.3',
    dhwFlowRate30K: '11',
    maxHeatingPressure: '3 bar',
    dhwPressure: '0.5–7 bar',
    electricalSupply: 'AC 230V, 50Hz',
    electricalPower: '110',
    protectionDegree: 'IPX4D',
    shockProtection: 'Class I',
    flueDiameter: '60/100',
    dimensions: '700 × 400 × 330',
    gasInlet: 'G3/4"',
    heatingConnection: 'G3/4"',
    dhwConnection: 'G1/2"',
  },
  {
    power: '32 kW',
    nominalHeatInput: '36',
    minimalHeatInput: '14.5',
    nominalHeatOutput: '32.5',
    minimalHeatOutput: '12.8',
    hotWaterHeatInput: '36',
    dhwFlowRate30K: '15.2',
    maxHeatingPressure: '3 bar',
    dhwPressure: '0.5–7 bar',
    electricalSupply: 'AC 230V, 50Hz',
    electricalPower: '142',
    protectionDegree: 'IPX4D',
    shockProtection: 'Class I',
    flueDiameter: '60/100',
    dimensions: '730 × 460 × 330',
    gasInlet: 'G3/4"',
    heatingConnection: 'G3/4"',
    dhwConnection: 'G1/2"',
  },
  {
    power: '36 kW',
    nominalHeatInput: '40',
    minimalHeatInput: '16',
    nominalHeatOutput: '36',
    minimalHeatOutput: '14',
    hotWaterHeatInput: '40',
    dhwFlowRate30K: '16.8',
    maxHeatingPressure: '3 bar',
    dhwPressure: '0.5–7 bar',
    electricalSupply: 'AC 230V, 50Hz',
    electricalPower: '151',
    protectionDegree: 'IPX4D',
    shockProtection: 'Class I',
    flueDiameter: '60/100',
    dimensions: '730 × 460 × 330',
    gasInlet: 'G3/4"',
    heatingConnection: 'G3/4"',
    dhwConnection: 'G1/2"',
  },
  {
    power: '45 kW',
    nominalHeatInput: '50',
    minimalHeatInput: '15.3',
    nominalHeatOutput: '45',
    minimalHeatOutput: '13.4',
    hotWaterHeatInput: '50',
    dhwFlowRate30K: '21',
    maxHeatingPressure: '3 bar',
    dhwPressure: '0.5–7 bar',
    electricalSupply: 'AC 230V, 50Hz',
    electricalPower: '355',
    protectionDegree: 'IPX4D',
    shockProtection: 'Class I',
    flueDiameter: '80/125',
    dimensions: '870 × 590 × 340',
    gasInlet: 'G3/4"',
    heatingConnection: 'G1"',
    dhwConnection: 'G1/2"',
  },
];

export const BOILER_PRODUCTS: BoilerProduct[] = [
  /* ─── COMBI BOILERS ─── */
  {
    slug: 'link',
    name: 'Link Series',
    series: 'LINK',
    type: 'combi',
    image: asset('/images/combi-boiler-link.png'),
    heroMetric: '18–45 kW',
    heroMetricLabel: 'Power Range',
    powerRange: '18 / 24 / 32 / 36 / 45 kW',
    featureKeys: [
      'feat_combi_1', 'feat_combi_2', 'feat_combi_3', 'feat_combi_4',
      'feat_combi_5', 'feat_combi_6', 'feat_combi_7', 'feat_combi_8',
    ],
    combiVariants: COMBI_VARIANTS,
    certifications: ['CE Certified', '5-Year Full Unit Warranty'],
  },
  {
    slug: 'oxygen',
    name: 'Oxygen Series',
    series: 'OXYGEN',
    type: 'combi',
    image: asset('/images/combi-boiler-oxygen.png'),
    heroMetric: '18–45 kW',
    heroMetricLabel: 'Power Range',
    powerRange: '18 / 24 / 32 / 36 / 45 kW',
    featureKeys: [
      'feat_combi_1', 'feat_combi_2', 'feat_combi_3', 'feat_combi_4',
      'feat_combi_5', 'feat_combi_6', 'feat_combi_7', 'feat_combi_8',
    ],
    combiVariants: COMBI_VARIANTS,
    certifications: ['CE Certified', '5-Year Full Unit Warranty'],
  },

  /* ─── CONDENSING COMBI BOILERS ─── */
  {
    slug: 'master',
    name: 'Master Series',
    series: 'MASTER',
    type: 'condensing',
    image: asset('/images/condensing-boiler-master.png'),
    heroMetric: '24–36 kW',
    heroMetricLabel: 'Power Range',
    powerRange: '24 / 30 / 36 kW',
    featureKeys: [
      'feat_cond_1', 'feat_cond_2', 'feat_cond_3', 'feat_cond_4',
      'feat_cond_5', 'feat_cond_6', 'feat_cond_7', 'feat_cond_8',
    ],
    condensingVariants: [
      {
        power: '24 kW',
        gasInlet: 'G3/4"',
        heatingConnection: 'G3/4"',
        dhwConnection: 'G1/2"',
        noxEmission: 'Class 5 (<70 mg/kW.h)',
        gasPressure: '20 mbar',
        nominalHeatInput: '24',
        minimalHeatInput: '4.8',
        nominalHeatOutput: '23.3',
        minimalHeatOutput: '4.7',
        condensingEfficiency: '105%',
        hotWaterHeatInput: '24',
        dhwFlowRate30K: '11',
        maxHeatingPressure: 'PMS = 3 bar',
        dhwPressure: 'PMW = 0.5–7 bar',
        electricalSupply: 'AC 230V, 50Hz',
        electricalPower: '121',
        protectionDegree: 'IPX5D',
        shockProtection: 'Class I',
        dimensions: '700 × 400 × 260',
      },
      {
        power: '30 kW',
        gasInlet: 'G3/4"',
        heatingConnection: 'G3/4"',
        dhwConnection: 'G1/2"',
        noxEmission: 'Class 5 (<70 mg/kW.h)',
        gasPressure: '20 mbar',
        nominalHeatInput: '30',
        minimalHeatInput: '6',
        nominalHeatOutput: '29.3',
        minimalHeatOutput: '5.9',
        condensingEfficiency: '105%',
        hotWaterHeatInput: '30',
        dhwFlowRate30K: '14',
        maxHeatingPressure: 'PMS = 3 bar',
        dhwPressure: 'PMW = 0.5–7 bar',
        electricalSupply: 'AC 230V, 50Hz',
        electricalPower: '153',
        protectionDegree: 'IPX5D',
        shockProtection: 'Class I',
        dimensions: '700 × 400 × 260',
      },
      {
        power: '36 kW',
        gasInlet: 'G3/4"',
        heatingConnection: 'G3/4"',
        dhwConnection: 'G1/2"',
        noxEmission: 'Class 5 (<70 mg/kW.h)',
        gasPressure: '20 mbar',
        nominalHeatInput: '36',
        minimalHeatInput: '7.2',
        nominalHeatOutput: '35',
        minimalHeatOutput: '7.1',
        condensingEfficiency: '105%',
        hotWaterHeatInput: '36',
        dhwFlowRate30K: '17',
        maxHeatingPressure: 'PMS = 3 bar',
        dhwPressure: 'PMW = 0.5–7 bar',
        electricalSupply: 'AC 230V, 50Hz',
        electricalPower: '195',
        protectionDegree: 'IPX5D',
        shockProtection: 'Class I',
        dimensions: '730 × 460 × 330',
      },
    ],
    certifications: ['CE Certified', 'ErP Directive Compliant', 'NOx Class 5', '5-Year Full Unit Warranty'],
  },
  {
    slug: 'olympia',
    name: 'Olympia Series',
    series: 'OLYMPIA',
    type: 'condensing',
    image: asset('/images/condensing-boiler-olympia.png'),
    heroMetric: '24–36 kW',
    heroMetricLabel: 'Power Range',
    powerRange: '24 / 30 / 36 kW',
    featureKeys: [
      'feat_cond_1', 'feat_cond_2', 'feat_cond_3', 'feat_cond_4',
      'feat_cond_5', 'feat_cond_6', 'feat_cond_7', 'feat_cond_8',
    ],
    condensingVariants: [
      {
        power: '24 kW',
        gasInlet: 'G3/4"',
        heatingConnection: 'G3/4"',
        dhwConnection: 'G1/2"',
        noxEmission: 'Class 5 (<70 mg/kW.h)',
        gasPressure: '20 mbar',
        nominalHeatInput: '24',
        minimalHeatInput: '4.8',
        nominalHeatOutput: '23.3',
        minimalHeatOutput: '4.7',
        condensingEfficiency: '105%',
        hotWaterHeatInput: '24',
        dhwFlowRate30K: '11',
        maxHeatingPressure: 'PMS = 3 bar',
        dhwPressure: 'PMW = 0.5–7 bar',
        electricalSupply: 'AC 230V, 50Hz',
        electricalPower: '121',
        protectionDegree: 'IPX5D',
        shockProtection: 'Class I',
        dimensions: '700 × 400 × 260',
      },
      {
        power: '30 kW',
        gasInlet: 'G3/4"',
        heatingConnection: 'G3/4"',
        dhwConnection: 'G1/2"',
        noxEmission: 'Class 5 (<70 mg/kW.h)',
        gasPressure: '20 mbar',
        nominalHeatInput: '30',
        minimalHeatInput: '6',
        nominalHeatOutput: '29.3',
        minimalHeatOutput: '5.9',
        condensingEfficiency: '105%',
        hotWaterHeatInput: '30',
        dhwFlowRate30K: '14',
        maxHeatingPressure: 'PMS = 3 bar',
        dhwPressure: 'PMW = 0.5–7 bar',
        electricalSupply: 'AC 230V, 50Hz',
        electricalPower: '153',
        protectionDegree: 'IPX5D',
        shockProtection: 'Class I',
        dimensions: '700 × 400 × 260',
      },
      {
        power: '36 kW',
        gasInlet: 'G3/4"',
        heatingConnection: 'G3/4"',
        dhwConnection: 'G1/2"',
        noxEmission: 'Class 5 (<70 mg/kW.h)',
        gasPressure: '20 mbar',
        nominalHeatInput: '36',
        minimalHeatInput: '7.2',
        nominalHeatOutput: '35',
        minimalHeatOutput: '7.1',
        condensingEfficiency: '105%',
        hotWaterHeatInput: '36',
        dhwFlowRate30K: '17',
        maxHeatingPressure: 'PMS = 3 bar',
        dhwPressure: 'PMW = 0.5–7 bar',
        electricalSupply: 'AC 230V, 50Hz',
        electricalPower: '195',
        protectionDegree: 'IPX5D',
        shockProtection: 'Class I',
        dimensions: '730 × 460 × 330',
      },
    ],
    certifications: ['CE Certified', 'ErP Directive Compliant', 'NOx Class 5', '5-Year Full Unit Warranty'],
  },
];

export function getBoilerBySlug(slug: string): BoilerProduct | undefined {
  return BOILER_PRODUCTS.find((p) => p.slug === slug);
}
