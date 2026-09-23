/**
 * Boiler Product Detail Page
 * Shows product image, key features, technical specs table, selling points, and CTA
 * Supports both Combi Boiler and Condensing Combi Boiler types
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ArrowLeft, Check, Shield, Cpu, Settings, Wifi,
  Flame, Droplets, Zap, Award
} from 'lucide-react';
import {
  getBoilerBySlug,
  SELLING_POINT_CATEGORIES,
  type CombiVariant,
  type CondensingVariant,
} from '@/data/boilerProducts';

const SP_ICONS = {
  shield: Shield,
  cpu: Cpu,
  settings: Settings,
  wifi: Wifi,
} as const;

export default function BoilerDetail() {
  const { t } = useLanguage();
  const [, params] = useRoute('/products/boiler/:slug');
  const slug = params?.slug ?? '';
  const product = getBoilerBySlug(slug);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t.product_not_found}</h1>
          <Link href="/#hvac" className="text-forest hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> {t.product_back_to_hvac}
          </Link>
        </div>
      </div>
    );
  }

  const isCombi = product.type === 'combi';
  const typeLabel = isCombi ? t.hvac_boiler_combi : t.hvac_boiler_condensing;
  const typeBadgeColor = isCombi ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';

  const combiVariant: CombiVariant | undefined = isCombi ? product.combiVariants?.[selectedVariant] : undefined;
  const condensingVariant: CondensingVariant | undefined = !isCombi ? product.condensingVariants?.[selectedVariant] : undefined;
  const variants = isCombi ? product.combiVariants ?? [] : product.condensingVariants ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container py-3 flex items-center justify-between">
          <Link href="/#hvac" className="text-forest hover:text-forest/80 inline-flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t.product_back_to_hvac}
          </Link>
          <Link href="/#contact" className="bg-forest text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-forest/90 transition-colors">
            {t.product_request_quote}
          </Link>
        </div>
      </div>

      {/* Hero section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Product image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 max-w-md w-full">
                <img
                  src={product.image}
                  alt={`ISCO ${product.name} - ${typeLabel}`}
                  className="w-full h-[300px] lg:h-[400px] object-contain"
                />
                <span className={`absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${typeBadgeColor}`}>
                  {typeLabel}
                </span>
              </div>
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">{typeLabel}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-forest" />
                    <span className="text-xs text-muted-foreground">{t.product_power_range}</span>
                  </div>
                  <span className="font-heading font-bold text-lg text-foreground">{product.heroMetric}</span>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-xs text-muted-foreground">{t.product_gas_type}</span>
                  </div>
                  <span className="font-heading font-bold text-lg text-foreground">{t.product_gas_natural}</span>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-muted-foreground">{t.product_certifications}</span>
                  </div>
                  <span className="font-heading font-bold text-lg text-foreground">CE</span>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    {isCombi ? <Droplets className="w-4 h-4 text-cyan-500" /> : <Zap className="w-4 h-4 text-emerald-500" />}
                    <span className="text-xs text-muted-foreground">
                      {isCombi ? t.product_dhw_heating : t.product_efficiency}
                    </span>
                  </div>
                  <span className="font-heading font-bold text-lg text-foreground">
                    {isCombi ? t.product_combi : condensingVariant?.condensingEfficiency ?? '105%'}
                  </span>
                </div>
              </div>

              {/* Key features list */}
              <div>
                <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
                  {t.product_key_features}
                </h3>
                <ul className="space-y-2">
                  {product.featureKeys.map((key, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-forest mt-0.5 shrink-0" />
                      <span>{(t as Record<string, string>)[key] || key}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-8 text-center">
              {t.product_tech_specs}
            </h2>

            {/* Variant selector */}
            {variants.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {variants.map((v, i) => {
                  const power = (v as CombiVariant | CondensingVariant).power;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(i)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedVariant === i
                          ? 'bg-forest text-white shadow-md'
                          : 'bg-gray-100 text-foreground hover:bg-gray-200'
                      }`}
                    >
                      {power}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Specs table */}
            <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              {isCombi && combiVariant ? (
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      [t.product_nominal_heat_input, combiVariant.nominalHeatInput],
                      [t.product_minimal_heat_input, combiVariant.minimalHeatInput],
                      [t.product_nominal_heat_output, combiVariant.nominalHeatOutput],
                      [t.product_minimal_heat_output, combiVariant.minimalHeatOutput],
                      [t.product_hot_water_heat_input, combiVariant.hotWaterHeatInput],
                      [t.product_dhw_flow_rate, combiVariant.dhwFlowRate30K],
                      [t.product_max_heating_pressure, combiVariant.maxHeatingPressure],
                      [t.product_dhw_pressure, combiVariant.dhwPressure],
                      [t.product_electrical_supply, combiVariant.electricalSupply],
                      [t.product_electrical_power, combiVariant.electricalPower],
                      [t.product_protection_degree, combiVariant.protectionDegree],
                      [t.product_shock_protection, combiVariant.shockProtection],
                      [t.product_flue_diameter, combiVariant.flueDiameter],
                      [t.product_dimensions, combiVariant.dimensions],
                      [t.product_gas_inlet, combiVariant.gasInlet],
                      [t.product_heating_connection, combiVariant.heatingConnection],
                      [t.product_dhw_connection, combiVariant.dhwConnection],
                    ].map(([label, value], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-5 py-3 font-medium text-foreground">{label}</td>
                        <td className="px-5 py-3 text-right text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : condensingVariant ? (
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      [t.product_nominal_heat_input, condensingVariant.nominalHeatInput],
                      [t.product_minimal_heat_input, condensingVariant.minimalHeatInput],
                      [t.product_nominal_heat_output, condensingVariant.nominalHeatOutput],
                      [t.product_minimal_heat_output, condensingVariant.minimalHeatOutput],
                      [t.product_efficiency, condensingVariant.condensingEfficiency],
                      [t.product_hot_water_heat_input, condensingVariant.hotWaterHeatInput],
                      [t.product_dhw_flow_rate, condensingVariant.dhwFlowRate30K],
                      [t.product_nox_class, condensingVariant.noxEmission],
                      [t.product_gas_pressure, condensingVariant.gasPressure],
                      [t.product_max_heating_pressure, condensingVariant.maxHeatingPressure],
                      [t.product_dhw_pressure, condensingVariant.dhwPressure],
                      [t.product_electrical_supply, condensingVariant.electricalSupply],
                      [t.product_electrical_power, condensingVariant.electricalPower],
                      [t.product_protection_degree, condensingVariant.protectionDegree],
                      [t.product_shock_protection, condensingVariant.shockProtection],
                      [t.product_gas_inlet, condensingVariant.gasInlet],
                      [t.product_heating_connection, condensingVariant.heatingConnection],
                      [t.product_dhw_connection, condensingVariant.dhwConnection],
                      [t.product_dimensions, condensingVariant.dimensions],
                    ].map(([label, value], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-5 py-3 font-medium text-foreground">{label}</td>
                        <td className="px-5 py-3 text-right text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose ISCO — Selling Points */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-10 text-center">
              {t.product_why_isco}
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {SELLING_POINT_CATEGORIES.map((cat, ci) => {
                const Icon = SP_ICONS[cat.icon];
                const colors = [
                  'bg-forest/10 text-forest',
                  'bg-blue-50 text-blue-600',
                  'bg-orange-50 text-orange-600',
                  'bg-emerald-50 text-emerald-600',
                ][ci] ?? 'bg-gray-100 text-gray-600';
                return (
                  <motion.div
                    key={ci}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: ci * 0.1 }}
                    className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100"
                  >
                    <div className={`w-11 h-11 rounded-xl ${colors.split(' ')[0]} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${colors.split(' ')[1]}`} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                      {t[cat.titleKey as keyof typeof t]}
                    </h3>
                    <ul className="space-y-2.5">
                      {cat.pointKeys.map((key, pi) => (
                        <li key={pi} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-forest mt-0.5 shrink-0" />
                          <span>{t[key as keyof typeof t]}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications & Warranty */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-8">
              {t.product_certs_warranty}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {product.certifications.map((cert, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest/5 text-forest text-sm font-medium border border-forest/10"
                >
                  <Award className="w-4 h-4" />
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20 bg-forest text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">
              {t.cta_title}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t.cta_subtitle}
            </p>
            <Link href="/#contact" className="inline-flex items-center gap-2 bg-white text-forest px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg">
              {t.product_request_quote}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
