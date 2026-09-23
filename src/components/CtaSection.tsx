/*
 * Design: Nordic Clean Energy — Scandinavian Functionalism
 * CTA: Bold call-to-action with gradient background
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-20 lg:py-24 bg-sage/30" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-forest via-forest-light to-forest rounded-3xl p-10 lg:p-16 text-center overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/10 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {t.cta_title}
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              {t.cta_subtitle}
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-forest-dark font-semibold text-lg hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t.cta_button}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
