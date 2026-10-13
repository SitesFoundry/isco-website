/**
 * Product detail page — /products/:category/:slug
 *
 * Renders any product whose spec sheet is a list of labelled rows: inverters
 * and batteries today. Solar modules keep their own page because their spec
 * sheet is a matrix — power steps down the left, electrical values across — and
 * that does not fit a label/value table.
 *
 * Spec labels come from SPEC_LABELS via specLabel(), which falls back to the
 * English source per key, so an untranslated label shows its English text
 * instead of the raw key.
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowLeft, Check, Zap } from 'lucide-react';
import { findCategory } from '@/data/solarProducts';
import {
  findProductIn,
  productsForCategory,
  type Product,
} from '@/data/solarSystems';
import { specLabel } from '@/lib/i18n';

export default function ProductDetail() {
  const { t, language } = useLanguage();
  const [, params] = useRoute('/products/:category/:slug');
  const categorySlug = params?.category ?? '';
  const slug = params?.slug ?? '';

  const category = findCategory(categorySlug);
  const product = findProductIn(categorySlug, slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug, slug]);

  if (!category || !product) {
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
  const categoryName = key[category.nameKey] ?? category.nameKey;
  const siblings = (productsForCategory(categorySlug) ?? []).filter(
    (p) => p.slug !== product.slug,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container py-3 flex items-center justify-between">
          <Link
            href={`/products/${categorySlug}`}
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
      <section className="py-10 lg:py-14">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-10 flex items-center justify-center"
          >
            <img
              src={product.image}
              alt={`ISCO ${product.model} ${product.variant}`}
              className="max-h-[420px] w-auto object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-forest text-xs font-medium">
              <Zap className="w-3.5 h-3.5" />
              {categoryName}
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mt-4 mb-1">
              {product.model}
            </h1>
            {product.variant && (
              <p className="text-xl text-muted-foreground mb-4">
                {product.variant}
              </p>
            )}
            <p className="text-sm text-muted-foreground mb-6">
              <span className="text-foreground/60">{t.sm_part_number}:</span>{' '}
              <span className="font-medium text-foreground">
                {product.partNumber}
              </span>
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.summary}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {product.keyFacts.map((f) => (
                <div
                  key={f.labelKey}
                  className="bg-white rounded-xl border border-gray-100 px-4 py-3"
                >
                  <dt className="text-xs text-muted-foreground mb-1">
                    {specLabel(language, f.labelKey)}
                  </dt>
                  <dd className="font-semibold text-foreground text-sm">
                    {f.value}
                  </dd>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      {product.features.length > 0 && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-8 text-center">
              {t.sm_features_title}
            </h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {product.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3"
                >
                  <Check className="w-4 h-4 text-forest mt-1 shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Specifications */}
      <section className="py-14">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-2 text-center">
            {t.sm_specs_title}
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            {t.sm_specs_subtitle}
          </p>

          <div className="space-y-6">
            {product.specGroups
              .filter((g) => g.rows.length > 0)
              .map((g) => (
                <SpecTable
                  key={g.titleKey}
                  title={specLabel(language, g.titleKey)}
                  rows={g.rows.map((r) => ({
                    label: specLabel(language, r.labelKey),
                    value: r.value,
                  }))}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Other models */}
      {siblings.length > 0 && (
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="container">
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-8 text-center">
              {t.prod_other_models}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {siblings.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${categorySlug}/${p.slug}`}
                  className="group bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-forest/20 hover:shadow-lg p-5 text-center transition-all"
                >
                  <img
                    src={p.image}
                    alt={`ISCO ${p.model}`}
                    className="h-28 w-auto mx-auto object-contain mb-3"
                    loading="lazy"
                  />
                  <span className="font-heading font-semibold text-lg text-foreground block">
                    {p.model}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {p.variant}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
            {t.prod_cta_title}
          </h2>
          <p className="text-muted-foreground mb-8">{t.prod_cta_body}</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-forest text-white px-7 py-3.5 rounded-full font-medium hover:bg-forest/90 transition-colors"
          >
            {t.product_request_quote}
          </Link>
        </div>
      </section>
    </div>
  );
}

function SpecTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="bg-sage/40 px-5 py-3">
        <h3 className="font-heading font-semibold text-forest">{title}</h3>
      </div>
      <dl>
        {rows.map((r, i) => (
          <div
            key={`${r.label}-${i}`}
            className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-5 py-3 ${
              i % 2 ? 'bg-gray-50/60' : ''
            }`}
          >
            <dt className="text-sm text-muted-foreground sm:w-2/5 sm:shrink-0">
              {r.label}
            </dt>
            <dd className="text-sm font-medium text-foreground sm:flex-1">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
