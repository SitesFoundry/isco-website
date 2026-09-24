// ============================================================
// ISCO GmbH - Internationalization (i18n) System
// Design: Nordic Clean Energy — Scandinavian Functionalism
// Languages: DE, EN, RU, ES, FR, IT
// ============================================================

export type Language = 'de' | 'en' | 'ru' | 'es' | 'fr' | 'it';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
];

export type TranslationKeys = {
  // Navigation
  nav_home: string;
  nav_about: string;
  nav_solar: string;
  nav_hvac: string;
  nav_contact: string;
  nav_products: string;

  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_cta_solar: string;
  hero_cta_contact: string;

  // About
  about_title: string;
  about_subtitle: string;
  about_text_1: string;
  about_text_2: string;
  about_stat_years: string;
  about_stat_years_label: string;
  about_stat_countries: string;
  about_stat_countries_label: string;
  about_stat_products: string;
  about_stat_products_label: string;
  about_stat_clients: string;
  about_stat_clients_label: string;

  // Solar Section
  solar_title: string;
  solar_subtitle: string;
  solar_panels_title: string;
  solar_panels_desc: string;
  solar_inverters_title: string;
  solar_inverters_desc: string;
  solar_storage_title: string;
  solar_storage_desc: string;
  solar_mounting_title: string;
  solar_mounting_desc: string;
  solar_cables_title: string;
  solar_cables_desc: string;
  solar_accessories_title: string;
  solar_accessories_desc: string;
  learn_more: string;

  // ── Product pages ──────────────────────────────────────────────
  // Written in English first. Other languages omit these keys and fall back
  // to the English values automatically — see getTranslations().
  prod_all_products: string;
  prod_template_title: string;
  prod_template_body: string;
  prod_in_preparation: string;
  prod_view_models: string;
  prod_browse: string;
  prod_other_models: string;
  prod_back_to_category: string;

  // Solar module detail page
  sm_part_number: string;
  sm_key_facts: string;
  sm_power_range: string;
  sm_efficiency: string;
  sm_cell_type: string;
  sm_cell_config: string;
  sm_dimensions: string;
  sm_weight: string;
  sm_dimensions_weight: string;
  sm_loading: string;
  sm_per_pallet: string;
  sm_features_title: string;
  sm_specs_title: string;
  sm_specs_subtitle: string;
  sm_general: string;
  sm_technology: string;
  sm_front_glass: string;
  sm_rear_glass: string;
  sm_frame: string;
  sm_junction_box: string;
  sm_cable: string;
  sm_operating_temp: string;
  sm_max_system_voltage: string;
  sm_nmot: string;
  sm_temp_coefficients: string;
  sm_tempco_pm: string;
  sm_tempco_voc: string;
  sm_tempco_isc: string;
  sm_stc_title: string;
  sm_pmax: string;
  sm_voc: string;
  sm_isc: string;
  sm_vmp: string;
  sm_imp: string;
  sm_eff: string;
  sm_stc_note: string;
  sm_packaging_title: string;
  sm_container: string;
  sm_modules_per_pallet: string;
  sm_loading_quantity: string;
  sm_warranty_title: string;
  sm_product_warranty: string;
  sm_power_warranty: string;
  sm_degradation: string;
  sm_certifications: string;
  sm_f_power_t: string;
  sm_f_power_d: string;
  sm_f_reliability_t: string;
  sm_f_reliability_d: string;
  sm_f_lowlight_t: string;
  sm_f_lowlight_d: string;
  sm_f_degradation_t: string;
  sm_f_degradation_d: string;
  sm_f_tempco_t: string;
  sm_f_tempco_d: string;
  sm_f_antilid_t: string;
  sm_f_antilid_d: string;

  // HVAC Section
  hvac_title: string;
  hvac_subtitle: string;
  hvac_boiler_title: string;
  hvac_boiler_desc: string;
  hvac_heatpump_title: string;
  hvac_heatpump_desc: string;
  hvac_ventilation_title: string;
  hvac_ventilation_desc: string;
  hvac_ac_title: string;
  hvac_ac_desc: string;
  hvac_boiler_combi: string;
  hvac_boiler_condensing: string;

  // Why Choose Us
  why_title: string;
  why_subtitle: string;
  why_quality_title: string;
  why_quality_desc: string;
  why_service_title: string;
  why_service_desc: string;
  why_price_title: string;
  why_price_desc: string;
  why_delivery_title: string;
  why_delivery_desc: string;

  // Contact
  contact_title: string;
  contact_subtitle: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_company: string;
  contact_message: string;
  contact_subject: string;
  contact_send: string;
  contact_sending: string;
  contact_success: string;
  contact_address_title: string;
  contact_email_title: string;
  contact_whatsapp_title: string;
  contact_website_title: string;
  contact_click_to_email: string;

  // Footer
  footer_description: string;
  footer_quick_links: string;
  footer_business: string;
  footer_contact_info: string;
  footer_rights: string;
  footer_privacy: string;
  footer_terms: string;
  footer_imprint: string;

  // CTA
  cta_title: string;
  cta_subtitle: string;
  cta_button: string;

  // Product Detail Page
  product_back_to_hvac: string;
  product_power_range: string;
  product_gas_type: string;
  product_certifications: string;
  product_key_features: string;
  product_tech_specs: string;
  product_why_isco: string;
  product_certs_warranty: string;
  product_view_details: string;
  product_request_quote: string;
  // Combi Boiler specific labels
  product_nominal_heat_input: string;
  product_minimal_heat_input: string;
  product_nominal_heat_output: string;
  product_minimal_heat_output: string;
  product_hot_water_heat_input: string;
  product_dhw_flow_rate: string;
  product_max_heating_pressure: string;
  product_dhw_pressure: string;
  product_electrical_supply: string;
  product_electrical_power: string;
  product_protection_degree: string;
  product_shock_protection: string;
  product_flue_diameter: string;
  product_dimensions: string;
  product_gas_inlet: string;
  product_heating_connection: string;
  product_dhw_connection: string;
  // Condensing Boiler specific labels
  product_efficiency: string;
  product_heating_output: string;
  product_condensing_output: string;
  product_dhw_flow_25k: string;
  product_heating_temp: string;
  product_dhw_temp: string;
  product_gas_consumption: string;
  product_max_pressure: string;
  product_nox_class: string;
  product_gas_pressure: string;
  // Selling point categories
  sp_trust_title: string;
  sp_trust_1: string;
  sp_trust_2: string;
  sp_trust_3: string;
  sp_trust_4: string;
  sp_tech_title: string;
  sp_tech_1: string;
  sp_tech_2: string;
  sp_tech_3: string;
  sp_tech_4: string;
  sp_flex_title: string;
  sp_flex_1: string;
  sp_flex_2: string;
  sp_flex_3: string;
  sp_flex_4: string;
  sp_flex_5: string;
  sp_smart_title: string;
  sp_smart_1: string;
  sp_smart_2: string;
  sp_smart_3: string;

  // Combi Boiler feature bullets
  feat_combi_1: string; // Dual-function
  feat_combi_2: string; // Power range
  feat_combi_3: string; // Gas type
  feat_combi_4: string; // CE
  feat_combi_5: string; // WiFi
  feat_combi_6: string; // Heat pump
  feat_combi_7: string; // Panel designs
  feat_combi_8: string; // Warranty
  // Condensing Boiler feature bullets
  feat_cond_1: string; // Dual-function
  feat_cond_2: string; // Power range
  feat_cond_3: string; // SERMETA
  feat_cond_4: string; // SIT
  feat_cond_5: string; // GRUNDFOS
  feat_cond_6: string; // NOx
  feat_cond_7: string; // WiFi
  feat_cond_8: string; // Heat pump

  // Product detail hardcoded strings
  product_not_found: string;
  product_dhw_heating: string;
  product_combi: string;
  product_gas_natural: string;

  // Common
  request_quote: string;
  view_products: string;
  send_inquiry: string;
};

/*
 * English is the source of truth.
 *
 * New copy is written in English first, so a language that has not been
 * translated yet must fall back *per key* rather than per language. Typing this
 * as Partial lets a language omit keys it has not reached, and
 * getTranslations() fills the gaps from `en` instead of rendering `undefined`
 * on the page. When a translation arrives, add the key to that language's block
 * — nothing else changes.
 */
