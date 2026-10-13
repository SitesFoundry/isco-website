import { absoluteUrl, SITE_ORIGIN } from "@/lib/asset";
/*
 * SEO: Structured data (JSON-LD), Open Graph meta tags
 * Injected via useEffect to dynamically update head
 */
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SEOHead() {
  const { language } = useLanguage();

  useEffect(() => {
    // Update lang attribute
    document.documentElement.lang = language;

    // Structured data - Organization
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ISCO GmbH',
      url: SITE_ORIGIN,
      // Absolute, and a mark that clears Google's 112x112 floor for this field.
      logo: absoluteUrl('/images/isco-logo-footer.png'),
      description: 'Leading provider of Solar and HVAC solutions in Europe. Solar modules, inverters, heat pumps, gas boilers and more.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kennedyallee 93',
        addressLocality: 'Frankfurt Am Main',
        postalCode: '60596',
        addressCountry: 'DE',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'sales@iscogmbh.com',
        contactType: 'sales',
        availableLanguage: ['German', 'English', 'Russian', 'Spanish', 'French', 'Italian'],
      },
      sameAs: [],
    };

    // Structured data - LocalBusiness
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'ISCO GmbH',
      image: absoluteUrl('/images/about-company.webp'),
      url: SITE_ORIGIN,
      email: 'sales@iscogmbh.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kennedyallee 93',
        addressLocality: 'Frankfurt Am Main',
        postalCode: '60596',
        addressCountry: 'DE',
      },
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    };

    // Structured data - WebSite (for AI search / sitelinks)
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ISCO GmbH',
      url: SITE_ORIGIN,
      inLanguage: ['de', 'en', 'ru', 'es', 'fr', 'it'],
      description: 'ISCO GmbH - Solar & HVAC Solutions Provider in Europe',
    };

    // Remove existing schema scripts
    document.querySelectorAll('script[data-schema]').forEach(el => el.remove());

    // Inject schemas
    [orgSchema, localBusinessSchema, websiteSchema].forEach((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', `schema-${i}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Open Graph
    updateMeta('og:title', 'ISCO GmbH - Solar & HVAC Solutions', true);
    updateMeta('og:description', 'Leading provider of Solar and HVAC solutions in Europe. Solar modules, inverters, heat pumps, gas boilers and more.', true);
    updateMeta('og:url', SITE_ORIGIN, true);
    updateMeta('og:type', 'website', true);
    // A social crawler fetches this without a page to resolve against, so a
    // root-relative path yields no preview image at all.
    updateMeta('og:image', absoluteUrl('/images/hero-banner.webp'), true);
    updateMeta('og:locale', language === 'de' ? 'de_DE' : language === 'en' ? 'en_US' : language, true);
    updateMeta('og:site_name', 'ISCO GmbH', true);

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', 'ISCO GmbH - Solar & HVAC Solutions');
    updateMeta('twitter:description', 'Leading provider of Solar and HVAC solutions in Europe.');
    updateMeta('twitter:image', absoluteUrl('/images/hero-banner.webp'));

    // Additional SEO meta
    updateMeta('robots', 'index, follow');
    updateMeta('author', 'ISCO GmbH');
    updateMeta('geo.region', 'DE-HE');
    updateMeta('geo.placename', 'Frankfurt Am Main');

    return () => {
      document.querySelectorAll('script[data-schema]').forEach(el => el.remove());
    };
  }, [language]);

  return null;
}
