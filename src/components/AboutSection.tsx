import { asset } from "@/lib/asset";
/*
 * Design: Nordic Clean Energy — Scandinavian Functionalism
 * About: Asymmetric layout with image, stats counter, and organic shapes
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Building2, Globe2, Package, Users } from 'lucide-react';

const ABOUT_IMG = asset('/images/about-company.webp');

export default function AboutSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.15 });

  const stats = [
    { icon: Building2, value: t.about_stat_years, label: t.about_stat_years_label },
    { icon: Globe2, value: t.about_stat_countries, label: t.about_stat_countries_label },
    { icon: Package, value: t.about_stat_products, label: t.about_stat_products_label },
    { icon: Users, value: t.about_stat_clients, label: t.about_stat_clients_label },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-sage text-forest text-sm font-medium mb-4">
            {t.nav_about}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            {t.about_title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.about_subtitle}
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={ABOUT_IMG}
                alt="ISCO GmbH office in Frankfurt"
                className="w-full h-[400px] lg:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-3xl bg-gold/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-sage -z-10" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-foreground text-lg leading-relaxed mb-6">
              {t.about_text_1}
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-10">
              {t.about_text_2}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="bg-sage/50 rounded-2xl p-5 text-center hover:bg-sage transition-colors duration-300"
                >
                  <stat.icon className="w-6 h-6 text-forest mx-auto mb-2" />
                  <div className="font-heading font-bold text-2xl text-forest">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
