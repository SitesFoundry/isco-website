import { asset } from "@/lib/asset";
/*
 * Design: Nordic Clean Energy — Scandinavian Functionalism
 * Contact: Form + contact info cards
 * Backend: Cloudflare Pages Function handles form submission
 */
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { MapPin, Mail, Globe, Send, CheckCircle, Loader2 } from 'lucide-react';
import { getEmailDisplay, openMailto } from '@/lib/email-protect';
import { submitContact } from '@/lib/api';

const CONTACT_IMG = asset('/images/contact-section.webp');

export default function ContactSection() {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: t.contact_address_title,
      value: 'Kennedyallee 93\n60596 Frankfurt Am Main\nGermany',
      href: 'https://maps.google.com/?q=Kennedyallee+93+60596+Frankfurt+Am+Main+Germany',
      isExternal: true,
      isEmail: false,
    },
    {
      icon: Mail,
      title: t.contact_email_title,
      value: getEmailDisplay(),
      href: '#email',
      isExternal: false,
      isEmail: true,
    },
    {
      icon: Globe,
      title: t.contact_website_title,
      value: 'www.iscogmbh.com',
      href: 'https://www.iscogmbh.com',
      isExternal: true,
      isEmail: false,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitContact({
        name: formState.name,
        email: formState.email,
        phone: formState.phone || undefined,
        company: formState.company || undefined,
        subject: formState.subject || undefined,
        message: formState.message,
        language,
      });
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openMailto();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // isLoading state is managed by useState above

  return (
    <section id="contact" className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-sage text-forest text-sm font-medium mb-4">
            {t.nav_contact}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            {t.contact_title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.contact_subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Background image card */}
            <div className="relative rounded-2xl overflow-hidden h-48 mb-6">
              <img
                src={CONTACT_IMG}
                alt="ISCO GmbH office"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-forest/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-heading font-bold text-2xl text-white">ISCO GmbH</h3>
                  <p className="text-white/80 text-sm mt-1">Frankfurt am Main, Germany</p>
                </div>
              </div>
            </div>

            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.isEmail ? '#email' : info.href}
                onClick={info.isEmail ? handleEmailClick : undefined}
                target={info.isExternal ? '_blank' : undefined}
                rel={info.isExternal ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-sage/50 hover:bg-sage transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center shrink-0 group-hover:bg-forest/20 transition-colors">
                  <info.icon className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">{info.title}</div>
                  <div className="text-foreground text-sm whitespace-pre-line mt-0.5">
                    {info.value}
                    {info.isEmail && (
                      <span className="block text-xs text-muted-foreground mt-1 italic">
                        {t.contact_click_to_email}
                      </span>
                    )}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact_name} *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-sage/30 focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all text-sm disabled:opacity-50"
                    placeholder={t.contact_name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact_email} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-sage/30 focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all text-sm disabled:opacity-50"
                    placeholder={t.contact_email}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact_phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-sage/30 focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all text-sm disabled:opacity-50"
                    placeholder={t.contact_phone}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact_company}</label>
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-sage/30 focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all text-sm disabled:opacity-50"
                    placeholder={t.contact_company}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact_subject}</label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-sage/30 focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all text-sm disabled:opacity-50"
                  placeholder={t.contact_subject}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.contact_message} *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-sage/30 focus:border-forest focus:ring-1 focus:ring-forest/20 outline-none transition-all text-sm resize-none disabled:opacity-50"
                  placeholder={t.contact_message}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || submitted}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest text-white font-semibold hover:bg-forest-light transition-all duration-300 disabled:opacity-60 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.contact_sending || 'Sending...'}
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t.contact_success}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.contact_send}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
