import { asset } from "@/lib/asset";
/*
 * Design: Nordic Clean Energy — Scandinavian Functionalism
 * HVAC: Cards with cool blue-green accents, product image showcase for boilers
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Flame, Wind, AirVent, Snowflake, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';

const HVAC_IMG = asset('/images/hvac-section.webp');

/* Boiler product images */
const BOILER_IMAGES = [
  {
    src: asset('/images/combi-boiler-link.png'),
    label: 'Link Series',
    type: 'combi',
    slug: 'link',
  },
  {
    src: asset('/images/combi-boiler-oxygen.png'),
    label: 'Oxygen Series',
    type: 'combi',
    slug: 'oxygen',
  },
  {
    src: asset('/images/condensing-boiler-master.png'),
    label: 'Master Series',
    type: 'condensing',
    slug: 'master',
  },
  {
    src: asset('/images/condensing-boiler-olympia.png'),
    label: 'Olympia Series',
    type: 'condensing',
    slug: 'olympia',
  },
];

export default function HvacSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const products = [
    { icon: Flame, title: t.hvac_boiler_title, desc: t.hvac_boiler_desc, accent: 'bg-orange-50 text-orange-600' },
    { icon: Wind, title: t.hvac_heatpump_title, desc: t.hvac_heatpump_desc, accent: 'bg-emerald-50 text-emerald-600' },
    { icon: AirVent, title: t.hvac_ventilation_title, desc: t.hvac_ventilation_desc, accent: 'bg-sky-50 text-sky-600' },
    { icon: Snowflake, title: t.hvac_ac_title, desc: t.hvac_ac_desc, accent: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <section id="hvac" className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            {t.nav_hvac}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            {t.hvac_title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.hvac_subtitle}
          </p>
        </motion.div>

        {/* Two-column layout: image + cards */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl sticky top-28">
              <img
                src={HVAC_IMG}
                alt="Modern heat pump installation"
                className="w-full h-[300px] lg:h-[520px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
            </div>
          </motion.div>

          {/* Cards column */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                className="group bg-white rounded-2xl p-6 lg:p-7 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-forest/20"
              >
                <div className={`w-12 h-12 rounded-xl ${product.accent.split(' ')[0]} flex items-center justify-center mb-5`}>
                  <product.icon className={`w-6 h-6 ${product.accent.split(' ')[1]}`} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {product.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Boiler Product Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="text-center mb-10">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-3">
              {t.hvac_boiler_title}
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {BOILER_IMAGES.map((boiler, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              >
                <Link href={`/products/boiler/${boiler.slug}`} className="group bg-white rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-forest/20 text-center block cursor-pointer">
                  <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-xl p-4 mb-4 overflow-hidden">
                    <img
                      src={boiler.src}
                      alt={`ISCO ${boiler.type === 'combi' ? 'Combi' : 'Condensing Combi'} Boiler - ${boiler.label}`}
                      className="w-full h-[200px] sm:h-[240px] lg:h-[280px] object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-heading font-semibold text-base text-foreground mb-1">
                    {boiler.label}
                  </h4>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    boiler.type === 'combi'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {boiler.type === 'combi' ? t.hvac_boiler_combi : t.hvac_boiler_condensing}
                  </span>
                  <div className="flex items-center justify-center gap-1 text-xs text-forest font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3 h-3" />
                    {t.product_view_details}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
