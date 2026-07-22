import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HelpCircle, Search, RefreshCw, SearchX, MessageCircle } from 'lucide-react';
import { FAQAccordion, type FAQItem } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { useFaqs } from '@hooks/useFaqs';
import type { Faq } from '@services/api/types';

function mapFaqToItem(faq: Faq, language: string): FAQItem {
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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const chipVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export function FAQPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const { data: faqs = [], isLoading, error, refetch } = useFaqs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, { label: string; items: FAQItem[] }>();
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

  const heroContent = (
    <section className="section-gradient relative overflow-hidden py-24 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-3">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl xl:text-6xl">{t('faq.hero.title')}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">{t('faq.hero.description')}</p>
        </motion.div>
      </div>
    </section>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet><title>{t('faq.seo.title')}</title><meta name="description" content={t('faq.seo.description')} /></Helmet>
        {heroContent}
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="mx-auto max-w-3xl space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 w-full rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet><title>{t('faq.seo.title')}</title><meta name="description" content={t('faq.seo.description')} /></Helmet>
        {heroContent}
        <div className="flex min-h-[400px] items-center justify-center px-4">
          <div className="premium-glass rounded-2xl p-12 text-center max-w-md">
            <HelpCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg text-muted-foreground mb-6">{t('faq.error')}</p>
            <button onClick={() => refetch()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20">
              <RefreshCw className="h-4 w-4" />{t('faq.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet><title>{t('faq.seo.title')}</title><meta name="description" content={t('faq.seo.description')} /></Helmet>
        {heroContent}
        <div className="flex min-h-[400px] items-center justify-center px-4">
          <div className="premium-glass rounded-2xl p-12 text-center max-w-md">
            <MessageCircle className="mx-auto mb-4 h-14 w-14 text-muted-foreground/30" />
            <h3 className="text-xl font-semibold text-foreground mb-2">{t('faq.empty.title')}</h3>
            <p className="text-muted-foreground">{t('faq.empty.description')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>{t('faq.seo.title')}</title><meta name="description" content={t('faq.seo.description')} /></Helmet>

      {heroContent}

      {/* Search + Category Filters */}
      <section className="section-gradient-alt py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-xl mb-10">
            <div className="relative">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
              <input
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('faq.searchPlaceholder')}
                className={`w-full h-12 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all`}
              />
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-2 mb-4">
            <motion.button variants={chipVariant} onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${!selectedCategory ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'premium-glass text-muted-foreground hover:text-foreground'}`}>
              {t('faq.all')}
            </motion.button>
            {categoryKeys.map((key) => (
              <motion.button key={key} variants={chipVariant} onClick={() => setSelectedCategory(key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${selectedCategory === key ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'premium-glass text-muted-foreground hover:text-foreground'}`}>
                {grouped.get(key)!.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {searchQuery ? (
              <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                {filteredItems && filteredItems.length > 0 ? (
                  <FAQAccordion items={filteredItems} />
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20">
                    <div className="premium-glass rounded-2xl p-12 text-center max-w-sm">
                      <SearchX className="mx-auto mb-4 h-14 w-14 text-muted-foreground/30" />
                      <p className="text-lg font-medium text-foreground">{t('faq.noResults')}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : selectedCategory ? (
              <motion.div key={selectedCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <motion.h2 {...fadeUp} className={`text-2xl font-bold text-foreground mb-8 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10"><HelpCircle className="h-5 w-5 text-primary" /></span>
                  {grouped.get(selectedCategory)!.label}
                </motion.h2>
                <FAQAccordion items={grouped.get(selectedCategory)!.items} />
              </motion.div>
            ) : (
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {categoryKeys.map((key) => (
                  <motion.div key={key} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="mb-14 last:mb-0">
                    <h2 className={`text-2xl font-bold text-foreground mb-8 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10"><HelpCircle className="h-5 w-5 text-primary" /></span>
                      {grouped.get(key)!.label}
                    </h2>
                    <FAQAccordion items={grouped.get(key)!.items} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Still have questions? CTA */}
      <section className="section-gradient relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-3">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">{t('faq.cta.title')}</h2>
            <p className="mb-8 text-lg text-muted-foreground">{t('faq.cta.description')}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20">
              {t('faq.cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
