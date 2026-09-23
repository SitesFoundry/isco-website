/*
 * GDPR-compliant cookie consent banner
 * Important for EU-based company (Germany)
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cookie, X } from 'lucide-react';

const consentTexts: Record<string, { message: string; accept: string; decline: string }> = {
  de: {
    message: 'Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern. Mit der Nutzung unserer Website stimmen Sie unserer Cookie-Richtlinie zu.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
  },
  en: {
    message: 'This website uses cookies to enhance your experience. By using our website, you agree to our cookie policy.',
    accept: 'Accept',
    decline: 'Decline',
  },
  ru: {
    message: 'Этот сайт использует файлы cookie для улучшения вашего опыта. Используя наш сайт, вы соглашаетесь с нашей политикой cookie.',
    accept: 'Принять',
    decline: 'Отклонить',
  },
  es: {
    message: 'Este sitio web utiliza cookies para mejorar su experiencia. Al usar nuestro sitio, acepta nuestra política de cookies.',
    accept: 'Aceptar',
    decline: 'Rechazar',
  },
  fr: {
    message: 'Ce site utilise des cookies pour améliorer votre expérience. En utilisant notre site, vous acceptez notre politique de cookies.',
    accept: 'Accepter',
    decline: 'Refuser',
  },
  it: {
    message: 'Questo sito utilizza cookie per migliorare la tua esperienza. Utilizzando il nostro sito, accetti la nostra politica sui cookie.',
    accept: 'Accetta',
    decline: 'Rifiuta',
  },
};

export default function CookieConsent() {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('isco-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('isco-cookie-consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('isco-cookie-consent', 'declined');
    setShow(false);
  };

  const texts = consentTexts[language] || consentTexts.en;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 lg:p-6"
        >
          <div className="container">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-4xl mx-auto">
              <Cookie className="w-8 h-8 text-gold shrink-0 hidden sm:block" />
              <p className="text-sm text-gray-600 flex-1 leading-relaxed">
                {texts.message}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
                >
                  {texts.decline}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-5 py-2 text-sm font-medium text-white bg-forest rounded-lg hover:bg-forest-light transition-colors"
                >
                  {texts.accept}
                </button>
              </div>
              <button
                onClick={handleDecline}
                className="absolute top-3 right-3 sm:hidden text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