const translations: Record<Language, Partial<TranslationKeys>> = {
  de: {
    nav_home: 'Startseite',
    nav_about: 'Über uns',
    nav_solar: 'Solar',
    nav_hvac: 'HVAC',
    nav_contact: 'Kontakt',
    nav_products: 'Produkte',

    hero_title: 'Ihre Energielösungen aus einer Hand',
    hero_subtitle: 'ISCO GmbH liefert hochwertige Solar- und HVAC-Produkte für nachhaltige Energie und optimalen Komfort in ganz Europa.',
    hero_cta_solar: 'Solar-Produkte entdecken',
    hero_cta_contact: 'Kontakt aufnehmen',

    about_title: 'Über ISCO GmbH',
    about_subtitle: 'Ihr vertrauenswürdiger Partner für nachhaltige Energielösungen',
    about_text_1: 'ISCO GmbH mit Sitz in Frankfurt am Main ist ein führender Anbieter von Solar- und HVAC-Lösungen in Europa. Wir verbinden deutsche Ingenieursqualität mit globaler Reichweite, um unseren Kunden erstklassige Produkte und Dienstleistungen zu bieten.',
    about_text_2: 'Unser umfassendes Produktportfolio deckt die gesamte Wertschöpfungskette der erneuerbaren Energien und Gebäudetechnik ab — von Solarmodulen und Wechselrichtern bis hin zu Wärmepumpen und Lüftungssystemen.',
    about_stat_years: '10+',
    about_stat_years_label: 'Jahre Erfahrung',
    about_stat_countries: '30+',
    about_stat_countries_label: 'Länder bedient',
    about_stat_products: '500+',
    about_stat_products_label: 'Produkte',
    about_stat_clients: '1000+',
    about_stat_clients_label: 'Zufriedene Kunden',

    solar_title: 'Solar-Energielösungen',
    solar_subtitle: 'Komplette Photovoltaik-Systeme für Privat- und Gewerbekunden',
    solar_panels_title: 'Solarmodule',
    solar_panels_desc: 'Hocheffiziente TopCon- & PERC-monokristalline Module in vier Varianten: Standard, Vollschwarz, flexibel und faltbar — von führenden Herstellern mit bis zu 25%+ Wirkungsgrad.',
    solar_inverters_title: 'Wechselrichter',
    solar_inverters_desc: 'Inselwechselrichter für netzunabhängige Systeme und Hybridwechselrichter für die Kombination von Solar-, Batterie- und Netzstrom.',
    solar_storage_title: 'BESS',
    solar_storage_desc: 'Tragbare Powerstationen, Heim-Energiespeicher und gewerbliche/industrielle Speicherlösungen für zuverlässige Stromversorgung und maximale Eigenverbrauchsoptimierung.',
    solar_mounting_title: 'PV-Montagesysteme',
    solar_mounting_desc: 'Metall- und FRP-Verbundwerkstoff-Montagesysteme. Die leichten, hochfesten Verbundhalterungen sind in verschiedenen Farben erhältlich und als Komplett-Set für 4 Module konzipiert — ideal für kleine Hausdächer und kombinierbar für größere Anlagen.',
    solar_cables_title: 'PV-Kabel & MC4-Stecker',
    solar_cables_desc: 'Solarkabel und MC4-Steckverbinder in verschiedenen Spezifikationen für sichere und normgerechte Installationen.',
    solar_accessories_title: 'Solar-Anwendungsprodukte',
    solar_accessories_desc: 'Gleichstrombetriebene Geräte (12V/24V/48V): Klimaanlagen, LKW-Klimaanlagen, Gefriertruhen, Kühlschränke, Wasserpumpen, Ventilatoren und Fernseher. Tagsüber wird Solarstrom in Batterien gespeichert und vorrangig genutzt; bei Bedarf ergänzt durch Netzstrom — ideal für netzferne Standorte und zur Senkung der Stromkosten.',
    learn_more: 'Mehr erfahren',

    hvac_title: 'HVAC-Lösungen',
    hvac_subtitle: 'Moderne Heizungs-, Lüftungs- und Klimatechnik für jeden Bedarf',
    hvac_boiler_title: 'Gaskessel',
    hvac_boiler_desc: 'Konventionelle und hocheffiziente Brennwertkessel für Warmwasser + Heizung oder reinen Heizbetrieb. Verfügbar mit Premium-Komponenten (SERMETA-Wärmetauscher, SIT-Gasventil, GRUNDFOS-Pumpe) oder kosteneffizienten Alternativen. Alle Produkte CE-zertifiziert mit optionaler WiFi-Fernsteuerung.',
    hvac_heatpump_title: 'Luft-Wärmepumpen',
    hvac_heatpump_desc: 'Hocheffiziente Luft-Wasser-Wärmepumpen, die Umgebungswärme nutzen und deutlich sparsamer als elektrische Heizungen arbeiten. Dank EVI-Einspritztechnologie zuverlässige Heizleistung bis −25 °C.',
    hvac_ventilation_title: 'Wärmerückgewinnungs-Lüftung',
    hvac_ventilation_desc: 'Lüftungsanlagen, die beim Luftaustausch die Wärme- bzw. Kälteenergie der Abluft zurückgewinnen — für optimale Raumluftqualität bei minimalem Energieverlust im Sommer wie im Winter.',
    hvac_ac_title: 'Klimaanlagen',
    hvac_ac_desc: 'Systeme mit Inverter-, VRV- und VFV-Technologie, maßgeschneidert für individuelle Anforderungen. ODM-Lösungen verfügbar für kundenspezifische Projekte.',
    hvac_boiler_combi: 'Kombikessel',
    hvac_boiler_condensing: 'Brennwert-Kombikessel',

    why_title: 'Warum ISCO GmbH?',
    why_subtitle: 'Was uns von anderen unterscheidet',
    why_quality_title: 'Premium-Qualität',
    why_quality_desc: 'Nur geprüfte Produkte führender Hersteller mit internationalen Zertifizierungen.',
    why_service_title: 'Kompetente Beratung',
    why_service_desc: 'Unser erfahrenes Team berät Sie individuell und findet die optimale Lösung.',
    why_price_title: 'Wettbewerbsfähige Preise',
    why_price_desc: 'Direkter Zugang zu Herstellern ermöglicht uns attraktive Konditionen.',
    why_delivery_title: 'Schnelle Lieferung',
    why_delivery_desc: 'Effiziente Logistik und Lagerhaltung für kurze Lieferzeiten europaweit.',

    contact_title: 'Kontaktieren Sie uns',
    contact_subtitle: 'Wir freuen uns auf Ihre Anfrage',
    contact_name: 'Ihr Name',
    contact_email: 'E-Mail-Adresse',
    contact_phone: 'Telefonnummer',
    contact_company: 'Unternehmen',
    contact_message: 'Ihre Nachricht',
    contact_subject: 'Betreff',
    contact_send: 'Nachricht senden',
    contact_sending: 'Wird gesendet...',
    contact_success: 'Vielen Dank! Ihre Nachricht wurde gesendet.',
    contact_address_title: 'Adresse',
    contact_email_title: 'E-Mail',
    contact_whatsapp_title: 'WhatsApp',
    contact_website_title: 'Webseite',
    contact_click_to_email: 'Klicken Sie, um eine E-Mail zu senden',

    footer_description: 'ISCO GmbH — Ihr Partner für Solar- und HVAC-Lösungen in Europa. Qualität, Zuverlässigkeit und Innovation.',
    footer_quick_links: 'Schnelllinks',
    footer_business: 'Geschäftsbereiche',
    footer_contact_info: 'Kontaktdaten',
    footer_rights: '© 2026 ISCO GmbH. Alle Rechte vorbehalten.',
    footer_privacy: 'Datenschutz',
    footer_terms: 'AGB',
    footer_imprint: 'Impressum',

    cta_title: 'Bereit für nachhaltige Energie?',
    cta_subtitle: 'Kontaktieren Sie uns noch heute für ein unverbindliches Angebot.',
    cta_button: 'Jetzt anfragen',

    request_quote: 'Angebot anfordern',
    view_products: 'Produkte ansehen',
    send_inquiry: 'Anfrage senden',

    product_not_found: 'Produkt nicht gefunden',
    product_dhw_heating: 'Warmwasser + Heizung',
    product_combi: 'Kombi',
    product_gas_natural: 'G20 (Erdgas)',

    feat_combi_1: 'Doppelfunktion: Zentralheizung + Warmwasserbereitung',
    feat_combi_2: 'Leistungsbereich: 18–45 kW — Wohngebäude bis leichtes Gewerbe',
    feat_combi_3: 'Gasart: G20 (Erdgas)',
    feat_combi_4: 'CE-zertifiziert',
    feat_combi_5: 'Optionale Wi-Fi-Steuerung',
    feat_combi_6: 'Kompatibel mit Wärmepumpe',
    feat_combi_7: 'Über 10 Frontpanel-Designs',
    feat_combi_8: '5 Jahre Vollgarantie',
    feat_cond_1: 'Doppelfunktion: Zentralheizung + Warmwasserbereitung',
    feat_cond_2: 'Leistungsbereich: 24 / 30 / 36 kW — Verschiedene Szenarien',
    feat_cond_3: 'SERMETA-Wärmetauscher',
    feat_cond_4: 'SIT Gas-Proportionalventil',
    feat_cond_5: 'GRUNDFOS-Umwälzpumpe',
    feat_cond_6: 'NOx-Klasse 5 (<70 mg/kWh) — Erfüllt ErP-Richtlinie',
    feat_cond_7: 'Optionale Wi-Fi-Steuerung',
    feat_cond_8: 'Kompatibel mit Wärmepumpe',

    product_back_to_hvac: 'Zurück zu HVAC',
    product_power_range: 'Leistungsbereich',
    product_gas_type: 'Gasart',
    product_certifications: 'Zertifizierungen',
    product_key_features: 'Hauptmerkmale',
    product_tech_specs: 'Technische Daten',
    product_why_isco: 'Warum ISCO',
    product_certs_warranty: 'Zertifizierungen & Garantie',
    product_view_details: 'Details ansehen',
    product_request_quote: 'Angebot anfordern',
    product_nominal_heat_input: 'Nenn-Wärmeleistung (kW)',
    product_minimal_heat_input: 'Min. Wärmeleistung (kW)',
    product_nominal_heat_output: 'Nenn-Heizleistung 80/60°C (kW)',
    product_minimal_heat_output: 'Min. Heizleistung 80/60°C (kW)',
    product_hot_water_heat_input: 'Warmwasser-Wärmeleistung (kW)',
    product_dhw_flow_rate: 'Warmwasser-Durchfluss ΔT=30K (kg/min)',
    product_max_heating_pressure: 'Max. Heizungsdruck',
    product_dhw_pressure: 'Warmwasserdruck',
    product_electrical_supply: 'Elektrischer Anschluss',
    product_electrical_power: 'Elektrische Leistung (W)',
    product_protection_degree: 'Schutzart',
    product_shock_protection: 'Schutzklasse',
    product_flue_diameter: 'Abgasrohr-Durchmesser (mm)',
    product_dimensions: 'Abmessungen B×H×T (mm)',
    product_gas_inlet: 'Gasanschluss',
    product_heating_connection: 'Heizungsanschluss Vor-/Rücklauf',
    product_dhw_connection: 'Warmwasseranschluss Ein-/Ausgang',
    product_efficiency: 'Wirkungsgrad',
    product_heating_output: 'Heizleistung Max/Min (kW)',
    product_condensing_output: 'Brennwertleistung Max/Min (kW)',
    product_dhw_flow_25k: 'Warmwasser ΔT=25K (L/min)',
    product_heating_temp: 'Heizungstemperatur',
    product_dhw_temp: 'Warmwassertemperatur',
    product_gas_consumption: 'Gasverbrauch Max/Min (m³/h)',
    product_max_pressure: 'Max. Druck (Heizung / Wasser)',
    product_nox_class: 'NOx-Klasse',
    product_gas_pressure: 'Gasdruck (mbar)',
    sp_trust_title: 'Erfahrung & Vertrauen',
    sp_trust_1: '20 Jahre Erfahrung in der Herstellung und im Vertrieb von Gaskesseln, Export in über 30 Länder und Regionen',
    sp_trust_2: 'CE-zertifizierte Produkte',
    sp_trust_3: '5 Jahre Vollgarantie',
    sp_trust_4: 'Kostenloses Installations- und Inbetriebnahme-Werkzeugset für Großhändler',
    sp_tech_title: 'Produktpalette & Technologie',
    sp_tech_1: 'Sowohl konventionelle als auch hocheffiziente Brennwertkessel verfügbar',
    sp_tech_2: 'Europäische Marken-Kernkomponenten',
    sp_tech_3: 'Erfüllt europäische Energieeffizienzstandards, bis zu 105% Wirkungsgrad',
    sp_tech_4: 'Leistungsbereich 20–150 kW für verschiedene Anwendungsszenarien',
    sp_flex_title: 'Flexibilität & Anpassung',
    sp_flex_1: 'Nur-Heizung und Kombi (Heizung + Warmwasser) Modelle verfügbar',
    sp_flex_2: 'Flexible Kernkomponenten-Konfiguration mit starker Marktanpassungsfähigkeit',
    sp_flex_3: 'OEM und ODM akzeptiert, erfüllt Lokalisierungsanforderungen',
    sp_flex_4: 'SKD-Lieferung (teilzerlegt) nach Kundenwunsch möglich',
    sp_flex_5: 'Standard- und Kompaktdesigns für verschiedene Installationsräume',
    sp_smart_title: 'Smart & Erweiterbar',
    sp_smart_1: 'Kompatibel mit Luft-Wärmepumpen und Warmwasserspeichern',
    sp_smart_2: 'Optionale WiFi-Steuerung für Fernbedienung und Smart-Home-Integration',
    sp_smart_3: 'Über 10 aktuelle Frontpanel-Designs zur Auswahl',
  },

  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_solar: 'Solar',
    nav_hvac: 'HVAC',
    nav_contact: 'Contact',
    nav_products: 'Products',

    hero_title: 'Your Complete Energy Solutions Partner',
    hero_subtitle: 'ISCO GmbH delivers premium Solar and HVAC products for sustainable energy and optimal comfort across Europe.',
    hero_cta_solar: 'Explore Solar Products',
    hero_cta_contact: 'Get in Touch',

    about_title: 'About ISCO GmbH',
    about_subtitle: 'Your trusted partner for sustainable energy solutions',
    about_text_1: 'Based in Frankfurt am Main, ISCO GmbH is a leading provider of Solar and HVAC solutions across Europe. We combine German engineering excellence with global reach to deliver premium products and services to our clients.',
    about_text_2: 'Our comprehensive product portfolio covers the entire value chain of renewable energy and building technology — from solar panels and inverters to heat pumps and ventilation systems.',
    about_stat_years: '10+',
    about_stat_years_label: 'Years Experience',
    about_stat_countries: '30+',
    about_stat_countries_label: 'Countries Served',
    about_stat_products: '500+',
    about_stat_products_label: 'Products',
    about_stat_clients: '1000+',
    about_stat_clients_label: 'Satisfied Clients',

    solar_title: 'Solar Energy Solutions',
    solar_subtitle: 'Complete photovoltaic systems for residential and commercial applications',
    solar_panels_title: 'Solar Modules',
    solar_panels_desc: 'High-efficiency TopCon & PERC monocrystalline modules available in four types: standard, all-black, flexible, and foldable — from leading manufacturers with up to 25%+ efficiency.',
    solar_inverters_title: 'Inverters',
    solar_inverters_desc: 'Off-grid inverters for standalone systems and hybrid inverters that seamlessly combine solar, battery, and grid power sources.',
    solar_storage_title: 'BESS',
    solar_storage_desc: 'Portable power stations, residential home storage, and commercial & industrial (C&I) energy storage solutions for reliable power supply and maximum self-consumption optimization.',
    solar_mounting_title: 'PV Mounting Systems',
    solar_mounting_desc: 'Metal and FRP composite mounting systems. The lightweight, high-strength composite brackets come in multiple colors and are available as a complete 4-panel kit with all installation components — ideal for small residential rooftops and expandable for larger arrays.',
    solar_cables_title: 'PV Cables & MC4 Connectors',
    solar_cables_desc: 'Solar cables and MC4 connectors in various specifications for safe, code-compliant photovoltaic installations.',
    solar_accessories_title: 'Solar-Powered Products',
    solar_accessories_desc: 'DC-powered appliances (12V/24V/48V): air conditioners, truck air conditioners, freezers, refrigerators, water pumps, fans, and TVs. Solar energy is stored in batteries during daylight and used as the primary power source, with grid power as backup — perfect for off-grid locations and reducing electricity costs.',
    learn_more: 'Learn more',

    /* ── Product pages ──
     * English-first. De/Ru/Es/Fr/It fall back to these strings until a
     * translation is added; nothing else needs to change when it is. */
    prod_all_products: 'All products',
    prod_template_title: 'Detailed information is being prepared',
    prod_template_body:
      'This product range is available from ISCO GmbH. The full technical documentation and product listing for this category are being prepared and will appear here shortly.',
    prod_in_preparation: 'In preparation',
    prod_view_models: 'View models',
    prod_browse: 'Browse',
    prod_other_models: 'Other models',
    prod_back_to_category: 'Back to category',

    sm_part_number: 'Part number',
    sm_key_facts: 'Key facts',
    sm_power_range: 'Power range',
    sm_efficiency: 'Peak efficiency',
    sm_cell_type: 'Cell type',
    sm_cell_config: 'Cell configuration',
    sm_dimensions: 'Dimensions',
    sm_weight: 'Weight',
    sm_dimensions_weight: 'Dimensions & weight',
    sm_loading: '40HQ loading quantity',
    sm_per_pallet: 'Modules per pallet',
    sm_features_title: 'Key features',
    sm_specs_title: 'Technical specifications',
    sm_specs_subtitle: 'Values given under standard test conditions unless stated otherwise',
    sm_general: 'Mechanical & general',
    sm_technology: 'Technology',
    sm_front_glass: 'Front glass',
    sm_rear_glass: 'Rear glass',
    sm_frame: 'Frame',
    sm_junction_box: 'Junction box',
    sm_cable: 'Cable',
    sm_operating_temp: 'Operating temperature',
    sm_max_system_voltage: 'Maximum system voltage',
    sm_nmot: 'NMOT',
    sm_temp_coefficients: 'Temperature coefficients',
    sm_tempco_pm: 'Temperature coefficient (Pm)',
    sm_tempco_voc: 'Temperature coefficient (Voc)',
    sm_tempco_isc: 'Temperature coefficient (Isc)',
    sm_stc_title: 'Electrical data (STC)',
    sm_pmax: 'Maximum power Pmax (W)',
    sm_voc: 'Open-circuit voltage Voc (V)',
    sm_isc: 'Short-circuit current Isc (A)',
    sm_vmp: 'Voltage at Pmax Vmp (V)',
    sm_imp: 'Current at Pmax Imp (A)',
    sm_eff: 'Module efficiency (%)',
    sm_stc_note:
      'STC: irradiance 1000 W/m², cell temperature 25 °C, AM 1.5. Bifacial modules can gain up to 25% additional power from the rear side depending on installation.',
    sm_packaging_title: 'Packaging & loading',
    sm_container: 'Container',
    sm_modules_per_pallet: 'Modules per pallet',
    sm_loading_quantity: 'Total loading quantity',
    sm_warranty_title: 'Warranty & certification',
    sm_product_warranty: 'Product warranty',
    sm_power_warranty: 'Linear power warranty',
    sm_degradation: 'Power degradation',
    sm_certifications: 'Certifications',
    sm_f_power_t: 'High power output',
    sm_f_power_d:
      'N-type multi-busbar (MBB) half-cell technology improves energy density and delivers higher output power. With high bifaciality, up to 25% additional power gain is achievable from the rear side.',
    sm_f_reliability_t: 'High reliability',
    sm_f_reliability_d:
      'Passed TÜV-certified salt mist and ammonia corrosion tests, as well as 2400 Pa wind load and 5400 Pa snow load tests.',
    sm_f_lowlight_t: 'Better low-light performance',
    sm_f_lowlight_d:
      'Outperforms conventional modules under low irradiance conditions such as cloudy, hazy, or overcast weather.',
    sm_f_degradation_t: 'Low power degradation',
    sm_f_degradation_d:
      'First-year degradation below 1.0%, then a linear 0.40% per year over 30 years (years 2–30).',
    sm_f_tempco_t: 'Low temperature coefficient',
    sm_f_tempco_d:
      'Passivated contact cell technology enables higher power generation under real operating conditions.',
    sm_f_antilid_t: 'Better anti-LID',
    sm_f_antilid_d:
      'N-type cells are free from boron-oxygen (B-O) complex-induced LID, further enhancing long-term energy yield.',


    hvac_title: 'HVAC Solutions',
    hvac_subtitle: 'Modern heating, ventilation and air conditioning for every need',
    hvac_boiler_title: 'Gas Boilers',
    hvac_boiler_desc: 'Conventional and high-efficiency condensing boilers for combi (hot water + heating) or heating-only mode. Available with premium components (SERMETA heat exchanger, SIT gas valve, GRUNDFOS pump) or cost-effective alternatives. All products CE-certified with optional WiFi remote control for smart home comfort.',
    hvac_heatpump_title: 'Air Source Heat Pumps',
    hvac_heatpump_desc: 'High-efficiency air-to-water heat pumps that extract ambient heat and deliver significant energy savings over electric heating. EVI enhanced vapor injection technology ensures reliable heating performance down to −25°C.',
    hvac_ventilation_title: 'Heat Recovery Ventilation (HRV)',
    hvac_ventilation_desc: 'Ventilation systems that recover thermal energy from exhaust air during fresh air exchange — reclaiming both heating and cooling energy for optimal indoor air quality with minimal energy loss in summer and winter.',
    hvac_ac_title: 'Air Conditioning',
    hvac_ac_desc: 'Systems featuring Inverter, Variable Refrigerant Volume (VRV), and Variable Fan Volume (VFV) technology, tailored to real-world requirements. ODM solutions available for customized projects.',
    hvac_boiler_combi: 'Combi Boiler',
    hvac_boiler_condensing: 'Condensing Combi Boiler',

    why_title: 'Why ISCO GmbH?',
    why_subtitle: 'What sets us apart from the competition',
    why_quality_title: 'Premium Quality',
    why_quality_desc: 'Only certified products from leading manufacturers with international certifications.',
    why_service_title: 'Expert Consultation',
    why_service_desc: 'Our experienced team provides personalized advice to find the optimal solution.',
    why_price_title: 'Competitive Pricing',
    why_price_desc: 'Direct access to manufacturers enables us to offer attractive conditions.',
    why_delivery_title: 'Fast Delivery',
    why_delivery_desc: 'Efficient logistics and warehousing for short delivery times across Europe.',

    contact_title: 'Contact Us',
    contact_subtitle: 'We look forward to hearing from you',
    contact_name: 'Your Name',
    contact_email: 'Email Address',
    contact_phone: 'Phone Number',
    contact_company: 'Company',
    contact_message: 'Your Message',
    contact_subject: 'Subject',
    contact_send: 'Send Message',
    contact_sending: 'Sending...',
    contact_success: 'Thank you! Your message has been sent.',
    contact_address_title: 'Address',
    contact_email_title: 'Email',
    contact_whatsapp_title: 'WhatsApp',
    contact_website_title: 'Website',
    contact_click_to_email: 'Click to send an email',

    footer_description: 'ISCO GmbH — Your partner for Solar and HVAC solutions in Europe. Quality, reliability and innovation.',
    footer_quick_links: 'Quick Links',
    footer_business: 'Business Areas',
    footer_contact_info: 'Contact Info',
    footer_rights: '© 2026 ISCO GmbH. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms & Conditions',
    footer_imprint: 'Imprint',

    cta_title: 'Ready for Sustainable Energy?',
    cta_subtitle: 'Contact us today for a free, no-obligation quote.',
    cta_button: 'Request a Quote',

    request_quote: 'Request Quote',
    view_products: 'View Products',
    send_inquiry: 'Send Inquiry',

    product_not_found: 'Product Not Found',
    product_dhw_heating: 'DHW + Heating',
    product_combi: 'Combi',
    product_gas_natural: 'G20 (Natural Gas)',

    feat_combi_1: 'Dual-function: Central Heating + Domestic Hot Water',
    feat_combi_2: 'Power Range: 18–45 kW — Residential to Light Commercial',
    feat_combi_3: 'Gas Type: G20 (Natural Gas)',
    feat_combi_4: 'CE Certified',
    feat_combi_5: 'Optional Wi-Fi Control',
    feat_combi_6: 'Heat Pump Compatible',
    feat_combi_7: '10+ Front Panel Designs',
    feat_combi_8: '5-Year Full Unit Warranty',
    feat_cond_1: 'Dual-function: Central Heating + Domestic Hot Water',
    feat_cond_2: 'Power Range: 24 / 30 / 36 kW — Multiple Scenarios',
    feat_cond_3: 'SERMETA Heat Exchanger',
    feat_cond_4: 'SIT Gas Proportional Valve',
    feat_cond_5: 'GRUNDFOS Circulation Pump',
    feat_cond_6: 'NOx Class 5 (<70 mg/kWh) — Meets ErP Directive',
    feat_cond_7: 'Optional Wi-Fi Control',
    feat_cond_8: 'Heat Pump Compatible',

    product_back_to_hvac: 'Back to HVAC',
    product_power_range: 'Power Range',
    product_gas_type: 'Gas Type',
    product_certifications: 'Certifications',
    product_key_features: 'Key Features',
    product_tech_specs: 'Technical Specifications',
    product_why_isco: 'Why Choose ISCO',
    product_certs_warranty: 'Certifications & Warranty',
    product_view_details: 'View Details',
    product_request_quote: 'Request a Quote',
    product_nominal_heat_input: 'Nominal Heat Input (kW)',
    product_minimal_heat_input: 'Minimal Heat Input (kW)',
    product_nominal_heat_output: 'Nominal Heat Output 80/60°C (kW)',
    product_minimal_heat_output: 'Minimal Heat Output 80/60°C (kW)',
    product_hot_water_heat_input: 'Hot Water Heat Input (kW)',
    product_dhw_flow_rate: 'DHW Flow Rate ΔT=30K (kg/min)',
    product_max_heating_pressure: 'Max Heating Pressure',
    product_dhw_pressure: 'DHW Pressure',
    product_electrical_supply: 'Electrical Supply',
    product_electrical_power: 'Electrical Power (W)',
    product_protection_degree: 'Protection Degree',
    product_shock_protection: 'Electric Shock Protection',
    product_flue_diameter: 'Flue Diameter (mm)',
    product_dimensions: 'Dimensions W×H×D (mm)',
    product_gas_inlet: 'Gas Inlet Connection',
    product_heating_connection: 'Heating Water Supply/Return',
    product_dhw_connection: 'DHW Inlet/Outlet',
    product_efficiency: 'Efficiency',
    product_heating_output: 'Heating Output Max/Min (kW)',
    product_condensing_output: 'Condensing Output Max/Min (kW)',
    product_dhw_flow_25k: 'DHW Flow ΔT=25K (L/min)',
    product_heating_temp: 'Heating Temperature Range',
    product_dhw_temp: 'DHW Temperature Range',
    product_gas_consumption: 'Gas Consumption Max/Min (m³/h)',
    product_max_pressure: 'Max Pressure (Heating / Water)',
    product_nox_class: 'NOx Class',
    product_gas_pressure: 'Gas Pressure (mbar)',
    sp_trust_title: 'Experience & Trust',
    sp_trust_1: '20 years of gas boiler manufacturing and sales experience, exported to 30+ countries and regions',
    sp_trust_2: 'CE certified products',
    sp_trust_3: '5-year full unit warranty',
    sp_trust_4: 'Free installation and commissioning toolkit for wholesale buyers',
    sp_tech_title: 'Product Range & Technology',
    sp_tech_1: 'Both conventional and high-efficiency condensing boilers available',
    sp_tech_2: 'European brand key core components',
    sp_tech_3: 'Meets European energy efficiency standards, up to 105% efficiency',
    sp_tech_4: 'Power range 20–150 kW, covering diverse application scenarios',
    sp_flex_title: 'Flexibility & Customization',
    sp_flex_1: 'Heat-only and Combi (heating + domestic hot water) models available',
    sp_flex_2: 'Flexible core component configuration with strong market adaptability',
    sp_flex_3: 'OEM and ODM accepted, meeting localization requirements',
    sp_flex_4: 'SKD (semi-knocked-down) delivery available per customer request',
    sp_flex_5: 'Standard and compact designs for different installation spaces',
    sp_smart_title: 'Smart & Expandable',
    sp_smart_1: 'Compatible with air source heat pumps and water tanks',
    sp_smart_2: 'Optional WiFi control for remote operation and smart home integration',
    sp_smart_3: '10+ latest front panel designs available to choose from',
  },

  ru: {
    nav_home: 'Главная',
    nav_about: 'О нас',
    nav_solar: 'Солнечная энергия',
    nav_hvac: 'ОВиК',
    nav_contact: 'Контакты',
    nav_products: 'Продукция',

    hero_title: 'Ваш надёжный партнёр в энергетических решениях',
    hero_subtitle: 'ISCO GmbH поставляет высококачественные солнечные и ОВиК-продукты для устойчивой энергетики и оптимального комфорта по всей Европе.',
    hero_cta_solar: 'Солнечные продукты',
    hero_cta_contact: 'Связаться с нами',

    about_title: 'Об ISCO GmbH',
    about_subtitle: 'Ваш надёжный партнёр в области устойчивых энергетических решений',
    about_text_1: 'Компания ISCO GmbH, расположенная во Франкфурте-на-Майне, является ведущим поставщиком солнечных и ОВиК-решений в Европе. Мы сочетаем немецкое инженерное качество с глобальным охватом.',
    about_text_2: 'Наш обширный портфель продукции охватывает всю цепочку создания стоимости в области возобновляемой энергетики и строительных технологий.',
    about_stat_years: '10+',
    about_stat_years_label: 'Лет опыта',
    about_stat_countries: '30+',
    about_stat_countries_label: 'Стран обслужено',
    about_stat_products: '500+',
    about_stat_products_label: 'Продуктов',
    about_stat_clients: '1000+',
    about_stat_clients_label: 'Довольных клиентов',

    solar_title: 'Солнечные энергетические решения',
    solar_subtitle: 'Комплексные фотоэлектрические системы для жилых и коммерческих объектов',
    solar_panels_title: 'Солнечные модули',
    solar_panels_desc: 'Высокоэффективные монокристаллические модули TopCon и PERC четырёх типов: стандартные, полностью чёрные, гибкие и складные — от ведущих производителей с КПД до 25%+.',
    solar_inverters_title: 'Инверторы',
    solar_inverters_desc: 'Автономные инверторы для изолированных систем и гибридные инверторы для комбинирования солнечной, аккумуляторной и сетевой энергии.',
    solar_storage_title: 'BESS',
    solar_storage_desc: 'Портативные электростанции, домашние системы хранения и коммерческие/промышленные накопители энергии для надёжного электроснабжения и максимальной оптимизации собственного потребления.',
    solar_mounting_title: 'Системы крепления ФЭМ',
    solar_mounting_desc: 'Металлические и композитные (FRP) системы крепления. Лёгкие и прочные композитные кронштейны доступны в различных цветах и поставляются в комплекте на 4 панели со всеми монтажными элементами — идеально для небольших крыш и расширяемы для крупных массивов.',
    solar_cables_title: 'Фотоэлектрические кабели и MC4',
    solar_cables_desc: 'Солнечные кабели и разъёмы MC4 различных спецификаций для безопасных и нормативно-соответствующих фотоэлектрических установок.',
    solar_accessories_title: 'Солнечные продукты',
    solar_accessories_desc: 'Устройства постоянного тока (12В/24В/48В): кондиционеры, кондиционеры для грузовиков, морозильники, холодильники, водяные насосы, вентиляторы и телевизоры. Солнечная энергия накапливается в аккумуляторах днём и используется в первую очередь; при необходимости дополняется сетевым электричеством — идеально для удалённых мест и снижения расходов на электроэнергию.',
    learn_more: 'Подробнее',

    hvac_title: 'Решения ОВиК',
    hvac_subtitle: 'Современное отопление, вентиляция и кондиционирование для любых задач',
    hvac_boiler_title: 'Газовые котлы',
    hvac_boiler_desc: 'Конвекционные и высокоэффективные конденсационные котлы для комбинированного (ГВС + отопление) или только отопительного режима. Доступны с премиальными компонентами (теплообменник SERMETA, газовый клапан SIT, насос GRUNDFOS) или экономичными альтернативами. Все продукты сертифицированы CE с опциональным WiFi-управлением.',
    hvac_heatpump_title: 'Воздушные тепловые насосы',
    hvac_heatpump_desc: 'Высокоэффективные тепловые насосы воздух-вода, извлекающие тепло из окружающего воздуха и значительно экономичнее электрического отопления. Технология EVI обеспечивает надёжную работу при температуре до −25°C.',
    hvac_ventilation_title: 'Рекуперация тепла (HRV)',
    hvac_ventilation_desc: 'Вентиляционные системы, рекуперирующие тепловую энергию из вытяжного воздуха при воздухообмене — сохраняя энергию отопления и охлаждения для оптимального качества воздуха при минимальных потерях летом и зимой.',
    hvac_ac_title: 'Кондиционирование',
    hvac_ac_desc: 'Системы с технологиями Inverter, VRV и VFV, адаптированные к реальным потребностям. Доступны ODM-решения для индивидуальных проектов.',
    hvac_boiler_combi: 'Комбикотёл',
    hvac_boiler_condensing: 'Конденсационный комбикотёл',

    why_title: 'Почему ISCO GmbH?',
    why_subtitle: 'Что отличает нас от конкурентов',
    why_quality_title: 'Премиум качество',
    why_quality_desc: 'Только сертифицированная продукция ведущих производителей с международными сертификатами.',
    why_service_title: 'Экспертная консультация',
    why_service_desc: 'Наша опытная команда предоставит индивидуальную консультацию.',
    why_price_title: 'Конкурентные цены',
    why_price_desc: 'Прямой доступ к производителям позволяет предлагать привлекательные условия.',
    why_delivery_title: 'Быстрая доставка',
    why_delivery_desc: 'Эффективная логистика для коротких сроков доставки по всей Европе.',

    contact_title: 'Свяжитесь с нами',
    contact_subtitle: 'Мы будем рады вашему обращению',
    contact_name: 'Ваше имя',
    contact_email: 'Электронная почта',
    contact_phone: 'Телефон',
    contact_company: 'Компания',
    contact_message: 'Ваше сообщение',
    contact_subject: 'Тема',
    contact_send: 'Отправить сообщение',
    contact_sending: 'Отправка...',
    contact_success: 'Спасибо! Ваше сообщение отправлено.',
    contact_address_title: 'Адрес',
    contact_email_title: 'Эл. почта',
    contact_whatsapp_title: 'WhatsApp',
    contact_website_title: 'Сайт',
    contact_click_to_email: 'Нажмите, чтобы отправить письмо',

    footer_description: 'ISCO GmbH — Ваш партнёр в области солнечных и ОВиК-решений в Европе.',
    footer_quick_links: 'Быстрые ссылки',
    footer_business: 'Направления',
    footer_contact_info: 'Контактная информация',
    footer_rights: '© 2026 ISCO GmbH. Все права защищены.',
    footer_privacy: 'Конфиденциальность',
    footer_terms: 'Условия',
    footer_imprint: 'Импрессум',

    cta_title: 'Готовы к устойчивой энергетике?',
    cta_subtitle: 'Свяжитесь с нами сегодня для бесплатного расчёта.',
    cta_button: 'Запросить предложение',

    request_quote: 'Запросить цену',
    view_products: 'Смотреть продукцию',
    send_inquiry: 'Отправить запрос',

    product_not_found: 'Продукт не найден',
    product_dhw_heating: 'ГВС + Отопление',
    product_combi: 'Комби',
    product_gas_natural: 'G20 (Природный газ)',

    feat_combi_1: 'Двойная функция: центральное отопление + горячее водоснабжение',
    feat_combi_2: 'Диапазон мощности: 18–45 кВт — жилые и лёгкие коммерческие объекты',
    feat_combi_3: 'Тип газа: G20 (природный газ)',
    feat_combi_4: 'Сертификат CE',
    feat_combi_5: 'Опциональное управление по Wi-Fi',
    feat_combi_6: 'Совместимость с тепловым насосом',
    feat_combi_7: 'Более 10 дизайнов передней панели',
    feat_combi_8: '5-летняя полная гарантия',
    feat_cond_1: 'Двойная функция: центральное отопление + горячее водоснабжение',
    feat_cond_2: 'Диапазон мощности: 24 / 30 / 36 кВт — различные сценарии',
    feat_cond_3: 'Теплообменник SERMETA',
    feat_cond_4: 'Газовый пропорциональный клапан SIT',
    feat_cond_5: 'Циркуляционный насос GRUNDFOS',
    feat_cond_6: 'Класс NOx 5 (<70 мг/кВтч) — соответствует директиве ErP',
    feat_cond_7: 'Опциональное управление по Wi-Fi',
    feat_cond_8: 'Совместимость с тепловым насосом',

    product_back_to_hvac: 'Назад к ОВиК',
    product_power_range: 'Диапазон мощности',
    product_gas_type: 'Тип газа',
    product_certifications: 'Сертификаты',
    product_key_features: 'Основные характеристики',
    product_tech_specs: 'Технические характеристики',
    product_why_isco: 'Почему ISCO',
    product_certs_warranty: 'Сертификаты и гарантия',
    product_view_details: 'Подробнее',
    product_request_quote: 'Запросить цену',
    product_nominal_heat_input: 'Номинальная тепловая мощность (кВт)',
    product_minimal_heat_input: 'Мин. тепловая мощность (кВт)',
    product_nominal_heat_output: 'Номинальная теплоотдача 80/60°C (кВт)',
    product_minimal_heat_output: 'Мин. теплоотдача 80/60°C (кВт)',
    product_hot_water_heat_input: 'Мощность ГВС (кВт)',
    product_dhw_flow_rate: 'Расход ГВС ΔT=30K (кг/мин)',
    product_max_heating_pressure: 'Макс. давление отопления',
    product_dhw_pressure: 'Давление ГВС',
    product_electrical_supply: 'Электропитание',
    product_electrical_power: 'Электрическая мощность (Вт)',
    product_protection_degree: 'Степень защиты',
    product_shock_protection: 'Класс защиты от поражения',
    product_flue_diameter: 'Диаметр дымохода (мм)',
    product_dimensions: 'Размеры Ш×В×Г (мм)',
    product_gas_inlet: 'Газовое подключение',
    product_heating_connection: 'Подключение отопления подача/обратка',
    product_dhw_connection: 'Подключение ГВС вход/выход',
    product_efficiency: 'КПД',
    product_heating_output: 'Теплоотдача Макс/Мин (кВт)',
    product_condensing_output: 'Конденсационная мощность Макс/Мин (кВт)',
    product_dhw_flow_25k: 'ГВС ΔT=25K (л/мин)',
    product_heating_temp: 'Температура отопления',
    product_dhw_temp: 'Температура ГВС',
    product_gas_consumption: 'Расход газа Макс/Мин (м³/ч)',
    product_max_pressure: 'Макс. давление (отопление / вода)',
    product_nox_class: 'Класс NOx',
    product_gas_pressure: 'Давление газа (мбар)',
    sp_trust_title: 'Опыт и доверие',
    sp_trust_1: '20 лет опыта производства и продаж газовых котлов, экспорт в более чем 30 стран и регионов',
    sp_trust_2: 'Продукция с сертификатом CE',
    sp_trust_3: '5-летняя полная гарантия на изделие',
    sp_trust_4: 'Бесплатный набор инструментов для монтажа и пуско-наладки для оптовых покупателей',
    sp_tech_title: 'Ассортимент и технологии',
    sp_tech_1: 'Доступны как обычные, так и высокоэффективные конденсационные котлы',
    sp_tech_2: 'Ключевые компоненты европейских брендов',
    sp_tech_3: 'Соответствует европейским стандартам энергоэффективности, КПД до 105%',
    sp_tech_4: 'Мощность 20–150 кВт для различных сценариев применения',
    sp_flex_title: 'Гибкость и кастомизация',
    sp_flex_1: 'Модели только для отопления и комби (отопление + ГВС)',
    sp_flex_2: 'Гибкая конфигурация ключевых компонентов с высокой адаптивностью к рынку',
    sp_flex_3: 'Принимаются заказы OEM и ODM, соответствие требованиям локализации',
    sp_flex_4: 'Поставка SKD (частично разобранных) по запросу клиента',
    sp_flex_5: 'Стандартный и компактный дизайн для различных монтажных пространств',
    sp_smart_title: 'Умные и расширяемые',
    sp_smart_1: 'Совместимость с воздушными тепловыми насосами и водяными баками',
    sp_smart_2: 'Опциональное WiFi-управление для дистанционного контроля и интеграции в умный дом',
    sp_smart_3: 'Более 10 актуальных дизайнов передних панелей на выбор',
  },

  es: {
    nav_home: 'Inicio',
    nav_about: 'Nosotros',
    nav_solar: 'Solar',
    nav_hvac: 'HVAC',
    nav_contact: 'Contacto',
    nav_products: 'Productos',

    hero_title: 'Su socio integral en soluciones energéticas',
    hero_subtitle: 'ISCO GmbH ofrece productos solares y HVAC de primera calidad para energía sostenible y confort óptimo en toda Europa.',
    hero_cta_solar: 'Explorar productos solares',
    hero_cta_contact: 'Contáctenos',

    about_title: 'Sobre ISCO GmbH',
    about_subtitle: 'Su socio de confianza para soluciones energéticas sostenibles',
    about_text_1: 'Con sede en Frankfurt am Main, ISCO GmbH es un proveedor líder de soluciones solares y HVAC en Europa. Combinamos la excelencia de la ingeniería alemana con alcance global.',
    about_text_2: 'Nuestro amplio portafolio de productos cubre toda la cadena de valor de las energías renovables y la tecnología de edificios.',
    about_stat_years: '10+',
    about_stat_years_label: 'Años de experiencia',
    about_stat_countries: '30+',
    about_stat_countries_label: 'Países atendidos',
    about_stat_products: '500+',
    about_stat_products_label: 'Productos',
    about_stat_clients: '1000+',
    about_stat_clients_label: 'Clientes satisfechos',

    solar_title: 'Soluciones de energía solar',
    solar_subtitle: 'Sistemas fotovoltaicos completos para aplicaciones residenciales y comerciales',
       solar_panels_title: 'Módulos solares',
    solar_panels_desc: 'Módulos monocristalinos TopCon y PERC de alta eficiencia en cuatro tipos: estándar, totalmente negro, flexible y plegable — de fabricantes líderes con hasta 25%+ de eficiencia.',
    solar_inverters_title: 'Inversores',
    solar_inverters_desc: 'Inversores aislados para sistemas autónomos e inversores híbridos que combinan energía solar, batería y red eléctrica.',
    solar_storage_title: 'BESS',
    solar_storage_desc: 'Estaciones de energía portátiles, almacenamiento residencial y soluciones de almacenamiento comercial e industrial (C&I) para suministro fiable y máxima optimización del autoconsumo.',
    solar_mounting_title: 'Sistemas de montaje FV',
    solar_mounting_desc: 'Sistemas de montaje metálicos y de material compuesto FRP. Los soportes compuestos, ligeros y de alta resistencia, están disponibles en varios colores y como kit completo para 4 paneles con todos los componentes de instalación — ideales para tejados residenciales pequeños y ampliables para instalaciones mayores.',
    solar_cables_title: 'Cables FV y conectores MC4',
    solar_cables_desc: 'Cables solares y conectores MC4 en diversas especificaciones para instalaciones fotovoltaicas seguras y conformes con la normativa.',
    solar_accessories_title: 'Productos solares',
    solar_accessories_desc: 'Electrodomésticos de corriente continua (12V/24V/48V): aires acondicionados, climatizadores para camiones, congeladores, refrigeradores, bombas de agua, ventiladores y televisores. La energía solar se almacena en baterías durante el día y se utiliza como fuente principal, con la red eléctrica como respaldo — perfecto para ubicaciones sin red y para reducir costes de electricidad.',
    learn_more: 'Más información',

    hvac_title: 'Soluciones HVAC',
    hvac_subtitle: 'Calefacción, ventilación y climatización moderna para cada necesidad',
    hvac_boiler_title: 'Calderas de gas',
    hvac_boiler_desc: 'Calderas convencionales y de condensación de alta eficiencia para modo combinado (ACS + calefacción) o solo calefacción. Disponibles con componentes premium (intercambiador SERMETA, válvula de gas SIT, bomba GRUNDFOS) o alternativas económicas. Todos los productos con certificación CE y control WiFi remoto opcional.',
    hvac_heatpump_title: 'Bombas de calor aerotérmicas',
    hvac_heatpump_desc: 'Bombas de calor aire-agua de alta eficiencia que extraen calor del aire ambiente y ofrecen un ahorro energético significativo frente a la calefacción eléctrica. La tecnología EVI garantiza un rendimiento fiable hasta −25°C.',
    hvac_ventilation_title: 'Ventilación con recuperación de calor (HRV)',
    hvac_ventilation_desc: 'Sistemas de ventilación que recuperan la energía térmica del aire de extracción durante el intercambio de aire fresco — recuperando energía de calefacción y refrigeración para una calidad de aire óptima con mínima pérdida energética en verano e invierno.',
    hvac_ac_title: 'Aire acondicionado',
    hvac_ac_desc: 'Sistemas con tecnología Inverter, VRV y VFV, adaptados a las necesidades reales. Soluciones ODM disponibles para proyectos personalizados.',
    hvac_boiler_combi: 'Caldera combinada',
    hvac_boiler_condensing: 'Caldera combinada de condensación',

    why_title: '¿Por qué ISCO GmbH?',
    why_subtitle: 'Lo que nos diferencia de la competencia',
    why_quality_title: 'Calidad premium',
    why_quality_desc: 'Solo productos certificados de fabricantes líderes con certificaciones internacionales.',
    why_service_title: 'Consultoría experta',
    why_service_desc: 'Nuestro equipo experimentado brinda asesoramiento personalizado.',
    why_price_title: 'Precios competitivos',
    why_price_desc: 'El acceso directo a fabricantes nos permite ofrecer condiciones atractivas.',
    why_delivery_title: 'Entrega rápida',
    why_delivery_desc: 'Logística eficiente para tiempos de entrega cortos en toda Europa.',

    contact_title: 'Contáctenos',
    contact_subtitle: 'Esperamos su consulta',
    contact_name: 'Su nombre',
    contact_email: 'Correo electrónico',
    contact_phone: 'Teléfono',
    contact_company: 'Empresa',
    contact_message: 'Su mensaje',
    contact_subject: 'Asunto',
    contact_send: 'Enviar mensaje',
    contact_sending: 'Enviando...',
    contact_success: '¡Gracias! Su mensaje ha sido enviado.',
    contact_address_title: 'Dirección',
    contact_email_title: 'Correo',
    contact_whatsapp_title: 'WhatsApp',
    contact_website_title: 'Sitio web',
    contact_click_to_email: 'Haga clic para enviar un correo',

    footer_description: 'ISCO GmbH — Su socio para soluciones solares y HVAC en Europa.',
    footer_quick_links: 'Enlaces rápidos',
    footer_business: 'Áreas de negocio',
    footer_contact_info: 'Información de contacto',
    footer_rights: '© 2026 ISCO GmbH. Todos los derechos reservados.',
    footer_privacy: 'Privacidad',
    footer_terms: 'Términos',
    footer_imprint: 'Aviso legal',

    cta_title: '¿Listo para la energía sostenible?',
    cta_subtitle: 'Contáctenos hoy para un presupuesto sin compromiso.',
    cta_button: 'Solicitar presupuesto',

    request_quote: 'Solicitar presupuesto',
    view_products: 'Ver productos',
    send_inquiry: 'Enviar consulta',

    product_not_found: 'Producto no encontrado',
    product_dhw_heating: 'ACS + Calefacción',
    product_combi: 'Combi',
    product_gas_natural: 'G20 (Gas Natural)',

    feat_combi_1: 'Doble función: Calefacción central + Agua caliente sanitaria',
    feat_combi_2: 'Rango de potencia: 18–45 kW — Residencial a comercial ligero',
    feat_combi_3: 'Tipo de gas: G20 (Gas Natural)',
    feat_combi_4: 'Certificado CE',
    feat_combi_5: 'Control Wi-Fi opcional',
    feat_combi_6: 'Compatible con bomba de calor',
    feat_combi_7: 'Más de 10 diseños de panel frontal',
    feat_combi_8: 'Garantía completa de 5 años',
    feat_cond_1: 'Doble función: Calefacción central + Agua caliente sanitaria',
    feat_cond_2: 'Rango de potencia: 24 / 30 / 36 kW — Múltiples escenarios',
    feat_cond_3: 'Intercambiador de calor SERMETA',
    feat_cond_4: 'Válvula proporcional de gas SIT',
    feat_cond_5: 'Bomba de circulación GRUNDFOS',
    feat_cond_6: 'Clase NOx 5 (<70 mg/kWh) — Cumple Directiva ErP',
    feat_cond_7: 'Control Wi-Fi opcional',
    feat_cond_8: 'Compatible con bomba de calor',

    product_back_to_hvac: 'Volver a HVAC',
    product_power_range: 'Rango de potencia',
    product_gas_type: 'Tipo de gas',
    product_certifications: 'Certificaciones',
    product_key_features: 'Características principales',
    product_tech_specs: 'Especificaciones técnicas',
    product_why_isco: 'Por qué ISCO',
    product_certs_warranty: 'Certificaciones y garantía',
    product_view_details: 'Ver detalles',
    product_request_quote: 'Solicitar presupuesto',
    product_nominal_heat_input: 'Potencia térmica nominal (kW)',
    product_minimal_heat_input: 'Potencia térmica mínima (kW)',
    product_nominal_heat_output: 'Potencia calorífica nominal 80/60°C (kW)',
    product_minimal_heat_output: 'Potencia calorífica mínima 80/60°C (kW)',
    product_hot_water_heat_input: 'Potencia ACS (kW)',
    product_dhw_flow_rate: 'Caudal ACS ΔT=30K (kg/min)',
    product_max_heating_pressure: 'Presión máx. calefacción',
    product_dhw_pressure: 'Presión ACS',
    product_electrical_supply: 'Alimentación eléctrica',
    product_electrical_power: 'Potencia eléctrica (W)',
    product_protection_degree: 'Grado de protección',
    product_shock_protection: 'Clase de protección eléctrica',
    product_flue_diameter: 'Diámetro de chimenea (mm)',
    product_dimensions: 'Dimensiones An×Al×Pr (mm)',
    product_gas_inlet: 'Conexión de gas',
    product_heating_connection: 'Conexión calefacción ida/retorno',
    product_dhw_connection: 'Conexión ACS entrada/salida',
    product_efficiency: 'Eficiencia',
    product_heating_output: 'Potencia calefacción Máx/Mín (kW)',
    product_condensing_output: 'Potencia condensación Máx/Mín (kW)',
    product_dhw_flow_25k: 'ACS ΔT=25K (L/min)',
    product_heating_temp: 'Temperatura calefacción',
    product_dhw_temp: 'Temperatura ACS',
    product_gas_consumption: 'Consumo gas Máx/Mín (m³/h)',
    product_max_pressure: 'Presión máx. (calefacción / agua)',
    product_nox_class: 'Clase NOx',
    product_gas_pressure: 'Presión de gas (mbar)',
    sp_trust_title: 'Experiencia y confianza',
    sp_trust_1: '20 años de experiencia en fabricación y venta de calderas de gas, exportación a más de 30 países y regiones',
    sp_trust_2: 'Productos con certificación CE',
    sp_trust_3: 'Garantía completa de 5 años',
    sp_trust_4: 'Kit gratuito de instalación y puesta en marcha para mayoristas',
    sp_tech_title: 'Gama de productos y tecnología',
    sp_tech_1: 'Calderas convencionales y de condensación de alta eficiencia disponibles',
    sp_tech_2: 'Componentes clave de marcas europeas',
    sp_tech_3: 'Cumple con los estándares europeos de eficiencia energética, hasta 105% de eficiencia',
    sp_tech_4: 'Rango de potencia 20–150 kW para diversos escenarios de aplicación',
    sp_flex_title: 'Flexibilidad y personalización',
    sp_flex_1: 'Modelos solo calefacción y combi (calefacción + ACS) disponibles',
    sp_flex_2: 'Configuración flexible de componentes clave con alta adaptabilidad al mercado',
    sp_flex_3: 'Se aceptan pedidos OEM y ODM, cumpliendo requisitos de localización',
    sp_flex_4: 'Entrega SKD (semi-desmontado) disponible según solicitud del cliente',
    sp_flex_5: 'Diseños estándar y compactos para diferentes espacios de instalación',
    sp_smart_title: 'Inteligente y ampliable',
    sp_smart_1: 'Compatible con bombas de calor aerotérmicas y depósitos de agua',
    sp_smart_2: 'Control WiFi opcional para operación remota e integración domótica',
    sp_smart_3: 'Más de 10 diseños de panel frontal disponibles',
  },

  fr: {
    nav_home: 'Accueil',
    nav_about: 'À propos',
    nav_solar: 'Solaire',
    nav_hvac: 'CVC',
    nav_contact: 'Contact',
    nav_products: 'Produits',

    hero_title: 'Votre partenaire complet en solutions énergétiques',
    hero_subtitle: 'ISCO GmbH fournit des produits solaires et CVC de qualité supérieure pour une énergie durable et un confort optimal à travers l\'Europe.',
    hero_cta_solar: 'Découvrir les produits solaires',
    hero_cta_contact: 'Nous contacter',

    about_title: 'À propos d\'ISCO GmbH',
    about_subtitle: 'Votre partenaire de confiance pour des solutions énergétiques durables',
    about_text_1: 'Basée à Francfort-sur-le-Main, ISCO GmbH est un fournisseur leader de solutions solaires et CVC en Europe. Nous combinons l\'excellence de l\'ingénierie allemande avec une portée mondiale.',
    about_text_2: 'Notre portefeuille complet de produits couvre l\'ensemble de la chaîne de valeur des énergies renouvelables et de la technologie du bâtiment.',
    about_stat_years: '10+',
    about_stat_years_label: 'Années d\'expérience',
    about_stat_countries: '30+',
    about_stat_countries_label: 'Pays desservis',
    about_stat_products: '500+',
    about_stat_products_label: 'Produits',
    about_stat_clients: '1000+',
    about_stat_clients_label: 'Clients satisfaits',

    solar_title: 'Solutions d\'énergie solaire',
    solar_subtitle: 'Systèmes photovoltaïques complets pour applications résidentielles et commerciales',
    solar_panels_title: 'Modules solaires',
    solar_panels_desc: 'Modules monocristallins TopCon et PERC haute efficacité en quatre types : standard, tout noir, flexible et pliable — de fabricants leaders avec jusqu\'\u00e0 25%+ de rendement.',
    solar_inverters_title: 'Onduleurs',
    solar_inverters_desc: 'Onduleurs autonomes pour systèmes isolés et onduleurs hybrides combinant énergie solaire, batterie et réseau électrique.',
    solar_storage_title: 'BESS',
    solar_storage_desc: 'Stations d\'\u00e9nergie portables, stockage résidentiel et solutions de stockage commercial et industriel (C&I) pour une alimentation fiable et une optimisation maximale de l\'autoconsommation.',
    solar_mounting_title: 'Systèmes de montage PV',
    solar_mounting_desc: 'Systèmes de montage métalliques et en matériau composite FRP. Les supports composites légers et haute résistance sont disponibles en plusieurs couleurs et en kit complet pour 4 panneaux avec tous les composants d\'installation — idéaux pour les petites toitures résidentielles et extensibles pour les installations plus grandes.',
    solar_cables_title: 'Câbles PV et connecteurs MC4',
    solar_cables_desc: 'Câbles solaires et connecteurs MC4 de différentes spécifications pour des installations photovoltaïques sûres et conformes aux normes.',
    solar_accessories_title: 'Produits solaires',
    solar_accessories_desc: 'Appareils à courant continu (12V/24V/48V) : climatiseurs, climatiseurs pour camions, congélateurs, réfrigérateurs, pompes à eau, ventilateurs et téléviseurs. L\'\u00e9nergie solaire est stockée dans des batteries pendant la journée et utilisée en priorité ; complétée par le réseau si nécessaire — idéal pour les sites isolés et la réduction des coûts d\'\u00ed\'électricité.',
    learn_more: 'En savoir plus',

    hvac_title: 'Solutions CVC',
    hvac_subtitle: 'Chauffage, ventilation et climatisation modernes pour chaque besoin',
    hvac_boiler_title: 'Chaudières à gaz',
    hvac_boiler_desc: 'Chaudières conventionnelles et à condensation haute efficacité pour mode combiné (ECS + chauffage) ou chauffage seul. Disponibles avec composants premium (échangeur SERMETA, vanne gaz SIT, pompe GRUNDFOS) ou alternatives économiques. Tous les produits certifiés CE avec commande WiFi à distance en option.',
    hvac_heatpump_title: 'Pompes à chaleur aérothermiques',
    hvac_heatpump_desc: 'Pompes à chaleur air-eau haute efficacité qui extraient la chaleur de l\'air ambiant et offrent des économies d\'\u00e9nergie significatives par rapport au chauffage électrique. La technologie EVI garantit un fonctionnement fiable jusqu\'\u00e0 −25°C.',
    hvac_ventilation_title: 'Ventilation avec récupération de chaleur (HRV)',
    hvac_ventilation_desc: 'Systèmes de ventilation qui récupèrent l\'\u00e9nergie thermique de l\'air extrait lors de l\'\u00e9change d\'air frais — récupérant l\'\u00e9nergie de chauffage et de refroidissement pour une qualité d\'air optimale avec un minimum de pertes énergétiques en été comme en hiver.',
    hvac_ac_title: 'Climatisation',
    hvac_ac_desc: 'Systèmes équipés de technologies Inverter, VRV et VFV, adaptés aux besoins réels. Solutions ODM disponibles pour des projets personnalisés.',
    hvac_boiler_combi: 'Chaudière combinée',
    hvac_boiler_condensing: 'Chaudière combinée à condensation',

    why_title: 'Pourquoi ISCO GmbH ?',
    why_subtitle: 'Ce qui nous distingue de la concurrence',
    why_quality_title: 'Qualité premium',
    why_quality_desc: 'Uniquement des produits certifiés de fabricants leaders avec des certifications internationales.',
    why_service_title: 'Conseil expert',
    why_service_desc: 'Notre équipe expérimentée fournit des conseils personnalisés.',
    why_price_title: 'Prix compétitifs',
    why_price_desc: 'L\'accès direct aux fabricants nous permet d\'offrir des conditions attractives.',
    why_delivery_title: 'Livraison rapide',
    why_delivery_desc: 'Logistique efficace pour des délais de livraison courts dans toute l\'Europe.',

    contact_title: 'Contactez-nous',
    contact_subtitle: 'Nous attendons votre demande avec impatience',
    contact_name: 'Votre nom',
    contact_email: 'Adresse e-mail',
    contact_phone: 'Téléphone',
    contact_company: 'Entreprise',
    contact_message: 'Votre message',
    contact_subject: 'Objet',
    contact_send: 'Envoyer le message',
    contact_sending: 'Envoi en cours...',
    contact_success: 'Merci ! Votre message a été envoyé.',
    contact_address_title: 'Adresse',
    contact_email_title: 'E-mail',
    contact_whatsapp_title: 'WhatsApp',
    contact_website_title: 'Site web',
    contact_click_to_email: 'Cliquez pour envoyer un e-mail',

    footer_description: 'ISCO GmbH — Votre partenaire pour les solutions solaires et CVC en Europe.',
    footer_quick_links: 'Liens rapides',
    footer_business: 'Domaines d\'activité',
    footer_contact_info: 'Coordonnées',
    footer_rights: '© 2026 ISCO GmbH. Tous droits réservés.',
    footer_privacy: 'Confidentialité',
    footer_terms: 'Conditions',
    footer_imprint: 'Mentions légales',

    cta_title: 'Prêt pour l\'énergie durable ?',
    cta_subtitle: 'Contactez-nous aujourd\'hui pour un devis gratuit et sans engagement.',
    cta_button: 'Demander un devis',

    request_quote: 'Demander un devis',
    view_products: 'Voir les produits',
    send_inquiry: 'Envoyer une demande',

    product_not_found: 'Produit non trouvé',
    product_dhw_heating: 'ECS + Chauffage',
    product_combi: 'Combi',
    product_gas_natural: 'G20 (Gaz Naturel)',

    feat_combi_1: 'Double fonction : Chauffage central + Eau chaude sanitaire',
    feat_combi_2: 'Plage de puissance : 18–45 kW — Résidentiel à commercial léger',
    feat_combi_3: 'Type de gaz : G20 (Gaz Naturel)',
    feat_combi_4: 'Certifié CE',
    feat_combi_5: 'Contrôle Wi-Fi en option',
    feat_combi_6: 'Compatible pompe à chaleur',
    feat_combi_7: 'Plus de 10 designs de panneau frontal',
    feat_combi_8: 'Garantie complète de 5 ans',
    feat_cond_1: 'Double fonction : Chauffage central + Eau chaude sanitaire',
    feat_cond_2: 'Plage de puissance : 24 / 30 / 36 kW — Scénarios multiples',
    feat_cond_3: 'Échangeur de chaleur SERMETA',
    feat_cond_4: 'Vanne gaz proportionnelle SIT',
    feat_cond_5: 'Pompe de circulation GRUNDFOS',
    feat_cond_6: 'Classe NOx 5 (<70 mg/kWh) — Conforme à la directive ErP',
    feat_cond_7: 'Contrôle Wi-Fi en option',
    feat_cond_8: 'Compatible pompe à chaleur',

    product_back_to_hvac: 'Retour au CVC',
    product_power_range: 'Plage de puissance',
    product_gas_type: 'Type de gaz',
    product_certifications: 'Certifications',
    product_key_features: 'Caractéristiques clés',
    product_tech_specs: 'Spécifications techniques',
    product_why_isco: 'Pourquoi ISCO',
    product_certs_warranty: 'Certifications et garantie',
    product_view_details: 'Voir les détails',
    product_request_quote: 'Demander un devis',
    product_nominal_heat_input: 'Puissance thermique nominale (kW)',
    product_minimal_heat_input: 'Puissance thermique minimale (kW)',
    product_nominal_heat_output: 'Puissance calorifique nominale 80/60°C (kW)',
    product_minimal_heat_output: 'Puissance calorifique minimale 80/60°C (kW)',
    product_hot_water_heat_input: 'Puissance ECS (kW)',
    product_dhw_flow_rate: 'Débit ECS ΔT=30K (kg/min)',
    product_max_heating_pressure: 'Pression max. chauffage',
    product_dhw_pressure: 'Pression ECS',
    product_electrical_supply: 'Alimentation électrique',
    product_electrical_power: 'Puissance électrique (W)',
    product_protection_degree: 'Degré de protection',
    product_shock_protection: 'Classe de protection électrique',
    product_flue_diameter: 'Diamètre conduit (mm)',
    product_dimensions: 'Dimensions L×H×P (mm)',
    product_gas_inlet: 'Raccordement gaz',
    product_heating_connection: 'Raccordement chauffage aller/retour',
    product_dhw_connection: 'Raccordement ECS entrée/sortie',
    product_efficiency: 'Rendement',
    product_heating_output: 'Puissance chauffage Max/Min (kW)',
    product_condensing_output: 'Puissance condensation Max/Min (kW)',
    product_dhw_flow_25k: 'ECS ΔT=25K (L/min)',
    product_heating_temp: 'Température chauffage',
    product_dhw_temp: 'Température ECS',
    product_gas_consumption: 'Consommation gaz Max/Min (m³/h)',
    product_max_pressure: 'Pression max. (chauffage / eau)',
    product_nox_class: 'Classe NOx',
    product_gas_pressure: 'Pression de gaz (mbar)',
    sp_trust_title: 'Expérience et confiance',
    sp_trust_1: '20 ans d\'expérience dans la fabrication et la vente de chaudières à gaz, exportées dans plus de 30 pays et régions',
    sp_trust_2: 'Produits certifiés CE',
    sp_trust_3: 'Garantie complète de 5 ans',
    sp_trust_4: 'Kit d\'installation et de mise en service gratuit pour les grossistes',
    sp_tech_title: 'Gamme de produits et technologie',
    sp_tech_1: 'Chaudières conventionnelles et à condensation haute efficacité disponibles',
    sp_tech_2: 'Composants clés de marques européennes',
    sp_tech_3: 'Conforme aux normes européennes d\'efficacité énergétique, rendement jusqu\'\u00e0 105%',
    sp_tech_4: 'Plage de puissance 20–150 kW pour divers scénarios d\'application',
    sp_flex_title: 'Flexibilité et personnalisation',
    sp_flex_1: 'Modèles chauffage seul et combi (chauffage + ECS) disponibles',
    sp_flex_2: 'Configuration flexible des composants clés avec forte adaptabilité au marché',
    sp_flex_3: 'OEM et ODM acceptés, conformes aux exigences de localisation',
    sp_flex_4: 'Livraison SKD (semi-démonté) disponible sur demande du client',
    sp_flex_5: 'Designs standard et compacts pour différents espaces d\'installation',
    sp_smart_title: 'Intelligent et extensible',
    sp_smart_1: 'Compatible avec les pompes à chaleur aérothermiques et les ballons d\'eau',
    sp_smart_2: 'Contrôle WiFi optionnel pour la commande à distance et l\'intégration domotique',
    sp_smart_3: 'Plus de 10 designs de panneau frontal disponibles',
  },

  it: {
    nav_home: 'Home',
    nav_about: 'Chi siamo',
    nav_solar: 'Solare',
    nav_hvac: 'HVAC',
    nav_contact: 'Contatti',
    nav_products: 'Prodotti',

    hero_title: 'Il vostro partner completo per soluzioni energetiche',
    hero_subtitle: 'ISCO GmbH fornisce prodotti solari e HVAC di alta qualità per energia sostenibile e comfort ottimale in tutta Europa.',
    hero_cta_solar: 'Scopri i prodotti solari',
    hero_cta_contact: 'Contattaci',

    about_title: 'Chi è ISCO GmbH',
    about_subtitle: 'Il vostro partner di fiducia per soluzioni energetiche sostenibili',
    about_text_1: 'Con sede a Francoforte sul Meno, ISCO GmbH è un fornitore leader di soluzioni solari e HVAC in Europa. Combiniamo l\'eccellenza ingegneristica tedesca con una portata globale.',
    about_text_2: 'Il nostro ampio portafoglio prodotti copre l\'intera catena del valore delle energie rinnovabili e della tecnologia edilizia.',
    about_stat_years: '10+',
    about_stat_years_label: 'Anni di esperienza',
    about_stat_countries: '30+',
    about_stat_countries_label: 'Paesi serviti',
    about_stat_products: '500+',
    about_stat_products_label: 'Prodotti',
    about_stat_clients: '1000+',
    about_stat_clients_label: 'Clienti soddisfatti',

    solar_title: 'Soluzioni di energia solare',
    solar_subtitle: 'Sistemi fotovoltaici completi per applicazioni residenziali e commerciali',
    solar_panels_title: 'Moduli fotovoltaici',
    solar_panels_desc: 'Moduli monocristallini TopCon e PERC ad alta efficienza in quattro tipi: standard, tutto nero, flessibile e pieghevole — dai principali produttori con efficienza fino al 25%+.',
    solar_inverters_title: 'Inverter',
    solar_inverters_desc: 'Inverter off-grid per sistemi autonomi e inverter ibridi che combinano energia solare, batteria e rete elettrica.',
    solar_storage_title: 'BESS',
    solar_storage_desc: 'Stazioni di energia portatili, accumulo residenziale e soluzioni di accumulo commerciale e industriale (C&I) per un\'alimentazione affidabile e la massima ottimizzazione dell\'autoconsumo.',
    solar_mounting_title: 'Sistemi di montaggio FV',
    solar_mounting_desc: 'Sistemi di montaggio metallici e in materiale composito FRP. I supporti compositi leggeri e ad alta resistenza sono disponibili in più colori e come kit completo per 4 pannelli con tutti i componenti di installazione — ideali per piccoli tetti residenziali ed espandibili per impianti più grandi.',
    solar_cables_title: 'Cavi FV e connettori MC4',
    solar_cables_desc: 'Cavi solari e connettori MC4 di varie specifiche per installazioni fotovoltaiche sicure e conformi alle normative.',
    solar_accessories_title: 'Prodotti solari',
    solar_accessories_desc: 'Apparecchi a corrente continua (12V/24V/48V): condizionatori, climatizzatori per camion, congelatori, frigoriferi, pompe d\'acqua, ventilatori e televisori. L\'energia solare viene immagazzinata nelle batterie durante il giorno e utilizzata come fonte primaria, con la rete elettrica come backup — perfetto per siti isolati e per ridurre i costi dell\'elettricità.',
    learn_more: 'Scopri di più',

    hvac_title: 'Soluzioni HVAC',
    hvac_subtitle: 'Riscaldamento, ventilazione e climatizzazione moderni per ogni esigenza',
    hvac_boiler_title: 'Caldaie a gas',
    hvac_boiler_desc: 'Caldaie convenzionali e a condensazione ad alta efficienza per modalità combinata (ACS + riscaldamento) o solo riscaldamento. Disponibili con componenti premium (scambiatore SERMETA, valvola gas SIT, pompa GRUNDFOS) o alternative economiche. Tutti i prodotti certificati CE con controllo WiFi remoto opzionale.',
    hvac_heatpump_title: 'Pompe di calore aria',
    hvac_heatpump_desc: 'Pompe di calore aria-acqua ad alta efficienza che estraggono calore dall\'aria ambiente e offrono risparmi energetici significativi rispetto al riscaldamento elettrico. La tecnologia EVI garantisce un funzionamento affidabile fino a −25°C.',
    hvac_ventilation_title: 'Ventilazione con recupero di calore (HRV)',
    hvac_ventilation_desc: 'Sistemi di ventilazione che recuperano l\'energia termica dall\'aria esausta durante lo scambio d\'aria fresca — recuperando energia di riscaldamento e raffrescamento per una qualità dell\'aria ottimale con minime perdite energetiche in estate e in inverno.',
    hvac_ac_title: 'Climatizzazione',
    hvac_ac_desc: 'Sistemi con tecnologie Inverter, VRV e VFV, adattati alle esigenze reali. Soluzioni ODM disponibili per progetti personalizzati.',
    hvac_boiler_combi: 'Caldaia combinata',
    hvac_boiler_condensing: 'Caldaia combinata a condensazione',

    why_title: 'Perché ISCO GmbH?',
    why_subtitle: 'Cosa ci distingue dalla concorrenza',
    why_quality_title: 'Qualità premium',
    why_quality_desc: 'Solo prodotti certificati dai principali produttori con certificazioni internazionali.',
    why_service_title: 'Consulenza esperta',
    why_service_desc: 'Il nostro team esperto fornisce consulenza personalizzata.',
    why_price_title: 'Prezzi competitivi',
    why_price_desc: 'L\'accesso diretto ai produttori ci permette di offrire condizioni vantaggiose.',
    why_delivery_title: 'Consegna rapida',
    why_delivery_desc: 'Logistica efficiente per tempi di consegna brevi in tutta Europa.',

    contact_title: 'Contattaci',
    contact_subtitle: 'Attendiamo la vostra richiesta',
    contact_name: 'Il vostro nome',
    contact_email: 'Indirizzo e-mail',
    contact_phone: 'Telefono',
    contact_company: 'Azienda',
    contact_message: 'Il vostro messaggio',
    contact_subject: 'Oggetto',
    contact_send: 'Invia messaggio',
    contact_sending: 'Invio in corso...',
    contact_success: 'Grazie! Il vostro messaggio è stato inviato.',
    contact_address_title: 'Indirizzo',
    contact_email_title: 'E-mail',
    contact_whatsapp_title: 'WhatsApp',
    contact_website_title: 'Sito web',
    contact_click_to_email: 'Clicca per inviare un\'e-mail',

    footer_description: 'ISCO GmbH — Il vostro partner per soluzioni solari e HVAC in Europa.',
    footer_quick_links: 'Link rapidi',
    footer_business: 'Aree di business',
    footer_contact_info: 'Informazioni di contatto',
    footer_rights: '© 2026 ISCO GmbH. Tutti i diritti riservati.',
    footer_privacy: 'Privacy',
    footer_terms: 'Termini',
    footer_imprint: 'Note legali',

    cta_title: 'Pronti per l\'energia sostenibile?',
    cta_subtitle: 'Contattateci oggi per un preventivo gratuito e senza impegno.',
    cta_button: 'Richiedi preventivo',

    request_quote: 'Richiedi preventivo',
    view_products: 'Vedi prodotti',
    send_inquiry: 'Invia richiesta',

    product_not_found: 'Prodotto non trovato',
    product_dhw_heating: 'ACS + Riscaldamento',
    product_combi: 'Combi',
    product_gas_natural: 'G20 (Gas Naturale)',

    feat_combi_1: 'Doppia funzione: Riscaldamento centralizzato + Acqua calda sanitaria',
    feat_combi_2: 'Gamma di potenza: 18–45 kW — Residenziale a commerciale leggero',
    feat_combi_3: 'Tipo di gas: G20 (Gas Naturale)',
    feat_combi_4: 'Certificato CE',
    feat_combi_5: 'Controllo Wi-Fi opzionale',
    feat_combi_6: 'Compatibile con pompa di calore',
    feat_combi_7: 'Oltre 10 design di pannello frontale',
    feat_combi_8: 'Garanzia completa di 5 anni',
    feat_cond_1: 'Doppia funzione: Riscaldamento centralizzato + Acqua calda sanitaria',
    feat_cond_2: 'Gamma di potenza: 24 / 30 / 36 kW — Scenari multipli',
    feat_cond_3: 'Scambiatore di calore SERMETA',
    feat_cond_4: 'Valvola gas proporzionale SIT',
    feat_cond_5: 'Pompa di circolazione GRUNDFOS',
    feat_cond_6: 'Classe NOx 5 (<70 mg/kWh) — Conforme alla direttiva ErP',
    feat_cond_7: 'Controllo Wi-Fi opzionale',
    feat_cond_8: 'Compatibile con pompa di calore',

    product_back_to_hvac: 'Torna a HVAC',
    product_power_range: 'Gamma di potenza',
    product_gas_type: 'Tipo di gas',
    product_certifications: 'Certificazioni',
    product_key_features: 'Caratteristiche principali',
    product_tech_specs: 'Specifiche tecniche',
    product_why_isco: 'Perché ISCO',
    product_certs_warranty: 'Certificazioni e garanzia',
    product_view_details: 'Vedi dettagli',
    product_request_quote: 'Richiedi preventivo',
    product_nominal_heat_input: 'Potenza termica nominale (kW)',
    product_minimal_heat_input: 'Potenza termica minima (kW)',
    product_nominal_heat_output: 'Potenza calorifica nominale 80/60°C (kW)',
    product_minimal_heat_output: 'Potenza calorifica minima 80/60°C (kW)',
    product_hot_water_heat_input: 'Potenza ACS (kW)',
    product_dhw_flow_rate: 'Portata ACS ΔT=30K (kg/min)',
    product_max_heating_pressure: 'Pressione max. riscaldamento',
    product_dhw_pressure: 'Pressione ACS',
    product_electrical_supply: 'Alimentazione elettrica',
    product_electrical_power: 'Potenza elettrica (W)',
    product_protection_degree: 'Grado di protezione',
    product_shock_protection: 'Classe di protezione elettrica',
    product_flue_diameter: 'Diametro canna fumaria (mm)',
    product_dimensions: 'Dimensioni L×A×P (mm)',
    product_gas_inlet: 'Attacco gas',
    product_heating_connection: 'Attacco riscaldamento mandata/ritorno',
    product_dhw_connection: 'Attacco ACS ingresso/uscita',
    product_efficiency: 'Rendimento',
    product_heating_output: 'Potenza riscaldamento Max/Min (kW)',
    product_condensing_output: 'Potenza condensazione Max/Min (kW)',
    product_dhw_flow_25k: 'ACS ΔT=25K (L/min)',
    product_heating_temp: 'Temperatura riscaldamento',
    product_dhw_temp: 'Temperatura ACS',
    product_gas_consumption: 'Consumo gas Max/Min (m³/h)',
    product_max_pressure: 'Pressione max. (riscaldamento / acqua)',
    product_nox_class: 'Classe NOx',
    product_gas_pressure: 'Pressione del gas (mbar)',
    sp_trust_title: 'Esperienza e fiducia',
    sp_trust_1: '20 anni di esperienza nella produzione e vendita di caldaie a gas, esportate in oltre 30 paesi e regioni',
    sp_trust_2: 'Prodotti certificati CE',
    sp_trust_3: 'Garanzia completa di 5 anni',
    sp_trust_4: 'Kit gratuito di installazione e messa in servizio per grossisti',
    sp_tech_title: 'Gamma prodotti e tecnologia',
    sp_tech_1: 'Caldaie convenzionali e a condensazione ad alta efficienza disponibili',
    sp_tech_2: 'Componenti chiave di marchi europei',
    sp_tech_3: 'Conforme agli standard europei di efficienza energetica, rendimento fino al 105%',
    sp_tech_4: 'Gamma di potenza 20–150 kW per diversi scenari applicativi',
    sp_flex_title: 'Flessibilità e personalizzazione',
    sp_flex_1: 'Modelli solo riscaldamento e combi (riscaldamento + ACS) disponibili',
    sp_flex_2: 'Configurazione flessibile dei componenti chiave con elevata adattabilità al mercato',
    sp_flex_3: 'OEM e ODM accettati, conformi ai requisiti di localizzazione',
    sp_flex_4: 'Consegna SKD (semi-smontato) disponibile su richiesta del cliente',
    sp_flex_5: 'Design standard e compatti per diversi spazi di installazione',
    sp_smart_title: 'Intelligente ed espandibile',
    sp_smart_1: 'Compatibile con pompe di calore aerotermiche e serbatoi d\'acqua',
    sp_smart_2: 'Controllo WiFi opzionale per operazione remota e integrazione domotica',
    sp_smart_3: 'Oltre 10 design di pannello frontale disponibili',
  },
};

export function getTranslations(lang: Language): TranslationKeys {
  // Per-key fallback so untranslated strings show their English source rather
  // than an empty gap. English itself passes through unchanged.
  return { ...translations.en, ...translations[lang] } as TranslationKeys;
}

export function detectBrowserLanguage(): Language {
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  const supported: Language[] = ['de', 'en', 'ru', 'es', 'fr', 'it'];
  if (supported.includes(langCode as Language)) {
    return langCode as Language;
  }
  return 'en';
}

export function getSavedLanguage(): Language | null {
  try {
    const saved = localStorage.getItem('isco-lang');
    if (saved && ['de', 'en', 'ru', 'es', 'fr', 'it'].includes(saved)) {
      return saved as Language;
    }
  } catch {}
  return null;
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem('isco-lang', lang);
  } catch {}
}
