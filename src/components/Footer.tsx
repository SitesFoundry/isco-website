import { asset } from "@/lib/asset";
/*
 * Design: Nordic Clean Energy — Scandinavian Functionalism
 * Footer: Dark forest green background, clean layout
 * Security: Email anti-scraping, no WhatsApp/phone displayed
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Mail, Globe } from 'lucide-react';
import { getEmailDisplay, openMailto } from '@/lib/email-protect';

export default function Footer() {
  const { t } = useLanguage();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openMailto();
  };

  return (
    <footer className="bg-forest-dark text-white/80">
      <div className="container py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src={asset("/images/isco-logo-footer.png")}
              alt="ISCO GmbH"
              className="h-14 w-auto brightness-0 invert mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {t.footer_description}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleEmailClick}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </button>
              <a
                href="https://www.iscogmbh.com"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4">{t.footer_quick_links}</h4>
            <ul className="space-y-2.5">
              {[
                { label: t.nav_home, href: '#home' },
                { label: t.nav_about, href: '#about' },
                { label: t.nav_contact, href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleScroll(link.href); }}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Areas */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4">{t.footer_business}</h4>
            <ul className="space-y-2.5">
              {[
                { label: t.nav_solar, href: '#solar' },
                { label: t.nav_hvac, href: '#hvac' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleScroll(link.href); }}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4">{t.footer_contact_info}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">
                  Kennedyallee 93<br />60596 Frankfurt Am Main<br />Germany
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <button
                  onClick={handleEmailClick}
                  className="text-sm text-white/60 hover:text-gold transition-colors text-left"
                >
                  {getEmailDisplay()}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{t.footer_rights}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">{t.footer_privacy}</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">{t.footer_terms}</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">{t.footer_imprint}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
