import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import {
  MapPin, Calendar, Building2, ArrowUpRight, ArrowLeft,
  Users, Ruler, Clock, CheckCircle, ChevronLeft, ChevronRight,
  Share2, Bookmark, Eye, Heart, Download, Printer,
  Phone, Mail, MessageCircle, Award, Shield, TrendingUp,
  Loader2, X, ZoomIn, Maximize2
} from 'lucide-react';
import { Button } from '@components/ui';
import { useProject, useProjects } from '@hooks/useProjects';
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
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
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

// ============================================
// ===== MAIN PROJECT DETAIL PAGE =====
// ============================================
export function ProjectDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { data: project, isLoading, error, refetch } = useProject(slug);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !project) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  const title = language === 'ar' ? project.titleAr : project.title;
  const category = language === 'ar' ? project.categoryAr : project.category;
  const location = language === 'ar' ? project.locationAr : project.location;
  const description = language === 'ar' ? project.descriptionAr : project.description;
  const images = project.images || [project.thumbnail].filter(Boolean);

  const stats = [
    { icon: Ruler, label: t('project.area'), value: project.area || '2,500 m²' },
    { icon: Clock, label: t('project.duration'), value: project.duration || '18 months' },
    { icon: Users, label: t('project.team'), value: project.teamSize || '50+' },
    { icon: Building2, label: t('project.type'), value: category },
  ];

  return (
    <>
      <Helmet>
        <title>{title} | Rawafid Al Omran</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* ===== 1. HERO WITH IMAGE ===== */}
      <HeroSection 
        project={project} 
        title={title}
        category={category}
        location={location}
        images={images}
        setGalleryIndex={setGalleryIndex}
        setIsGalleryOpen={setIsGalleryOpen}
      />

      {/* ===== 2. PROJECT INFO BAR ===== */}
      <InfoBar 
        project={project}
        stats={stats}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />

      {/* ===== 3. CONTENT ===== */}
      <ContentSection 
        description={description}
        project={project}
        language={language}
      />

      {/* ===== 4. GALLERY ===== */}
      <GallerySection 
        images={images}
        setIsGalleryOpen={setIsGalleryOpen}
        setGalleryIndex={setGalleryIndex}
      />

      {/* ===== 5. RELATED PROJECTS ===== */}
      <RelatedProjects />

      {/* ===== 6. CTA ===== */}
      <CTASection />

      {/* ===== 7. GALLERY MODAL ===== */}
      <GalleryModal
        isOpen={isGalleryOpen}
        setIsOpen={setIsGalleryOpen}
        images={images}
        currentIndex={galleryIndex}
        setCurrentIndex={setGalleryIndex}
      />
    </>
  );
}

// ============================================
// ===== LOADING STATE =====
// ============================================
const LoadingState = () => (
  <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-blue-200/30 border-t-blue-600 animate-spin dark:border-blue-800/30 dark:border-t-blue-400" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="h-7 w-7 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>
        </div>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
          Loading project...
        </span>
      </div>
    </div>
  </div>
);

// ============================================
// ===== ERROR STATE =====
// ============================================
const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
        <Building2 className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {t('common.error')}
      </h2>
      <p className="text-slate-600 dark:text-slate-300">
        {t('common.tryAgain')}
      </p>
      <div className="flex gap-4">
        <Button onClick={onRetry} className="bg-blue-600 text-white hover:bg-blue-700">
          Try Again
        </Button>
        <Button variant="outline" onClick={() => navigate('/projects')}>
          Back to Projects
        </Button>
      </div>
    </div>
  );
};

