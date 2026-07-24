import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui';
import { useServices } from '@hooks/useServices';
import { useProjects } from '@hooks/useProjects';
import { useTestimonials } from '@hooks/useTestimonials';
import { useLanguage } from '@providers/LanguageProvider';
import {
  Building2, Users, Award, Globe,
  ArrowRight, ArrowLeft, HardHat,
  TrendingUp, Shield, ChevronDown,
  Star, Calendar, MapPin, Briefcase,
  Phone, Mail, Send, CheckCircle,
} from 'lucide-react';

// ===== ICON MAP =====
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, Building2, Users, Globe
};

// ===== STATS DATA =====
const stats = [
  { value: '25+', key: 'statistics.yearsExperience', icon: Award },
  { value: '500+', key: 'statistics.projectsCompleted', icon: Building2 },
  { value: '200+', key: 'statistics.teamMembers', icon: Users },
  { value: '98%', key: 'statistics.clientSatisfaction', icon: Globe },
];

// ===== FLOATING SHAPES FOR HERO =====
const FloatingShape = ({ delay = 0, duration = 20, className = '' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.15 }}
    transition={{ delay, duration: 1 }}
    className={`absolute rounded-full ${className}`}
    style={{
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

// ===== ANIMATION VARIANTS =====
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.8 },
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ===== PARALLAX SECTION =====
const ParallaxSection = ({ children, className = '', speed = 0.2 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 80, speed * -80]);
  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

// ===== GRADIENT BACKGROUND COMPONENT =====
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
      <div className={`absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${
        isDark ? 'bg-blue-700/10' : 'bg-blue-300/20'
      }`} />
    </div>
  );
};

// ============================================
// ===== MAIN HOMEPAGE COMPONENT =====
// ============================================
export function HomePage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const { data: services, isLoading: sLoading } = useServices();
  const { data: projects, isLoading: pLoading } = useProjects({ limit: '4', isFeatured: 'true' });
  const { data: testimonials, isLoading: tLoading } = useTestimonials();

  const isLoading = sLoading || pLoading || tLoading;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>{t('hero.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('hero.description')} />
      </Helmet>

      {/* ===== 1. HERO SECTION ===== */}
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        primaryCtaText={t('hero.primaryCta')}
        primaryCtaLink="/contact"
        secondaryCtaText={t('hero.secondaryCta')}
        secondaryCtaLink="/projects"
      />

      {/* ===== 2. STATS ===== */}
      <StatsSection />

      {/* ===== 3. SERVICES ===== */}
      <ServicesSection services={services} Arrow={Arrow} />

      {/* ===== 4. PROJECTS ===== */}
      <ProjectsSection projects={projects} Arrow={Arrow} language={language} isRTL={isRTL} />

      {/* ===== 5. ABOUT ===== */}
      <AboutSection Arrow={Arrow} isRTL={isRTL} />

      {/* ===== 6. TESTIMONIALS ===== */}
      <TestimonialsSection testimonials={testimonials} language={language} />

      {/* ===== 7. CTA ===== */}
      <CTASection />

      {/* ===== 8. NEWSLETTER ===== */}
      <NewsletterSection />
    </>
  );
}

// ============================================
// ===== LOADING SPINNER =====
// ============================================
const LoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-blue-200/30 border-t-blue-600 animate-spin dark:border-blue-800/30 dark:border-t-blue-400" />
        <div className="absolute inset-0 flex items-center justify-center">
          <HardHat className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-pulse" />
        </div>
      </div>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
        Loading...
      </span>
    </div>
  </div>
);

