/**
 * Solar module product detail page — /products/solar-modules/:slug
 *
 * Model naming follows the brief: the model is identified by its power rating
 * alone (450W, 500W, 630W, 720W). The part number is shown beside it because
 * buyers order by it.
 *
 * All figures come from the ISCO datasheets in src/data/solarProducts.ts.
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import {
  ArrowLeft,
  Award,
  Boxes,
  Check,
  Layers,
  Package,
  Ruler,
  Shield,
  Sun,
  Thermometer,
  Weight,
  Zap,
} from 'lucide-react';
import {
  SOLAR_MODULES,
  COMMON_SPECS,
  findSolarModule,
} from '@/data/solarProducts';

export default function SolarModuleDetail() {
  const { t } = useLanguage();
  const [, params] = useRoute('/products/solar-modules/:slug');
  const slug = params?.slug ?? '';
  const product = findSolarModule(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t.product_not_found}
          </h1>
          <Link
            href="/products/solar-modules"
            className="text-forest hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> {t.prod_back_to_category}
          </Link>
        </div>
      </div>
    );
  }

  const title = product.variant
    ? `${product.model} ${product.variant}`
    : product.model;

  const keyFacts = [
    { icon: Zap, label: t.sm_power_range, value: product.powerRange },
    { icon: Award, label: t.sm_efficiency, value: product.peakEfficiency },
    { icon: Layers, label: t.sm_cell_type, value: 'TOPCon' },
    { icon: Ruler, label: t.sm_dimensions, value: product.dimensions },
    { icon: Weight, label: t.sm_weight, value: product.weight },
    { icon: Boxes, label: t.sm_loading, value: product.loadingQuantity },
  ];

  const features = [
    { title: t.sm_f_power_t, desc: t.sm_f_power_d },
    { title: t.sm_f_reliability_t, desc: t.sm_f_reliability_d },
    { title: t.sm_f_lowlight_t, desc: t.sm_f_lowlight_d },
    { title: t.sm_f_degradation_t, desc: t.sm_f_degradation_d },
    { title: t.sm_f_tempco_t, desc: t.sm_f_tempco_d },
    { title: t.sm_f_antilid_t, desc: t.sm_f_antilid_d },
  ];

  const mechanical: [string, string][] = [
    [t.sm_technology, `${COMMON_SPECS.technology} · ${COMMON_SPECS.cellTechnology}`],
    [t.sm_cell_type, product.cellType],
    [t.sm_cell_config, product.cellConfiguration],
    [t.sm_dimensions, product.dimensions],
    [t.sm_weight, product.weight],
    [t.sm_front_glass, product.frontGlass],
    [t.sm_rear_glass, product.rearGlass],
    [t.sm_frame, product.frame],
    [t.sm_junction_box, product.junctionBox],
    [t.sm_cable, product.cable],
    [t.sm_operating_temp, COMMON_SPECS.operatingTemperature],
    [t.sm_max_system_voltage, COMMON_SPECS.maximumSystemVoltage],
    [t.sm_nmot, COMMON_SPECS.nmot],
  ];

  const tempCoefficients: [string, string][] = [
    [t.sm_tempco_pm, COMMON_SPECS.temperatureCoefficientPm],
    [t.sm_tempco_voc, COMMON_SPECS.temperatureCoefficientVoc],
    [t.sm_tempco_isc, COMMON_SPECS.temperatureCoefficientIsc],
  ];

  const packaging: [string, string][] = [
    [t.sm_container, product.container],
    [t.sm_modules_per_pallet, product.modulesPerPallet],
    [t.sm_loading_quantity, product.loadingQuantity],
  ];

  const otherModels = SOLAR_MODULES.filter((m) => m.slug !== product.slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container py-3 flex items-center justify-between">
          <Link
            href="/products/solar-modules"
            className="text-forest hover:text-forest/80 inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.prod_back_to_category}
          </Link>
          <Link
            href="/#contact"
            className="bg-forest text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-forest/90 transition-colors"
          >
            {t.product_request_quote}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 max-w-md w-full">
                <img
                  src={product.image}
                  alt={`ISCO ${title} TOPCon bifacial solar module`}
                  className="w-full h-[300px] lg:h-[400px] object-contain"
                />
                {product.variant && (
                  <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border bg-gray-900 text-white border-gray-900">
                    {product.variant}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 text-forest text-sm font-medium mb-4">
                <Sun className="w-4 h-4 text-gold" />
                {t.solar_panels_title}
              </span>

              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-3">
                {product.model}
                {product.variant && (
                  <span className="block text-2xl sm:text-3xl text-muted-foreground font-semibold mt-1">
                    {product.variant}
                  </span>
                )}
              </h1>

              <p className="text-muted-foreground mb-1">
                {COMMON_SPECS.technology} · {t.sm_cell_type}: {product.cellType}
              </p>
              <p className="text-sm text-muted-foreground mb-8 font-mono">
                {t.sm_part_number}: {product.partNumber}
              </p>

              {/* Key facts */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {keyFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <fact.icon className="w-4 h-4 text-forest" />
                      <span className="text-xs text-muted-foreground">
                        {fact.label}
                      </span>
                    </div>
                    <span className="font-heading font-bold text-base text-foreground">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground text-center mb-12">
            {t.sm_features_title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical specifications */}
      <section className="py-16 lg:py-20 bg-sage/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
              {t.sm_specs_title}
            </h2>
            <p className="text-muted-foreground">{t.sm_specs_subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <SpecTable title={t.sm_general} rows={mechanical} />
            <div className="space-y-8">
              <SpecTable
                title={t.sm_temp_coefficients}
                rows={tempCoefficients}
                icon={Thermometer}
              />
              <SpecTable
                title={t.sm_packaging_title}
                rows={packaging}
                icon={Package}
              />
            </div>
          </div>

          {/* STC table */}
          <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-heading font-semibold text-lg text-foreground">
                {t.sm_stc_title}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground whitespace-nowrap" />
                    {product.stc.map((s) => (
                      <th
                        key={s.pmax}
                        className="text-right px-4 py-3 font-heading font-bold text-foreground whitespace-nowrap"
                      >
                        {s.pmax} W
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      [t.sm_pmax, 'pmax'],
                      [t.sm_voc, 'voc'],
                      [t.sm_isc, 'isc'],
                      [t.sm_vmp, 'vmp'],
                      [t.sm_imp, 'imp'],
                      [t.sm_eff, 'eff'],
                    ] as const
                  ).map(([label, key]) => (
                    <tr key={key} className="border-t border-gray-100">
                      <td className="px-6 py-3 text-muted-foreground whitespace-nowrap">
                        {label}
                      </td>
                      {product.stc.map((s) => (
                        <td
                          key={s.pmax}
                          className="px-4 py-3 text-right text-foreground tabular-nums"
                        >
                          {s[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 py-4 text-xs text-muted-foreground border-t border-gray-100">
              {t.sm_stc_note}
            </p>
          </div>

          {/* Warranty & certification */}
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <Shield className="w-5 h-5 text-forest" />
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  {t.sm_warranty_title}
                </h3>
              </div>
              <dl className="space-y-3 text-sm">
                <Row label={t.sm_product_warranty} value={COMMON_SPECS.productWarranty} />
                <Row label={t.sm_power_warranty} value={COMMON_SPECS.powerWarranty} />
                <Row label={t.sm_degradation} value={COMMON_SPECS.degradation} />
              </dl>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <Award className="w-5 h-5 text-forest" />
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  {t.sm_certifications}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {COMMON_SPECS.certifications.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-lg bg-sage text-forest text-xs font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other models */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground text-center mb-10">
            {t.prod_other_models}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {otherModels.map((m) => (
              <Link
                key={m.slug}
                href={`/products/solar-modules/${m.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-forest/20 transition-all text-center block cursor-pointer"
              >
                <img
                  src={m.image}
                  alt={`ISCO ${m.model} solar module`}
                  className="h-32 w-auto mx-auto object-contain mb-4"
                  loading="lazy"
                />
                <span className="font-heading font-bold text-xl text-foreground block">
                  {m.model}
                </span>
                {m.variant && (
                  <span className="text-xs text-muted-foreground">{m.variant}</span>
                )}
                <span className="block text-sm text-muted-foreground mt-1">
                  {m.powerRange}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest">
        <div className="container text-center">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
            {t.cta_title}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">{t.cta_subtitle}</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-white text-forest px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg"
          >
            {t.product_request_quote}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ── Small presentational helpers ─────────────────────────────── */

function SpecTable({
  title,
  rows,
  icon: Icon,
}: {
  title: string;
  rows: [string, string][];
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-forest" />}
        <h3 className="font-heading font-semibold text-lg text-foreground">
          {title}
        </h3>
      </div>
      <dl className="divide-y divide-gray-100">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="px-6 py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
          >
            <dt className="text-sm text-muted-foreground sm:w-56 shrink-0">{label}</dt>
            <dd className="text-sm text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
      <dt className="text-muted-foreground sm:w-44 shrink-0">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
