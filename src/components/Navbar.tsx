import { asset } from "@/lib/asset";
/*
 * Design: Nordic Clean Energy — Scandinavian Functionalism
 * Navbar: Clean, transparent-to-solid on scroll, with language selector at top
 * Colors: Forest green primary, warm cream background
 *
 * The Solar and HVAC entries are dropdowns. Solar's children link to real
 * category pages; HVAC's children scroll to the section that describes each
 * product line until those pages exist. Both parents still scroll to their
 * section when clicked, so the dropdown reveals a taxonomy without taking the
 * short path away.
 */
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANGUAGES, type Language } from '@/lib/i18n';
import { SOLAR_CATEGORIES } from '@/data/solarProducts';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NavChild = {
  label: string;
  /** "#section" scrolls in-page; anything else is a route. */
  href: string;
  /** Rendered as a small trailing tag, e.g. "In preparation". */
  note?: string;
};

type NavItem =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'group'; label: string; href: string; children: NavChild[] };

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Translation keys are looked up by name for the category entries, which live
   * in the catalogue data as key strings rather than as literal copy. */
  const key = t as unknown as Record<string, string>;

  const navItems: NavItem[] = [
    { kind: 'link', label: t.nav_home, href: '#home' },
    { kind: 'link', label: t.nav_about, href: '#about' },
    {
      kind: 'group',
      label: t.nav_solar,
      href: '#solar',
      children: SOLAR_CATEGORIES.map((c) => ({
        label: key[c.nameKey] ?? c.nameKey,
        href: `/products/${c.slug}`,
        note: c.populated ? undefined : t.prod_in_preparation,
      })),
    },
    {
      kind: 'group',
      label: t.nav_hvac,
      href: '#hvac',
      children: [
        { label: t.hvac_boiler_title, href: '#hvac' },
        { label: t.hvac_heatpump_title, href: '#hvac' },
        { label: t.hvac_ventilation_title, href: '#hvac' },
        { label: t.hvac_ac_title, href: '#hvac' },
      ],
    },
    { kind: 'link', label: t.nav_contact, href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setOpenMenu(null);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLang = LANGUAGES.find(l => l.code === language);

  /** A dropdown child: in-page anchors scroll, routes navigate. */
  const renderChild = (child: NavChild, className: string) =>
    child.href.startsWith('#') ? (
      <a
        href={child.href}
        onClick={(e) => { e.preventDefault(); handleNavClick(child.href); }}
        className={className}
      >
        {child.label}
      </a>
    ) : (
      <Link href={child.href} className={className} onClick={() => setMobileOpen(false)}>
        {child.label}
      </Link>
    );

  const linkClass = scrolled
    ? 'text-gray-700 hover:text-forest hover:bg-sage'
    : 'text-white/90 hover:text-white hover:bg-white/10';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar with language selector */}
      <div className={`transition-all duration-500 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-10 opacity-100'}`}>
        <div className="container flex items-center justify-end h-full">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang?.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden min-w-[160px]"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-sage ${
                        language === lang.code
                          ? 'bg-sage text-forest font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="container flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center gap-2 z-10"
        >
          <img
            src={asset("/images/isco-logo-nav.png")}
            alt="ISCO GmbH"
            className={`h-10 lg:h-12 w-auto transition-all duration-500 ${
              scrolled ? '' : 'brightness-0 invert'
            }`}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.kind === 'link' ? (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${linkClass}`}
              >
                {item.label}
              </a>
            ) : (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  aria-expanded={openMenu === item.label}
                  aria-haspopup="true"
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 inline-flex items-center gap-1.5 ${linkClass}`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      openMenu === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 min-w-[280px]"
                    >
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2">
                        {item.children.map((child) => (
                          <div key={`${child.href}-${child.label}`}>
                            {child.href.startsWith('#') ? (
                              <a
                                href={child.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(child.href); }}
                                className="flex items-center justify-between gap-4 px-5 py-2.5 text-sm text-gray-700 hover:bg-sage hover:text-forest transition-colors"
                              >
                                <span>{child.label}</span>
                                {child.note && (
                                  <span className="text-xs text-muted-foreground shrink-0">
                                    {child.note}
                                  </span>
                                )}
                              </a>
                            ) : (
                              <Link
                                href={child.href}
                                onClick={() => setOpenMenu(null)}
                                className="flex items-center justify-between gap-4 px-5 py-2.5 text-sm text-gray-700 hover:bg-sage hover:text-forest transition-colors cursor-pointer"
                              >
                                <span>{child.label}</span>
                                {child.note && (
                                  <span className="text-xs text-muted-foreground shrink-0">
                                    {child.note}
                                  </span>
                                )}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ),
          )}

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="ml-3 px-5 py-2.5 text-sm font-semibold rounded-full bg-forest text-white hover:bg-forest-light transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {t.request_quote}
          </a>

          {/* Compact language selector when scrolled */}
          {scrolled && (
            <div className="relative ml-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-forest transition-colors px-3 py-2 rounded-full hover:bg-sage"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase text-xs font-medium">{language}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden min-w-[160px]"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as Language);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-sage ${
                          language === lang.code
                            ? 'bg-sage text-forest font-medium'
                            : 'text-gray-700'
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden z-10 p-2 rounded-lg transition-colors ${
            scrolled || mobileOpen ? 'text-forest' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col items-center gap-5 pt-24 pb-16 px-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="w-full max-w-sm text-center"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                      className="text-2xl font-heading font-semibold text-forest hover:text-forest-light transition-colors"
                    >
                      {item.label}
                    </a>

                    {/* Children, indented under their parent */}
                    {item.kind === 'group' && (
                      <div className="mt-3 flex flex-col gap-2 border-l-2 border-sage pl-4 text-left">
                        {item.children.map((child) => (
                          <div key={`${child.href}-${child.label}`}>
                            {renderChild(
                              child,
                              'text-sm text-gray-700 hover:text-forest transition-colors',
                            )}
                            {child.note && (
                              <span className="ml-2 text-xs text-muted-foreground">
                                {child.note}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  className="mt-4 px-8 py-3 text-lg font-semibold rounded-full bg-forest text-white"
                >
                  {t.request_quote}
                </motion.a>

                {/* Mobile language selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap justify-center gap-2 mt-4"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setMobileOpen(false);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-full transition-colors ${
                        language === lang.code
                          ? 'bg-forest text-white'
                          : 'bg-sage text-gray-700 hover:bg-forest/10'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Click outside to close language dropdown */}
      {langOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLangOpen(false)}
        />
      )}
    </header>
  );
}
