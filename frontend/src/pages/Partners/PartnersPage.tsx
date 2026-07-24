import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, ExternalLink, Handshake, Award, Users, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@components/ui';
import { usePartners } from '@hooks/usePartners';
import { useLanguage } from '@providers/LanguageProvider';
import { Link } from 'react-router-dom';

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
      staggerChildren: 0.05,
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
// ===== MAIN PARTNERS PAGE =====
// ============================================
export function PartnersPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: partners, isLoading, error, refetch } = usePartners();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <>
      <Helmet>
        <title>{t('partners.seo.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('partners.seo.description')} />
      </Helmet>

      {/* ===== 1. HERO ===== */}
      <HeroSection />

      {/* ===== 2. PARTNERS GRID ===== */}
      <PartnersGrid partners={partners || []} language={language} isRTL={isRTL} />

      {/* ===== 3. CTA ===== */}
      <CTASection />
    </>
  );
}

// ============================================
// ===== LOADING STATE =====
// ============================================
const LoadingState = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-blue-200/30 border-t-blue-600 animate-spin dark:border-blue-800/30 dark:border-t-blue-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Handshake className="h-7 w-7 text-blue-600 dark:text-blue-400 animate-pulse" />
            </div>
          </div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
            {t('common.loading')}
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// ===== ERROR STATE =====
// ============================================
const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
        <Handshake className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {t('common.error')}
      </h2>
      <p className="text-slate-600 dark:text-slate-300">
        {t('common.tryAgain')}
      </p>
      <Button onClick={onRetry} className="bg-blue-600 text-white hover:bg-blue-700">
        {t('common.retry')}
      </Button>
    </div>
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
            <Handshake className="h-5 w-5 text-white/80" />
            <span className="text-sm font-medium text-white/90">
              {t('company.shortName')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {t('partners.hero.title')}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
          >
            {t('partners.hero.description')}
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
// ===== 2. PARTNERS GRID =====
// ============================================
const PartnersGrid = ({ partners, language, isRTL }: any) => {
  const { t } = useTranslation();

  if (!partners || partners.length === 0) {
    return (
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-lg text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Handshake className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('partners.empty.title')}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {t('partners.empty.description')}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <GradientBackground />
      
      <div className="container relative mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {partners.map((partner: any, index: number) => {
            const name = language === 'ar' ? partner.nameAr || partner.name : partner.name;
            const description = language === 'ar' ? partner.descriptionAr || partner.description : partner.description;
            
            return (
              <motion.div
                key={partner._id}
                variants={fadeUp(index * 0.03)}
                className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/50"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
                
                {/* Logo */}
                <div className="relative mb-4 flex h-28 w-full items-center justify-center">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={name}
                      className="max-h-full max-w-full object-contain transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
                      <Building2 className="h-12 w-12 text-blue-400/60 dark:text-blue-600/60" />
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-center text-lg font-bold text-slate-900 dark:text-white">
                  {name}
                </h3>

                {/* Description */}
                {description && (
                  <p className="mt-1 text-center text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {description}
                  </p>
                )}

                {/* Website Link */}
                {partner.website && (
                  <div className="relative mt-4 flex justify-center">
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ${
                        isRTL ? 'flex-row-reverse' : ''
                      }`}
                    >
                      {t('common.visitWebsite')}
                      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Partner Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 gap-4 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800/50 md:grid-cols-4"
        >
          {[
            { icon: Users, label: t('partners.stats.total'), value: partners.length },
            { icon: Award, label: t('partners.stats.experience'), value: '25+' },
            { icon: Globe, label: t('partners.stats.countries'), value: '15+' },
            { icon: Handshake, label: t('partners.stats.partnerships'), value: '50+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 3. CTA SECTION =====
// ============================================
const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 shadow-2xl shadow-blue-500/30 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 lg:p-12"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <div className="mb-4 flex justify-center lg:justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <Handshake className="h-7 w-7 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                {t('partners.cta.title')}
              </h2>
              <p className="mt-2 text-blue-100/80">
                {t('partners.cta.description')}
              </p>
            </div>
            <Link to="/contact" className="mt-6 lg:mt-0">
              <Button
                size="lg"
                className="bg-white text-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 dark:bg-white dark:text-blue-700"
              >
                <span className="flex items-center gap-2">
                  {t('partners.cta.button')}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};