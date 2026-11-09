/*
 * Keeps <head> in sync after an in-app navigation.
 *
 * The page that arrives from the server already has the right title,
 * description, canonical and structured data (scripts/prerender.mjs writes them
 * from src/lib/seo.ts). But this is a single-page app: clicking a product from
 * the homepage changes the URL without a document load. Before this component
 * existed, the URL changed and every tag stayed on the homepage's values, so a
 * shared product link previewed as the homepage and a crawler that rendered the
 * navigation saw one title for the whole site.
 *
 * The values come from the same getSeo() the prerenderer uses, so the two can
 * never disagree about what a page is about.
 */
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPageJsonLd, getSeo } from '@/lib/seo';
import type { Language } from '@/lib/i18n';

const OG_LOCALES: Record<Language, string> = {
  de: 'de_DE',
  en: 'en_US',
  ru: 'ru_RU',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
};

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function SEOHead() {
  const [location] = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const seo = getSeo(location);

    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', seo.robots);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'ISCO GmbH');
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:url', seo.canonical);
    setMeta('property', 'og:image', seo.image);
    setMeta('property', 'og:image:alt', seo.imageAlt);
    setMeta('property', 'og:locale', OG_LOCALES[language]);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', seo.image);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonical);

    /*
     * The prerendered document already contains the same graph. Replace all
     * JSON-LD rather than adding to it: without this, every page ends up with
     * two BreadcrumbList and two Product entities once React mounts, and a
     * renderer-using crawler sees the duplicate.
     */
    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((el) => el.remove());
    for (const schema of getPageJsonLd(seo)) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', '');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    document.documentElement.lang = language;
  }, [location, language]);

  return null;
}
