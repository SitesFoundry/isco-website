import { asset } from "@/lib/asset";
/*
 * Design: Nordic Clean Energy — Scandinavian Functionalism
 * Hero: Full-width immersive banner with organic overlay and floating elements
 * Dark background image → white/light text
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Sun, Thermometer } from 'lucide-react';

const HERO_IMG = asset('/images/hero-banner.webp');

export default function HeroSection() {
  const { t } = useLanguage();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Sustainable energy community with solar panels"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3B2E]/85 via-[#0D3B2E]/60 to-[#0D3B2E]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2E]/50 via-transparent to-[#0D3B2E]/20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sun className="w-4 h-4 text-gold" />
            <span className="text-sm text-white/90 font-medium">Solar & HVAC Solutions</span>
            <Thermometer className="w-4 h-4 text-gold" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6"
          >
            {t.hero_title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
          >
            {t.hero_subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => handleScroll('#solar')}
              className="group flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-forest-dark font-semibold text-base hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t.hero_cta_solar}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => handleScroll('#contact')}
              className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-base border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              {t.hero_cta_contact}
            </button>
          </motion.div>
        </div>

        {/* Floating stats - desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4"
        >
          {[
            { value: t.about_stat_years, label: t.about_stat_years_label },
            { value: t.about_stat_countries, label: t.about_stat_countries_label },
            { value: t.about_stat_products, label: t.about_stat_products_label },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/15 text-center min-w-[140px]"
            >
              <div className="font-heading font-bold text-2xl text-gold">{stat.value}</div>
              <div className="text-xs text-white/70 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
            fill="oklch(0.995 0.002 90)"
          />
        </svg>
      </div>
    </section>
  );
}
