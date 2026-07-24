import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  HelpCircle, Search, RefreshCw, SearchX, MessageCircle,
  ChevronDown, ChevronUp, ArrowRight, X
} from 'lucide-react';
import { Button } from '@components/ui';
import { useLanguage } from '@providers/LanguageProvider';
import { useFaqs } from '@hooks/useFaqs';
import type { Faq } from '@services/api/types';

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
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

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
// ===== HELPER FUNCTIONS =====
// ============================================
function mapFaqToItem(faq: Faq, language: string) {
  return {
    id: faq._id,
    question: language === 'ar' ? faq.questionAr || faq.question : faq.question,
    answer: language === 'ar' ? faq.answerAr || faq.answer : faq.answer,
  };
}

function getCategoryKey(category: string | undefined, language: string): string {
  return language === 'ar' ? category || 'uncategorized' : category || 'Uncategorized';
}

function getCategoryLabel(category: string | undefined, categoryAr: string | undefined, language: string): string {
  return language === 'ar' ? categoryAr || category || 'غير مصنف' : category || 'Uncategorized';
}

// ============================================
// ===== MAIN FAQ PAGE =====
// ============================================
export function FAQPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: faqs = [], isLoading, error, refetch } = useFaqs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, { label: string; items: any[] }>();
    for (const faq of faqs) {
      const key = getCategoryKey(faq.category, language);
      const label = getCategoryLabel(faq.category, faq.categoryAr, language);
      if (!map.has(key)) map.set(key, { label, items: [] });
      map.get(key)!.items.push(mapFaqToItem(faq, language));
    }
    return map;
  }, [faqs, language]);

  const categoryKeys = useMemo(() => Array.from(grouped.keys()), [grouped]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return null;
    const q = searchQuery.toLowerCase();
    return Array.from(grouped.values())
      .flatMap((g) => g.items)
      .filter((item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q));
  }, [grouped, searchQuery]);

  if (isLoading) {
    return <LoadingState heroContent={<HeroContent />} />;
  }

  if (error) {
    return <ErrorState heroContent={<HeroContent />} onRetry={() => refetch()} />;
  }

  if (faqs.length === 0) {
    return <EmptyState heroContent={<HeroContent />} />;
  }

  return (
    <>
      <Helmet>
        <title>{t('faq.seo.title')}</title>
        <meta name="description" content={t('faq.seo.description')} />
      </Helmet>

      <HeroContent />

      {/* Search + Filters */}
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryKeys={categoryKeys}
        grouped={grouped}
        isRTL={isRTL}
      />

      {/* FAQ Content */}
      <FAQContent
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        filteredItems={filteredItems}
        grouped={grouped}
        categoryKeys={categoryKeys}
        isRTL={isRTL}
      />

      {/* CTA */}
      <CTASection />
    </>
  );
}

