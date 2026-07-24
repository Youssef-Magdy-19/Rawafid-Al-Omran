import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle, 
  Building2, User, MessageCircle, ArrowRight, 
  Shield, Award, Users, Globe
} from 'lucide-react';
import { Button } from '@components/ui';
import { useLanguage } from '@providers/LanguageProvider';
import { apiClient } from '@services/api/client';

// ===== ANIMATION VARIANTS =====
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

// ===== GRADIENT BACKGROUND =====
const GradientBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -left-1/4 -top-1/4 h-2/3 w-2/3 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/30" />
    <div className="absolute -bottom-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-800/20" />
    <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-800/10" />
  </div>
);

// ============================================
// ===== INFO ITEMS =====
// ============================================
const infoItems = [
  { key: 'address', Icon: MapPin },
  { key: 'phone', Icon: Phone },
  { key: 'email', Icon: Mail },
  { key: 'hours', Icon: Clock },
];

const serviceOptions = [
  { value: 'construction', labelKey: 'services.items.constructionManagement.title' },
  { value: 'design', labelKey: 'services.items.designEngineering.title' },
  { value: 'infrastructure', labelKey: 'services.items.infrastructureDevelopment.title' },
  { value: 'renovation', labelKey: 'services.items.renovationRestoration.title' },
  { value: 'other', labelKey: 'contact.form.otherService' },
];

// ============================================
// ===== MAIN CONTACT PAGE =====
// ============================================
export function ContactPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    try {
      await apiClient.post('/contacts', formData);
      setIsSubmitted(true);
    } catch {
      setFormError(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return <SuccessScreen onReset={() => setIsSubmitted(false)} />;
  }

  return (
    <>
      <Helmet>
        <title>{t('contact.seo.title')}</title>
        <meta name="description" content={t('contact.seo.description')} />
      </Helmet>

      {/* ===== 1. HERO ===== */}
      <HeroSection />

      {/* ===== 2. CONTACT SECTION ===== */}
      <ContactSection
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formError={formError}
        isRTL={isRTL}
      />
    </>
  );
}

// ============================================
// ===== SUCCESS SCREEN =====
// ============================================
const SuccessScreen = ({ onReset }: { onReset: () => void }) => {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        >
          <CheckCircle className="h-12 w-12" />
        </motion.div>
        <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
          {t('contact.success.title')}
        </h2>
        <p className="mb-8 text-lg text-slate-600 dark:text-slate-300">
          {t('contact.success.description')}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={onReset}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {t('contact.success.another')}
          </Button>
          <Link to="/">
            <Button variant="outline">
              {t('contact.success.home')}
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// ===== 1. HERO SECTION =====
// ============================================
const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-300" />
            </span>
            <span className="text-sm font-medium text-white/90">
              {t('contact.info.title')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {t('contact.hero.title')}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
          >
            {t('contact.hero.description')}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-white/50">
            Scroll
          </span>
          <div className="relative h-12 w-6 rounded-full border-2 border-white/30">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1 h-3 w-1 -translate-x-1/2 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// ===== 2. CONTACT SECTION =====
// ============================================
const ContactSection = ({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  formError,
  isRTL,
}: any) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <GradientBackground />
      
      <div className="container relative mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 lg:grid-cols-5"
        >
          {/* Left: Contact Info */}
          <motion.div variants={fadeUp(0)} className="lg:col-span-2">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t('contact.info.title')}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {t('contact.info.description')}
              </p>

              <div className="mt-8 space-y-4">
                {infoItems.map(({ key, Icon }, i) => (
                  <motion.div
                    key={key}
                    variants={fadeUp(i * 0.05 + 0.1)}
                    className="group flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-slate-800/50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:group-hover:bg-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {t(`contact.info.${key}.label`)}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {key === 'email'
                          ? 'info@rawafidomran.com'
                          : t(`contact.info.${key}.value`)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                variants={fadeUp(0.4)}
                className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-800/50"
              >
                <div className="aspect-video w-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-10 w-10 text-blue-400/40 dark:text-blue-600/40" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {t('contact.info.address.value')}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={fadeUp(0.5)}
                className="mt-8 grid grid-cols-3 gap-3"
              >
                {[
                  { icon: Shield, label: 'Licensed' },
                  { icon: Award, label: 'Certified' },
                  { icon: Users, label: 'Expert Team' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-lg bg-white p-3 shadow-sm dark:bg-slate-800/50"
                  >
                    <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={fadeUp(0.15)} className="lg:col-span-3">
            <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800/50 lg:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {t('contact.form.title')}
                </h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('contact.form.name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('contact.form.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.form.phonePlaceholder')}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('contact.form.companyPlaceholder')}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t('contact.form.service')}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="">{t('contact.form.servicePlaceholder')}</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {t(opt.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t('contact.form.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={5}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>

                {formError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  >
                    <Building2 className="h-5 w-5 shrink-0" />
                    <span>{formError}</span>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {t('contact.form.submitting')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t('contact.form.submit')}
                      <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};