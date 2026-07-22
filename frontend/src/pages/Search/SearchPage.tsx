import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, FileText, Image, Globe, ArrowRight } from 'lucide-react';
import { PageHeader, Pagination, Badge } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { useServices } from '@hooks/useServices';
import { useProjects } from '@hooks/useProjects';
import { useBlogs } from '@hooks/useBlogs';

interface SearchResult {
  id: string;
  type: 'service' | 'project' | 'blog';
  title: string;
  excerpt: string;
  url: string;
  date?: string;
}

const ITEMS_PER_PAGE = 10;

export function SearchPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: services } = useServices();
  const { data: projects } = useProjects();
  const { data: blogs } = useBlogs();

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
      setCurrentPage(1);
    }
  };

  const allResults = useMemo<SearchResult[]>(() => {
    const results: SearchResult[] = [];

    services?.forEach((s) => {
      const title = language === 'ar' ? s.titleAr : s.title;
      const desc = language === 'ar' ? s.descriptionAr : s.description;
      results.push({ id: `srv-${s.id}`, type: 'service', title, excerpt: desc, url: `/services/${s.slug}` });
    });

    projects?.forEach((p) => {
      const title = language === 'ar' ? p.titleAr : p.title;
      const desc = language === 'ar' ? p.shortDescriptionAr || p.descriptionAr : p.shortDescription || p.description;
      results.push({ id: `prj-${p.id}`, type: 'project', title, excerpt: desc, url: `/projects/${p.slug}`, date: p.year?.toString() });
    });

    blogs?.forEach((b) => {
      const title = language === 'ar' ? b.titleAr : b.title;
      const excerpt = language === 'ar' ? b.excerptAr || '' : b.excerpt || '';
      results.push({ id: `blg-${b.id}`, type: 'blog', title, excerpt, url: `/blog/${b.slug}`, date: b.publishedAt || b.createdAt });
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

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="h-5 w-5" />;
      case 'project': return <Image className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'blog': return 'primary' as const;
      case 'project': return 'warning' as const;
      default: return 'secondary' as const;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <PageHeader
        title={t('search.title')}
        description={t('search.subtitle')}
        variant="centered"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t('search.placeholder')}
              className={`w-full h-14 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-lg bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground`}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('search.search') || 'Search'}
            </button>
          </form>
        </div>

        {query ? (
          <>
            <div className="max-w-4xl mx-auto mb-6">
              <p className="text-muted-foreground">
                {t('search.resultsCount', { count: filteredResults.length, query })}
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {paginatedResults.length > 0 ? (
                paginatedResults.map((result) => (
                  <Link
                    key={result.id}
                    to={result.url}
                    className="block bg-background rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50"
                  >
                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1">
                        <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary">
                            {result.title}
                          </h3>
                          <Badge variant={getTypeBadgeVariant(result.type)} size="sm">
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{result.excerpt}</p>
                        <div className={`flex items-center gap-4 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {result.date && (
                            <span>{new Date(result.date).toLocaleDateString()}</span>
                          )}
                          <span className={`flex items-center gap-1 text-primary ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {t('common.view')}
                            <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t('search.noResults')}</h3>
                  <p className="text-muted-foreground">{t('search.tryAdjusting')}</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">{t('search.startSearch')}</h3>
            <p className="text-muted-foreground">{t('search.enterTerm')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
