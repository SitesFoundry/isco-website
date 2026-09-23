/*
 * WhatsApp floating button — improved visibility & UX
 * Position: bottom-left to avoid conflict with scroll-to-top (bottom-right)
 * Features:
 *   - Delayed entrance (2s) with spring animation
 *   - Smart tooltip bubble appears after 3s, auto-hides after 8s
 *   - Tooltip re-appears once when user scrolls past 50% of page
 *   - Subtle pulse ring animation to draw attention without being intrusive
 *   - Official WhatsApp SVG icon for better brand recognition
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [hasScrollTooltipShown, setHasScrollTooltipShown] = useState(false);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { language } = useLanguage();

  // Delayed entrance
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Initial tooltip after entrance
  useEffect(() => {
    if (show) {
      const showTimer = setTimeout(() => setTooltip(true), 3000);
      const hideTimer = setTimeout(() => setTooltip(false), 10000);
      return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
    }
  }, [show]);

  // Scroll-triggered tooltip (once, when user scrolls past 50%)
  const handleScroll = useCallback(() => {
    if (hasScrollTooltipShown) return;
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollPercent > 0.5) {
      setHasScrollTooltipShown(true);
      setTooltip(true);
      tooltipTimerRef.current = setTimeout(() => setTooltip(false), 6000);
    }
  }, [hasScrollTooltipShown]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    };
  }, [handleScroll]);

  const tooltipText: Record<string, string> = {
    de: 'Schreiben Sie uns auf WhatsApp!',
    en: 'Chat with us on WhatsApp!',
    ru: 'Напишите нам в WhatsApp!',
    es: '¡Escríbanos por WhatsApp!',
    fr: 'Écrivez-nous sur WhatsApp !',
    it: 'Scrivici su WhatsApp!',
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-full left-0 mb-3 bg-white rounded-2xl shadow-xl px-4 py-3 text-sm text-gray-700 whitespace-nowrap border border-gray-100"
          >
            <div className="flex items-center gap-2">
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span className="font-medium">{tooltipText[language] || tooltipText.en}</span>
              <button
                onClick={() => setTooltip(false)}
                className="ml-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Arrow pointing down-left */}
            <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button with pulse ring */}
      <div className="relative">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

        <motion.a
          href="https://wa.me/8613916169339"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-2xl hover:bg-[#20BD5A] transition-all duration-300"
          aria-label="Contact us on WhatsApp"
        >
          <WhatsAppIcon className="w-7 h-7" />
        </motion.a>
      </div>
    </div>
  );
}
