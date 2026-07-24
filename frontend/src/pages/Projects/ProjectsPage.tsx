import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Building2, ArrowUpRight, 
  Search, Filter, Grid3x3, LayoutList,
  ChevronDown, X, Loader2
} from 'lucide-react';
import { Button } from '@components/ui';
import { useProjects } from '@hooks/useProjects';
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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
      duration: 0.6,
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
// ===== MAIN PROJECTS PAGE =====
// ============================================
export function ProjectsPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: projects, isLoading, error, refetch } = useProjects();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = projects 
    ? ['all', ...new Set(projects.map(p => language === 'ar' ? p.categoryAr : p.category))]
    : ['all'];

  // Filter projects
  const filteredProjects = projects?.filter(project => {
    const title = language === 'ar' ? project.titleAr : project.title;
    const category = language === 'ar' ? project.categoryAr : project.category;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <>
      <Helmet>
        <title>{t('projects.seo.title')}</title>
        <meta name="description" content={t('projects.seo.description')} />
      </Helmet>

      {/* ===== 1. HERO ===== */}
      <HeroSection />

      {/* ===== 2. FILTERS & SEARCH ===== */}
      <FiltersSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalProjects={filteredProjects?.length || 0}
      />

      {/* ===== 3. PROJECTS GRID ===== */}
      <ProjectsGrid 
        projects={filteredProjects || []} 
        viewMode={viewMode}
        language={language}
      />

      {/* ===== 4. CTA ===== */}
      <CTASection />
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
          Loading projects...
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
      <Button onClick={onRetry} className="bg-blue-600 text-white hover:bg-blue-700">
        Try Again
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
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-300" />
            </span>
            <span className="text-sm font-medium text-white/90">
              {t('projects.subtitle')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {t('projects.hero.title')}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
          >
            {t('projects.hero.description')}
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
// ===== 2. FILTERS SECTION =====
// ============================================
const FiltersSection = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  viewMode,
  setViewMode,
  totalProjects,
}: any) => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="sticky top-0 z-30 border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t('projects.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* Filters & Controls */}
          <div className="flex items-center gap-3">
            {/* Category Filter - Desktop */}
            <div className="hidden items-center gap-2 md:flex">
              {categories.map((cat: string) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? t('projects.allCategories') : cat}
                </button>
              ))}
            </div>

            {/* Category Filter - Mobile */}
            <div className="relative md:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <Filter className="h-4 w-4" />
                {selectedCategory === 'all' ? t('projects.allCategories') : selectedCategory}
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                  {categories.map((cat: string) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 ${
                        selectedCategory === cat ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {cat === 'all' ? t('projects.allCategories') : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-500 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-500 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>

            {/* Results Count */}
            <span className="hidden text-sm text-slate-500 dark:text-slate-400 lg:block">
              {totalProjects} {t('projects.results')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ===== 3. PROJECTS GRID =====
// ============================================
const ProjectsGrid = ({ projects, viewMode, language }: any) => {
  const { t } = useTranslation();

  if (projects.length === 0) {
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
                <Building2 className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('projects.noResults')}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {t('projects.noResultsDescription')}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {projects.map((project: any, index: number) => {
            const title = language === 'ar' ? project.titleAr : project.title;
            const category = language === 'ar' ? project.categoryAr : project.category;
            const location = language === 'ar' ? project.locationAr : project.location;
            const isFeatured = index === 0 || project.isFeatured;

            return (
              <motion.div
                key={project.id}
                variants={fadeUp(index * 0.03)}
                className={viewMode === 'grid' && isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <Link to={`/projects/${project.slug}`} className="group block">
                  <div
                    className={`relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-slate-800/50 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === 'grid'
                          ? 'aspect-[4/3]'
                          : 'aspect-[16/9] md:aspect-[4/3] md:w-2/5'
                      }`}
                    >
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
                          <Building2 className="h-16 w-16 text-blue-300 dark:text-blue-700" />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      {/* View Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 backdrop-blur-sm">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute left-4 top-4">
                        <span className="inline-block rounded-full bg-blue-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {category}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {isFeatured && (
                        <div className="absolute right-4 top-4">
                          <span className="inline-block rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`p-6 ${
                      viewMode === 'list' ? 'flex-1' : ''
                    }`}>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                        {language === 'ar' ? project.shortDescriptionAr : project.shortDescription}
                      </p>
                      
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        {location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {location}
                          </span>
                        )}
                        {project.year && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {project.year}
                          </span>
                        )}
                      </div>

                      <div className="mt-4">
                        <span className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                          {t('common.viewDetails')}
                          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// ===== 4. CTA SECTION =====
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
                {t('projects.cta.title')}
              </h2>
              <p className="mt-2 text-blue-100/80">
                {t('projects.cta.description')}
              </p>
            </div>
            <Link to="/contact" className="mt-6 lg:mt-0">
              <Button
                size="lg"
                className="bg-white text-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 dark:bg-white dark:text-blue-700"
              >
                <span className="flex items-center gap-2">
                  {t('projects.cta.button')}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};