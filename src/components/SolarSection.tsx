import { asset } from "@/lib/asset";
/*
 * Design: Nordic Clean Energy — Scandinavian Functionalism
 * Solar: Cards with warm gold accents, organic layout
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Sun, Zap, BatteryCharging, Home, Cable, Lightbulb } from 'lucide-react';

const SOLAR_IMG = asset('/images/solar-section.webp');

export default function SolarSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const products = [
    { icon: Sun, title: t.solar_panels_title, desc: t.solar_panels_desc },
    { icon: Zap, title: t.solar_inverters_title, desc: t.solar_inverters_desc },
    { icon: BatteryCharging, title: t.solar_storage_title, desc: t.solar_storage_desc },
    { icon: Home, title: t.solar_mounting_title, desc: t.solar_mounting_desc },
    { icon: Cable, title: t.solar_cables_title, desc: t.solar_cables_desc },
    { icon: Lightbulb, title: t.solar_accessories_title, desc: t.solar_accessories_desc },
  ];

  return (
    <section id="solar" className="py-20 lg:py-28 bg-sage/30" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 text-forest text-sm font-medium mb-4">
            <Sun className="w-4 h-4 text-gold" />
            {t.nav_solar}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            {t.solar_title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.solar_subtitle}
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden mb-16 shadow-xl"
        >
          <img
            src={SOLAR_IMG}
            alt="Premium solar panels"
            className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10">
            <h3 className="font-heading font-bold text-2xl lg:text-3xl text-white mb-2">
              {t.solar_title}
            </h3>
            <p className="text-white/80 text-sm lg:text-base max-w-lg">
              {t.solar_subtitle}
            </p>
          </div>
        </motion.div>

        {/* Product cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="group bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gold/30"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold/25 transition-colors">
                <product.icon className="w-6 h-6 text-forest" />
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
    </section>
  );
}
