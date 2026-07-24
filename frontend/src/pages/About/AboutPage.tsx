import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Award, Users, Building2, Shield,
  ArrowRight, ArrowLeft, Loader2, CheckCircle,
  Clock, MapPin, Phone, Mail, Globe, Heart,
  Star, TrendingUp, Briefcase, Calendar,
} from 'lucide-react';
import { Button } from '@components/ui';
import { useAbout } from '@hooks/useAbout';
import { useLanguage } from '@providers/LanguageProvider';

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
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
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

// ===== GRADIENT BACKGROUND =====
const GradientBackground = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const isDark = variant === 'dark';
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute -left-1/4 -top-1/4 h-2/3 w-2/3 rounded-full blur-3xl ${
        isDark ? 'bg-blue-900/30' : 'bg-blue-200/40'
      }`} />
      <div className={`absolute -bottom-1/4 -right-1/4 h-2/3 w-2/3 rounded-full blur-3xl ${
        isDark ? 'bg-blue-800/20' : 'bg-blue-100/50'
      }`} />
      <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl bg-blue-200/20 dark:bg-blue-800/10" />
    </div>
  );
};

// ===== PARALLAX SECTION =====
const ParallaxSection = ({ children, className = '', speed = 0.15 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 80, speed * -80]);
  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

// ============================================
// ===== TIMELINE DATA =====
// ============================================
const timelineItems = [
  { year: '1998', key: 'about.timeline.items.1998' },
  { year: '2005', key: 'about.timeline.items.2005' },
  { year: '2010', key: 'about.timeline.items.2010' },
  { year: '2015', key: 'about.timeline.items.2015' },
  { year: '2020', key: 'about.timeline.items.2020' },
  { year: '2024', key: 'about.timeline.items.2024' },
];

// ============================================
// ===== MAIN ABOUT PAGE =====
// ============================================
export function AboutPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const { isLoading, error } = useAbout();

  const values = [
    {
      icon: Target,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description'),
    },
    {
      icon: Shield,
      title: t('about.values.safety.title'),
      description: t('about.values.safety.description'),
    },
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description'),
    },
    {
      icon: Users,
      title: t('about.values.integrity.title'),
      description: t('about.values.integrity.description'),
    },
  ];

  const stats = [
    { value: '25+', labelKey: 'statistics.yearsExperience', icon: Clock },
    { value: '500+', labelKey: 'statistics.projectsCompleted', icon: Building2 },
    { value: '200+', labelKey: 'statistics.teamMembers', icon: Users },
    { value: '98%', labelKey: 'statistics.clientSatisfaction', icon: Star },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <>
      <Helmet>
        <title>{t('about.seo.title')}</title>
        <meta name="description" content={t('about.seo.description')} />
      </Helmet>

      {/* ===== 1. HERO ===== */}
      <HeroSection />

      {/* ===== 2. COMPANY STORY ===== */}
      <StorySection Arrow={Arrow} isRTL={isRTL} />

      {/* ===== 3. MISSION & VISION ===== */}
      <MissionVisionSection />

      {/* ===== 4. STATISTICS ===== */}
      <StatisticsSection stats={stats} />

      {/* ===== 5. VALUES ===== */}
      <ValuesSection values={values} />

      {/* ===== 6. TIMELINE ===== */}
      <TimelineSection />

      {/* ===== 7. CTA ===== */}
      <CTASection Arrow={Arrow} />
    </>
  );
}

// ============================================
// ===== LOADING SPINNER =====
// ============================================
const LoadingSpinner = () => (
  <div className="flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-blue-200/30 border-t-blue-600 animate-spin dark:border-blue-800/30 dark:border-t-blue-400" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Building2 className="h-7 w-7 text-blue-600 dark:text-blue-400 animate-pulse" />
        </div>
      </div>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
        Loading...
      </span>
    </div>
  </div>
);

// ============================================
// ===== ERROR STATE =====
// ============================================
const ErrorState = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
        <Shield className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {t('common.error')}
      </h2>
      <p className="text-slate-600 dark:text-slate-300">
        {t('common.tryAgain')}
      </p>
    </div>
  );
};

// ============================================
// ===== 1. HERO SECTION =====
// ============================================
const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-tl from-blue-300/20 to-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/10 blur-3xl dark:bg-blue-800/10" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

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
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-200/50 bg-white/60 px-5 py-2 backdrop-blur-sm dark:border-blue-800/30 dark:bg-slate-800/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('company.tagline')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-white">
              {t('about.hero.title')}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl"
          >
            {t('about.hero.description')}
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
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Scroll
          </span>
          <div className="relative h-12 w-6 rounded-full border-2 border-slate-300/50 dark:border-slate-600/50">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1 h-3 w-1 -translate-x-1/2 rounded-full bg-blue-500 dark:bg-blue-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// ===== 2. STORY SECTION =====
// ============================================
const StorySection = ({ Arrow, isRTL }) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <GradientBackground variant="light" />
      
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80"
                alt="Rawafid Al Omran"
                className="h-[400px] w-full object-cover lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 rounded-xl bg-white p-4 shadow-xl dark:bg-slate-800 lg:-bottom-8 lg:-right-8 lg:p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 lg:h-14 lg:w-14">
                  <Building2 className="h-6 w-6 lg:h-7 lg:w-7" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white lg:text-2xl">25+</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">{t('statistics.yearsExperience')}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={isRTL ? 'text-right' : 'text-left'}
          >
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              <span className="h-px w-8 bg-blue-300/50" />
              {t('about.story.subtitle')}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
              {t('about.story.title')}
            </h2>
            <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="text-lg">{t('about.story.paragraph1')}</p>
              <p className="text-lg">{t('about.story.paragraph2')}</p>
              <p className="text-lg">{t('about.story.paragraph3')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ===== 3. MISSION & VISION =====
// ============================================
const MissionVisionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-800/50 dark:to-slate-900">
      <div className="container relative mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/50 dark:backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
            
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 transition-all duration-500 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-400">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                {t('about.mission.title')}
              </h3>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {t('about.mission.description')}
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/50 dark:backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
            
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 transition-all duration-500 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-400">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                {t('about.vision.title')}
              </h3>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {t('about.vision.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ===== 4. STATISTICS SECTION =====
// ============================================
const StatisticsSection = ({ stats }) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <GradientBackground variant="light" />
      
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {t('about.statistics.subtitle')}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            {t('about.statistics.title')}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            {t('about.statistics.description')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              variants={fadeUp(i * 0.05)}
              className="group relative overflow-hidden rounded-xl bg-white p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/50 dark:backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
              
              <div className="relative">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 transition-all duration-500 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-400">
                    <stat.icon className="h-7 w-7" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {t(stat.labelKey)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 5. VALUES SECTION =====
// ============================================
const ValuesSection = ({ values }) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            {t('about.values.subtitle')}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            {t('about.values.title')}
          </h2>
          <p className="mt-3 text-blue-100/80">
            {t('about.values.description')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              variants={fadeUp(i * 0.05)}
              className="group relative overflow-hidden rounded-xl bg-white/10 p-8 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:bg-white/20 hover:border-white/20"
            >
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-blue-200 transition-all duration-500 group-hover:bg-white/20 group-hover:text-white">
                  <value.icon className="h-7 w-7" />
                </div>
                <h4 className="mb-3 text-xl font-bold text-white">
                  {value.title}
                </h4>
                <p className="text-sm leading-relaxed text-blue-100/80">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 6. TIMELINE SECTION =====
// ============================================
const TimelineSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <GradientBackground variant="light" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {t('about.timeline.subtitle')}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            {t('about.timeline.title')}
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 dark:from-blue-800 dark:via-blue-600 dark:to-blue-800" />

          <div className="space-y-12">
            {timelineItems.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`relative flex items-center gap-8 ${
                  i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-slate-800/50 dark:backdrop-blur-sm ${
                    i % 2 === 0 ? 'mr-auto' : 'ml-auto'
                  }`}>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {item.year}
                    </span>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {t(item.key)}
                    </p>
                  </div>
                </div>

                {/* Dot */}
                <div className="relative z-10 flex h-6 w-6 items-center justify-center">
                  <div className="h-6 w-6 rounded-full border-4 border-blue-600 bg-white dark:border-blue-400 dark:bg-slate-900">
                    <div className="absolute inset-0 rounded-full bg-blue-600/20 animate-ping dark:bg-blue-400/20" />
                  </div>
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ===== 7. CTA SECTION =====
// ============================================
const CTASection = ({ Arrow }) => {
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
              <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                {t('cta.title')}
              </h2>
              <p className="mt-2 text-blue-100/80">
                {t('cta.description')}
              </p>
            </div>
            <Link to="/contact" className="mt-6 lg:mt-0">
              <Button
                size="lg"
                className="bg-white text-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 dark:bg-white dark:text-blue-700"
              >
                <span className="flex items-center gap-2">
                  {t('cta.button')}
                  <Arrow className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};