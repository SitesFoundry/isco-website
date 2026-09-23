import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SolarSection from '@/components/SolarSection';
import HvacSection from '@/components/HvacSection';
import WhySection from '@/components/WhySection';
import CtaSection from '@/components/CtaSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import SEOHead from '@/components/SEOHead';
import CookieConsent from '@/components/CookieConsent';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SolarSection />
        <HvacSection />
        <WhySection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
