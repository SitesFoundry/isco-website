/**
 * Product category page — /products/:category
 *
 * Renders one Solar category. Categories that already have a catalogue list
 * their products; the rest show the template state so the navigation is
 * complete and honest about what is still being prepared.
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowLeft, Clock, PackageOpen } from 'lucide-react';
import {
  SOLAR_CATEGORIES,
  SOLAR_MODULES,
  findCategory,
} from '@/data/solarProducts';
import type { TranslationKeys } from '@/lib/i18n';

export default function ProductCategory() {
  const { t } = useLanguage();
  const [, params] = useRoute('/products/:category');
  const slug = params?.category ?? '';
  const category = findCategory(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t.product_not_found}
          </h1>
          <Link
            href="/"
            className="text-forest hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> {t.nav_home}
          </Link>
        </div>
      </div>
    );
  }

  const key = t as unknown as Record<string, string>;
  const name = key[category.nameKey] ?? category.nameKey;
  const description = key[category.descKey] ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container py-3 flex items-center justify-between">
          <Link
            href="/#solar"
            className="text-forest hover:text-forest/80 inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t.nav_solar}
          </Link>
          <Link
            href="/#contact"
            className="bg-forest text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-forest/90 transition-colors"
          >
            {t.product_request_quote}
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-medium text-forest uppercase tracking-wider">
              {t.nav_solar}
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2 mb-4">
              {name}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {category.populated ? (
        <ProductGrid t={t} />
      ) : (
        <TemplateState t={t} />
      )}

      {/* Other categories */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container">
          <h2 className="font-heading font-semibold text-xl text-foreground mb-8">
            {t.prod_all_products}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOLAR_CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => {
              const cname = key[c.nameKey] ?? c.nameKey;
              return (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className="group flex items-center justify-between gap-4 bg-gray-50 hover:bg-sage/40 rounded-xl px-5 py-4 border border-gray-100 transition-colors"
                >
                  <span className="font-medium text-foreground">{cname}</span>
                  {c.populated ? (
                    <span className="text-xs text-forest font-medium">
                      {t.prod_browse}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {t.prod_in_preparation}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Category with a catalogue ─────────────────────────────────── */

function ProductGrid({ t }: { t: TranslationKeys }) {
  return (
    <section className="pb-8">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLAR_MODULES.map((m) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href={`/products/solar-modules/${m.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-forest/20 transition-all block h-full cursor-pointer text-center"
              >
                <img
                  src={m.image}
                  alt={`ISCO ${m.model} TOPCon bifacial solar module`}
                  className="h-44 w-auto mx-auto object-contain mb-5"
                  loading="lazy"
                />
                <span className="font-heading font-bold text-2xl text-foreground block">
                  {m.model}
                </span>
                {m.variant && (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-gray-900 text-white text-xs font-medium">
                    {m.variant}
                  </span>
                )}
                <dl className="mt-5 space-y-2 text-sm text-left">
                  <MiniRow label={t.sm_power_range} value={m.powerRange} />
                  <MiniRow label={t.sm_efficiency} value={m.peakEfficiency} />
                  <MiniRow label={t.sm_weight} value={m.weight} />
                  <MiniRow label={t.sm_loading} value={m.loadingQuantity} />
                </dl>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground text-right">{value}</dd>
    </div>
  );
}

/* ── Category still being built ────────────────────────────────── */

function TemplateState({ t }: { t: TranslationKeys }) {
  return (
    <section className="pb-8">
      <div className="container">
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 lg:p-16 text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-sage/60 flex items-center justify-center mx-auto mb-6">
            <PackageOpen className="w-7 h-7 text-forest" />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-forest text-xs font-medium mb-4">
            <Clock className="w-3.5 h-3.5" />
            {t.prod_in_preparation}
          </span>
          <h2 className="font-heading font-semibold text-xl sm:text-2xl text-foreground mb-4">
            {t.prod_template_title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {t.prod_template_body}
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-full font-medium hover:bg-forest/90 transition-colors"
          >
            {t.product_request_quote}
          </Link>
        </div>
      </div>
    </section>
  );
}
