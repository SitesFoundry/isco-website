/**
 * Product category page — /products/:category
 *
 * Lists whatever products a category has. Categories whose datasheets have not
 * arrived yet show the range description and a way to ask about it, rather than
 * a placeholder announcing that the page is unfinished — that message was shown
 * to customers, and telling visitors the site is incomplete serves nobody.
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SOLAR_CATEGORIES, SOLAR_MODULES, findCategory } from '@/data/solarProducts';
import { productsForCategory, type Product } from '@/data/solarSystems';
import { specLabel, type Language } from '@/lib/i18n';

/** One card's worth of information, whatever catalogue it came from. */
interface Card {
  key: string;
  href: string;
  image: string;
  model: string;
  variant?: string;
  badge?: string;
  facts: { label: string; value: string }[];
}

export default function ProductCategory() {
  const { t, language } = useLanguage();
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
  const cards = cardsFor(slug, key, language);

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

      {cards.length > 0 ? (
        <ProductGrid cards={cards} />
      ) : (
        <RangeState t={t} />
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
              const count = cardsFor(c.slug, key, language).length;
              return (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className="group flex items-center justify-between gap-4 bg-gray-50 hover:bg-sage/40 rounded-xl px-5 py-4 border border-gray-100 transition-colors"
                >
                  <span className="font-medium text-foreground">{cname}</span>
                  <ArrowRight className="w-4 h-4 text-forest shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Normalising the catalogues into one card shape ─────────────── */

/**
 * Both catalogues, expressed as the same card.
 *
 * Solar modules and the inverter/battery products have separate interfaces
 * because their datasheets are shaped differently. The listing only needs the
 * same four things from each, so the difference is flattened here rather than
 * leaking into the markup.
 */
function cardsFor(
  slug: string,
  t: Record<string, string>,
  language: Language,
): Card[] {
  if (slug === 'solar-modules') {
    return SOLAR_MODULES.map((m) => ({
      key: m.slug,
      href: `/products/solar-modules/${m.slug}`,
      image: m.image,
      model: m.model,
      variant: m.variant || undefined,
      facts: [
        { label: t.sm_power_range, value: m.powerRange },
        { label: t.sm_efficiency, value: m.peakEfficiency },
        { label: t.sm_weight, value: m.weight },
        { label: t.sm_loading, value: m.loadingQuantity },
      ],
    }));
  }

  const products: Product[] = productsForCategory(slug) ?? [];
  return products.map((p) => ({
    key: p.slug,
    href: `/products/${slug}/${p.slug}`,
    image: p.image,
    model: p.model,
    variant: p.variant || undefined,
    facts: p.keyFacts.slice(0, 4).map((f) => ({
      label: specLabel(language, f.labelKey),
      value: f.value,
    })),
  }));
}

/* ── Category with a catalogue ─────────────────────────────────── */

function ProductGrid({ cards }: { cards: Card[] }) {
  return (
    <section className="pb-8">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={c.href}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-forest/20 transition-all block h-full cursor-pointer text-center"
              >
                <div className="h-44 flex items-center justify-center mb-5">
                  <img
                    src={c.image}
                    alt={`ISCO ${c.model}`}
                    className="max-h-44 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="font-heading font-bold text-2xl text-foreground block">
                  {c.model}
                </span>
                {c.variant && (
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-gray-900 text-white text-xs font-medium">
                    {c.variant}
                  </span>
                )}
                <dl className="mt-5 space-y-2 text-sm text-left">
                  {c.facts.map((f, fi) => (
                    <div
                      key={`${f.label}-${fi}`}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <dt className="text-muted-foreground">{f.label}</dt>
                      <dd className="font-medium text-foreground text-right">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Category whose datasheets have not arrived ────────────────── */

/*
 * Not a placeholder notice. The category is a real product range ISCO supplies;
 * what is missing is published detail. So this states what the range covers and
 * offers the route a buyer would actually take.
 */
function RangeState({ t }: { t: Record<string, string> }) {
  return (
    <section className="pb-8">
      <div className="container">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 lg:p-14 max-w-3xl mx-auto text-center shadow-sm">
          <h2 className="font-heading font-semibold text-xl sm:text-2xl text-foreground mb-4">
            {t.prod_range_title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {t.prod_range_body}
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