// ============================================
// ===== HERO CONTENT =====
// ============================================
const HeroContent = () => {
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
            <HelpCircle className="h-5 w-5 text-white/80" />
            <span className="text-sm font-medium text-white/90">
              {t('faq.hero.badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {t('faq.hero.title')}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
          >
            {t('faq.hero.description')}
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
// ===== LOADING STATE =====
// ============================================
const LoadingState = ({ heroContent }: { heroContent: React.ReactNode }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {heroContent}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// ===== ERROR STATE =====
// ============================================
const ErrorState = ({ heroContent, onRetry }: { heroContent: React.ReactNode; onRetry: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {heroContent}
      <section className="flex min-h-[400px] items-center justify-center px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <HelpCircle className="h-10 w-10" />
            </div>
          </div>
          <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
            {t('faq.error')}
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {t('common.tryAgain')}
          </p>
          <Button onClick={onRetry} className="mt-6 bg-blue-600 text-white hover:bg-blue-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('faq.retry')}
          </Button>
        </div>
      </section>
    </div>
  );
};

// ============================================
// ===== EMPTY STATE =====
// ============================================
const EmptyState = ({ heroContent }: { heroContent: React.ReactNode }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {heroContent}
      <section className="flex min-h-[400px] items-center justify-center px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <MessageCircle className="h-10 w-10" />
            </div>
          </div>
          <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
            {t('faq.empty.title')}
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {t('faq.empty.description')}
          </p>
        </div>
      </section>
    </div>
  );
};

// ============================================
// ===== SEARCH & FILTERS =====
// ============================================
const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categoryKeys,
  grouped,
  isRTL,
}: any) => {
  const { t } = useTranslation();

  return (
    <section className="sticky top-0 z-30 border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/80">
      <div className="container mx-auto px-4 py-6">
        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('faq.searchPlaceholder')}
              className={`h-12 w-full rounded-lg border border-slate-200 bg-white pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 ${
                isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              !selectedCategory
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {t('faq.all')}
          </button>
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                selectedCategory === key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {grouped.get(key)!.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
          {searchQuery ? (
            <>
              {filteredItems?.length || 0} {t('faq.results')}
            </>
          ) : selectedCategory ? (
            <>
              {grouped.get(selectedCategory)?.items.length || 0} {t('faq.questions')}
            </>
          ) : (
            <>
              {faqs?.length || 0} {t('faq.totalQuestions')}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================
// ===== FAQ CONTENT =====
// ============================================
const FAQContent = ({
  searchQuery,
  selectedCategory,
  filteredItems,
  grouped,
  categoryKeys,
  isRTL,
}: any) => {
  const { t } = useTranslation();

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {searchQuery ? (
            // Search Results
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredItems && filteredItems.length > 0 ? (
                <div className="space-y-3">
                  {filteredItems.map((item: any, i: number) => (
                    <FAQItem key={item.id || i} item={item} isRTL={isRTL} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    <SearchX className="h-10 w-10" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                    {t('faq.noResults')}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">
                    {t('faq.noResultsDescription')}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSearchQuery('')}
                  >
                    {t('faq.clearSearch')}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : selectedCategory ? (
            // Category Filtered
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {grouped.get(selectedCategory)!.label}
                </h2>
              </div>
              <div className="space-y-3">
                {grouped.get(selectedCategory)!.items.map((item: any, i: number) => (
                  <FAQItem key={item.id || i} item={item} isRTL={isRTL} />
                ))}
              </div>
            </motion.div>
          ) : (
            // All Categories
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-10"
            >
              {categoryKeys.map((key) => (
                <motion.div
                  key={key}
                  variants={fadeUp(0)}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {grouped.get(key)!.label}
                    </h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({grouped.get(key)!.items.length})
                    </span>
                  </div>
                  {grouped.get(key)!.items.map((item: any, i: number) => (
                    <FAQItem key={item.id || i} item={item} isRTL={isRTL} />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================
// ===== SINGLE FAQ ITEM =====
// ============================================
const FAQItem = ({ item, isRTL }: { item: any; isRTL: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30 ${
          isOpen ? 'bg-slate-50 dark:bg-slate-700/30' : ''
        }`}
      >
        <span className={`text-sm font-semibold text-slate-900 dark:text-white ${
          isRTL ? 'text-right' : 'text-left'
        }`}>
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className={`px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 ${
          isRTL ? 'text-right' : 'text-left'
        }`}>
          {item.answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// ===== CTA SECTION =====
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
                  <MessageCircle className="h-7 w-7 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                {t('faq.cta.title')}
              </h2>
              <p className="mt-2 text-blue-100/80">
                {t('faq.cta.description')}
              </p>
            </div>
            <Link to="/contact" className="mt-6 lg:mt-0">
              <Button
                size="lg"
                className="bg-white text-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 dark:bg-white dark:text-blue-700"
              >
                <span className="flex items-center gap-2">
                  {t('faq.cta.button')}
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