// ============================================
// ===== 1. HERO SECTION =====
// ============================================
const HeroSection = ({
  title,
  subtitle,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-tl from-blue-300/20 to-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/10 blur-3xl dark:bg-blue-800/10" />
        
        {/* Floating Geometric Shapes */}
        <FloatingShape delay={0} duration={25} className="left-[10%] top-[20%] h-32 w-32 bg-blue-400/5" />
        <FloatingShape delay={3} duration={30} className="right-[15%] top-[30%] h-48 w-48 bg-blue-500/5" />
        <FloatingShape delay={6} duration={22} className="left-[5%] bottom-[25%] h-40 w-40 bg-blue-300/5" />
        <FloatingShape delay={9} duration={28} className="right-[10%] bottom-[20%] h-56 w-56 bg-blue-400/5" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-200/50 bg-white/60 px-5 py-2 backdrop-blur-sm dark:border-blue-800/30 dark:bg-slate-800/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {subtitle}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-white">
              {title}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl"
          >
            {description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to={primaryCtaLink}>
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 dark:from-blue-500 dark:to-blue-600"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {primaryCtaText}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link to={secondaryCtaLink}>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-blue-200 bg-white/50 text-slate-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:bg-white/80 dark:border-blue-800/30 dark:bg-slate-800/30 dark:text-slate-200 dark:hover:border-blue-700/50 dark:hover:bg-slate-700/30"
                >
                  <span className="flex items-center gap-2">
                    {secondaryCtaText}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
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
// ===== 2. STATS SECTION =====
// ============================================
const StatsSection = () => {
  return (
    <section className="relative z-20 -mt-16 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-8 shadow-2xl shadow-blue-500/30 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 lg:p-12"
        >
          {/* Background Decor */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="text-center"
              >
                <div className="mb-3 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-blue-200 backdrop-blur-sm ring-1 ring-white/20">
                    <stat.icon className="h-7 w-7" />
                  </div>
                </div>
                <div className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-blue-100/70">
                  {useTranslation().t(stat.key)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 3. SERVICES SECTION =====
// ============================================
const ServicesSection = ({ services, Arrow }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <GradientBackground variant="light" />
      
      <div className="container relative mx-auto px-4">
        <SectionHeader
          title={t('services.title')}
          subtitle={t('services.subtitle')}
          description={t('services.description')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {services?.slice(0, 4).map((service, i) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Building2;
            return (
              <motion.div key={service.id} variants={fadeUp(i * 0.05)}>
                <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/50 dark:backdrop-blur-sm">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Icon */}
                  <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 transition-colors duration-300 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-400">
                    <IconComponent className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="relative mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {language === 'ar' ? service.titleAr : service.title}
                  </h3>
                  <p className="relative text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {language === 'ar' 
                      ? service.shortDescriptionAr || service.descriptionAr 
                      : service.shortDescription || service.description}
                  </p>
                  
                  <Link to={`/services/${service.slug}`} className="relative mt-4 inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    {t('common.learnMore')}
                    <Arrow className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link to="/services">
            <Button
              variant="outline"
              className="group border-blue-200 bg-white/50 hover:border-blue-300 hover:bg-white dark:border-blue-800/30 dark:bg-slate-800/30 dark:hover:border-blue-700/50"
            >
              <span className="flex items-center gap-2">
                {t('services.viewAll')}
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 4. PROJECTS SECTION =====
// ============================================
const ProjectsSection = ({ projects, Arrow, language, isRTL }) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50/50 dark:from-slate-900 dark:to-slate-800/50">
      <div className="container relative mx-auto px-4">
        <SectionHeader
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
          description={t('projects.description')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {projects?.slice(0, 4).map((project, i) => (
            <motion.div key={project.id} variants={fadeUp(i * 0.05)}>
              <Link to={`/projects/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/50">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.thumbnail || project.images?.[0] || ''}
                      alt={language === 'ar' ? project.titleAr : project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      <span className="inline-block rounded-full bg-blue-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {language === 'ar' ? project.categoryAr : project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-slate-900 line-clamp-1 dark:text-white">
                      {language === 'ar' ? project.titleAr : project.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 line-clamp-2 dark:text-slate-300">
                      {language === 'ar' ? project.shortDescriptionAr : project.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link to="/projects">
            <Button
              variant="outline"
              className="group border-blue-200 bg-white/50 hover:border-blue-300 hover:bg-white dark:border-blue-800/30 dark:bg-slate-800/30 dark:hover:border-blue-700/50"
            >
              <span className="flex items-center gap-2">
                {t('projects.viewAll')}
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 5. ABOUT SECTION =====
// ============================================
const AboutSection = ({ Arrow, isRTL }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <ParallaxSection speed={0.15}>
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-600/10 blur-3xl" />

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
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
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
                    <HardHat className="h-6 w-6 lg:h-7 lg:w-7" />
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
              className="text-white"
            >
              <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
                <span className="h-px w-8 bg-blue-300/50" />
                {t('about.story.subtitle')}
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {t('about.story.title')}
              </h2>
              <div className="mt-4 space-y-3 text-blue-100/80 leading-relaxed">
                <p>{t('about.story.paragraph1')}</p>
                <p>{t('about.story.paragraph2')}</p>
              </div>

              {/* Value Tags */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { icon: HardHat, label: t('about.values.quality.title') },
                  { icon: Shield, label: t('about.values.safety.title') },
                  { icon: TrendingUp, label: t('about.values.excellence.title') },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/10">
                    <item.icon className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-100">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button className="bg-white text-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 dark:bg-white dark:text-blue-700">
                    <span className="flex items-center gap-2">
                      {t('common.learnMore')}
                      <Arrow className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};

// ============================================
// ===== 6. TESTIMONIALS SECTION =====
// ============================================
const TestimonialsSection = ({ testimonials, language }) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <GradientBackground variant="light" />

      <div className="container relative mx-auto px-4">
        <SectionHeader
          title={t('testimonials.title')}
          subtitle={t('testimonials.hero.title')}
          description={t('testimonials.seo.description')}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials?.slice(0, 3).map((testimonial, i) => (
            <motion.div key={testimonial._id || testimonial.id} variants={fadeUp(i * 0.05)}>
              <div className="group relative rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/50 dark:backdrop-blur-sm">
                {/* Quote Icon */}
                <div className="absolute -top-3 -right-3 text-4xl text-blue-200/30 dark:text-blue-800/30">
                  "
                </div>

                {/* Rating */}
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < (testimonial.rating || 5) ? 'fill-blue-500 text-blue-500' : 'text-slate-300 dark:text-slate-600'}`} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-4">
                  "{language === 'ar' ? testimonial.contentAr || testimonial.content : testimonial.content}"
                </p>

                {/* Author */}
                <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-400">
                    <span className="text-sm font-bold">
                      {(language === 'ar' ? testimonial.nameAr || testimonial.name : testimonial.name)
                        ?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {language === 'ar' ? testimonial.nameAr || testimonial.name : testimonial.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {language === 'ar' ? testimonial.roleAr || testimonial.position || '' : testimonial.position || ''}
                      {testimonial.company && ` • ${language === 'ar' ? testimonial.companyAr || testimonial.company : testimonial.company}`}
                    </div>
                  </div>
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
// ===== 7. CTA SECTION =====
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
                  <Send className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 8. NEWSLETTER SECTION =====
// ============================================
const NewsletterSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-16 lg:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Send className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            {t('newsletter.title')}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {t('newsletter.description')}
          </p>

          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <Button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              {t('newsletter.subscribe')}
            </Button>
          </form>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            {t('newsletter.privacy')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== SECTION HEADER COMPONENT =====
// ============================================
const SectionHeader = ({ title, subtitle, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      {subtitle && (
        <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {subtitle}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </motion.div>
  );
};

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(5deg); }
  }
`;
document.head.appendChild(style);