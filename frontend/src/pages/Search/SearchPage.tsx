import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Globe, FileText, Image, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useLanguage } from '@providers/LanguageProvider';
import { useServices } from '@hooks/useServices';
import { useProjects } from '@hooks/useProjects';
import { useBlogs } from '@hooks/useBlogs';
import { SearchBox } from '@components/SearchBox';
import { Skeleton } from '@components/Skeleton';

interface SearchResult {
  id: string;
  type: 'service' | 'project' | 'blog';
  title: string;
  excerpt: string;
  url: string;
  date?: string;
}

const typeConfig = {
  service: { icon: Globe, label: 'Services', color: 'text-primary' },
  project: { icon: Image, label: 'Projects', color: 'text-secondary' },
  blog: { icon: FileText, label: 'Blog', color: 'text-primary' },
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function ResultSkeleton() {
  return (
    <div className="premium-card p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="h-10 w-10 rounded-lg" variant="rectangular" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-5 w-48" variant="text" />
          <Skeleton className="mb-2 h-4 w-full" variant="text" />
          <Skeleton className="h-4 w-32" variant="text" />
        </div>
      </div>
    </div>
  );
}

export function SearchPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [hasSearched, setHasSearched] = useState(!!query);

  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: blogs, isLoading: blogsLoading } = useBlogs();

  const isLoading = servicesLoading || projectsLoading || blogsLoading;

  const allResults = useMemo<SearchResult[]>(() => {
    const results: SearchResult[] = [];

    services?.forEach((s) => {
      const title = language === 'ar' ? s.titleAr : s.title;
      const desc = language === 'ar' ? s.shortDescriptionAr || s.descriptionAr : s.shortDescription || s.description;
      results.push({ id: `srv-${s.id}`, type: 'service' as const, title, excerpt: desc, url: `/services/${s.slug}` });
    });

    projects?.forEach((p) => {
      const title = language === 'ar' ? p.titleAr : p.title;
      const desc = language === 'ar' ? p.shortDescriptionAr || p.descriptionAr : p.shortDescription || p.description;
      results.push({ id: `prj-${p.id}`, type: 'project' as const, title, excerpt: desc, url: `/projects/${p.slug}`, date: p.year?.toString() });
    });

    blogs?.forEach((b) => {
      const title = language === 'ar' ? b.titleAr : b.title;
      const excerpt = language === 'ar' ? b.excerptAr || '' : b.excerpt || '';
      results.push({ id: `blg-${b.id}`, type: 'blog' as const, title, excerpt, url: `/blog/${b.slug}`, date: b.publishedAt || b.createdAt });
    });

    return results;
  }, [services, projects, blogs, language]);

  const filteredResults = useMemo(() => {
    if (!query) return allResults;
    const q = query.toLowerCase();
    return allResults.filter(
      (r) => r.title.toLowerCase().includes(q) || r.excerpt.toLowerCase().includes(q)
    );
  }, [allResults, query]);

  const groupedResults = useMemo(() => {
    const groups: { type: SearchResult['type']; results: SearchResult[] }[] = [
      { type: 'service', results: [] },
      { type: 'project', results: [] },
      { type: 'blog', results: [] },
    ];
    filteredResults.forEach((r) => {
      const group = groups.find((g) => g.type === r.type);
      if (group) group.results.push(r);
    });
    return groups.filter((g) => g.results.length > 0);
  }, [filteredResults]);

  const handleSearch = useCallback(
    (value: string) => {
      if (value.trim()) {
        setSearchParams({ q: value.trim() });
        setHasSearched(true);
      } else {
        setSearchParams({});
        setHasSearched(false);
      }
    },
    [setSearchParams]
  );

  return (
    <>
      <Helmet>
        <title>{t('search.seo.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('search.seo.description')} />
      </Helmet>

      <section className="section-gradient relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="premium-subtitle mb-6 inline-flex justify-center">
              {t('search.subtitle')}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('search.hero.title')}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground lg:text-xl">
              {t('search.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-12 max-w-2xl"
          >
            <SearchBox
              onSearch={handleSearch}
              placeholder={t('search.placeholder')}
              initialValue={query}
              size="lg"
              autoFocus={!query}
            />
          </motion.div>

          {isLoading && hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-4xl space-y-4"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <ResultSkeleton key={i} />
              ))}
            </motion.div>
          )}

          {!isLoading && hasSearched && query && (
            <>
              <div className="mx-auto mb-8 max-w-4xl">
                <p className="text-muted-foreground">
                  {filteredResults.length} {t('search.results')} {t('common.for') || 'for'} &ldquo;{query}&rdquo;
                </p>
              </div>

              {groupedResults.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="mx-auto max-w-4xl space-y-12"
                >
                  {groupedResults.map((group) => {
                    const config = typeConfig[group.type];
                    const Icon = config.icon;
                    return (
                      <motion.div key={group.type} variants={itemVariants}>
                        <div className={`mb-6 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                            <Icon className={`h-5 w-5 ${config.color}`} />
                          </div>
                          <h2 className="text-xl font-bold text-foreground">
                            {t(`${group.type === 'service' ? 'services' : group.type === 'project' ? 'projects' : 'blog'}.title`)}
                          </h2>
                          <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
                            {group.results.length}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {group.results.map((result) => (
                            <Link
                              key={result.id}
                              to={result.url}
                              className="premium-card group block p-6 transition-all duration-300"
                            >
                              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                  <Icon className={`h-5 w-5 ${config.color}`} />
                                </div>
                                <div className="flex-1">
                                  <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                                    {result.title}
                                  </h3>
                                  <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                                    {result.excerpt}
                                  </p>
                                  <div className={`flex items-center gap-4 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    {result.date && (
                                      <span className="text-muted-foreground">{result.date}</span>
                                    )}
                                    <span className={`inline-flex items-center gap-1 font-medium text-primary ${isRTL ? 'flex-row-reverse' : ''}`}>
                                      {t('common.view')}
                                      <ArrowRight className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 ${isRTL ? 'rotate-180' : ''}`} />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-20 text-center"
                  >
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                      <SearchIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{t('search.noResults')}</h3>
                    <p className="text-muted-foreground">{t('search.tryAdjusting')}</p>
                  </motion.div>
                )
              )}
            </>
          )}

          {!isLoading && !hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="py-20 text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                <SearchIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{t('search.startSearch')}</h3>
              <p className="text-muted-foreground">{t('search.enterTerm')}</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}