/*
 * Design: Nordic Clean Energy — Scandinavian Functionalism
 * Why Choose Us: Feature cards with icons, warm sage background
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Award, HeadphonesIcon, BadgeDollarSign, Truck } from 'lucide-react';

export default function WhySection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.15 });

  const features = [
    { icon: Award, title: t.why_quality_title, desc: t.why_quality_desc },
    { icon: HeadphonesIcon, title: t.why_service_title, desc: t.why_service_desc },
    { icon: BadgeDollarSign, title: t.why_price_title, desc: t.why_price_desc },
    { icon: Truck, title: t.why_delivery_title, desc: t.why_delivery_desc },
  ];

  return (
    <section className="py-20 lg:py-28 bg-forest relative overflow-hidden" ref={ref}>
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/3" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t.why_title}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t.why_subtitle}
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