// ============================================
// ===== 1. HERO SECTION =====
// ============================================
const HeroSection = ({ 
  project, title, category, location, images, 
  setGalleryIndex, setIsGalleryOpen 
}: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ChevronRight : ChevronLeft;

  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img
          src={project.thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
          >
            <Arrow className="h-4 w-4" />
            <span className="text-sm font-medium">{t('projects.back')}</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-3xl"
        >
          {/* Category */}
          <span className="inline-block rounded-full bg-blue-600/90 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            {category}
          </span>

          {/* Title */}
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Location & Year */}
          <div className="mt-4 flex flex-wrap items-center gap-6 text-white/70">
            {location && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {location}
              </span>
            )}
            {project.year && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {project.year}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {project.views || 0} {t('project.views')}
            </span>
          </div>

          {/* Gallery Preview */}
          {images.length > 1 && (
            <div className="mt-6 flex gap-2">
              {images.slice(0, 4).map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                    setGalleryIndex(i);
                    setIsGalleryOpen(true);
                  }}
                  className={`relative overflow-hidden rounded-lg border-2 border-white/20 transition-all hover:border-white/50 ${
                    i === 0 ? 'h-20 w-28' : 'h-16 w-20'
                  }`}
                >
                  <img src={img} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
                  {i === 3 && images.length > 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm font-medium">
                      +{images.length - 4}
                    </div>
                  )}
                </button>
              ))}
              {images.length > 1 && (
                <button
                  onClick={() => {
                    setGalleryIndex(0);
                    setIsGalleryOpen(true);
                  }}
                  className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-white/20 text-white transition-all hover:border-white/50 hover:bg-white/10"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 2. INFO BAR =====
// ============================================
const InfoBar = ({ 
  stats, isBookmarked, setIsBookmarked, 
  isLiked, setIsLiked 
}: any) => {
  const { t } = useTranslation();

  return (
    <section className="relative z-20 -mt-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800 lg:p-8"
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center gap-4 border-t border-slate-100 pt-6 dark:border-slate-700">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
              {isBookmarked ? t('project.saved') : t('project.save')}
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              {isLiked ? t('project.liked') : t('project.like')}
            </button>
            <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
              <Share2 className="h-4 w-4" />
              {t('project.share')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 3. CONTENT SECTION =====
// ============================================
const ContentSection = ({ description, project, language }: any) => {
  const { t } = useTranslation();

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('project.overview')}
            </h2>
            <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              {description.split('\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t('project.features')}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {project.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Quick Contact */}
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('project.quickContact')}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {t('project.quickContactDesc')}
              </p>
              <div className="mt-4 space-y-3">
                <Link to="/contact">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    <Phone className="mr-2 h-4 w-4" />
                    {t('project.contactUs')}
                  </Button>
                </Link>
                <Link to="https://wa.me/966500000000" target="_blank">
                  <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900/20">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t('project.whatsapp')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Project Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800/50">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t('project.tags')}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ===== 4. GALLERY SECTION =====
// ============================================
const GallerySection = ({ images, setIsGalleryOpen, setGalleryIndex }: any) => {
  const { t } = useTranslation();

  if (images.length <= 1) return null;

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50/50 dark:from-slate-900 dark:to-slate-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('project.gallery')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            {t('project.galleryDescription')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {images.map((img: string, i: number) => (
            <motion.div
              key={i}
              variants={fadeUp(i * 0.03)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              onClick={() => {
                setGalleryIndex(i);
                setIsGalleryOpen(true);
              }}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ aspectRatio: i === 0 ? '16/10' : '4/3' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white backdrop-blur-sm">
                  <ZoomIn className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => {
              setGalleryIndex(0);
              setIsGalleryOpen(true);
            }}
            className="inline-flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('project.viewAllPhotos')}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 5. RELATED PROJECTS =====
// ============================================
const RelatedProjects = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Mock related projects - replace with actual data
  const relatedProjects = [
    { id: 1, title: 'Modern Villa Complex', category: 'Residential', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80', slug: 'modern-villa' },
    { id: 2, title: 'Commercial Tower', category: 'Commercial', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', slug: 'commercial-tower' },
    { id: 3, title: 'Hospitality Resort', category: 'Hospitality', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', slug: 'hospitality-resort' },
  ];

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('project.relatedProjects')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            {t('project.relatedProjectsDesc')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {relatedProjects.map((project, i) => (
            <motion.div key={project.id} variants={fadeUp(i * 0.05)}>
              <Link to={`/projects/${project.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/50">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white backdrop-blur-sm">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="absolute left-3 top-3">
                      <span className="inline-block rounded-full bg-blue-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 6. CTA SECTION =====
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
                {t('project.cta.title')}
              </h2>
              <p className="mt-2 text-blue-100/80">
                {t('project.cta.description')}
              </p>
            </div>
            <Link to="/contact" className="mt-6 lg:mt-0">
              <Button
                size="lg"
                className="bg-white text-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 dark:bg-white dark:text-blue-700"
              >
                <span className="flex items-center gap-2">
                  {t('project.cta.button')}
                  <Phone className="h-4 w-4" />
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
// ===== 7. GALLERY MODAL =====
// ============================================
const GalleryModal = ({ 
  isOpen, setIsOpen, images, currentIndex, setCurrentIndex 
}: any) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const PrevArrow = isRTL ? ChevronRight : ChevronLeft;
  const NextArrow = isRTL ? ChevronLeft : ChevronRight;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev: number) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev: number) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, setCurrentIndex, setIsOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={() => setIsOpen(false)}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Image Counter */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main Image */}
      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev: number) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <PrevArrow className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev: number) => (prev < images.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <NextArrow className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto px-4 py-2">
        {images.map((img: string, i: number) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
            }}
            className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
              i === currentIndex ? 'border-white' : 'border-white/30 hover:border-white/60'
            }`}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};