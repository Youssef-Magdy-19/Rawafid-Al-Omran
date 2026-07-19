import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, FileText, Briefcase, Image, ArrowRight } from 'lucide-react';
import { PageHeader, Pagination, Badge } from '@components';
import { useLanguage } from '@providers/LanguageProvider';

interface SearchResult {
  id: string;
  type: 'page' | 'blog' | 'career' | 'project';
  title: string;
  excerpt: string;
  url: string;
  date?: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'page',
    title: 'Web Development Services',
    excerpt: 'Professional web development services including frontend, backend, and full-stack solutions.',
    url: '/services',
  },
  {
    id: '2',
    type: 'blog',
    title: 'The Future of Web Development in 2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
    url: '/blog/1',
    date: '2024-01-15',
  },
  {
    id: '3',
    type: 'career',
    title: 'Senior Frontend Developer',
    excerpt: 'We are looking for an experienced Frontend Developer to join our team.',
    url: '/careers/1',
    date: '2024-01-15',
  },
  {
    id: '4',
    type: 'page',
    title: 'About Our Company',
    excerpt: 'Learn more about our mission, values, and the team behind our success.',
    url: '/about',
  },
  {
    id: '5',
    type: 'blog',
    title: 'Building Scalable Applications with Modern Tools',
    excerpt: 'Learn how to build applications that can grow with your business needs.',
    url: '/blog/2',
    date: '2024-01-10',
  },
  {
    id: '6',
    type: 'project',
    title: 'E-commerce Platform Redesign',
    excerpt: 'Complete redesign of a major e-commerce platform with modern UX.',
    url: '/projects/1',
  },
];

const ITEMS_PER_PAGE = 10;

export function SearchPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredResults = mockSearchResults.filter((result) =>
    query
      ? result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase())
      : true
  );

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return <FileText className="h-5 w-5" />;
      case 'career':
        return <Briefcase className="h-5 w-5" />;
      case 'project':
        return <Image className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'blog':
        return 'primary';
      case 'career':
        return 'success';
      case 'project':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('search.title') || 'Search'}
        description={t('search.subtitle') || 'Find what you\'re looking for'}
        variant="centered"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t('search.placeholder') || 'Search...'}
              className={`w-full h-14 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {query ? (
          <>
            <div className="max-w-4xl mx-auto mb-6">
              <p className="text-gray-600">
                {filteredResults.length} results found for "{query}"
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {paginatedResults.length > 0 ? (
                paginatedResults.map((result) => (
                  <Link
                    key={result.id}
                    to={result.url}
                    className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 text-primary-500">
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1">
                        <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-500">
                            {result.title}
                          </h3>
                          <Badge variant={getTypeBadgeVariant(result.type) as any} size="sm">
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{result.excerpt}</p>
                        <div className={`flex items-center gap-4 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {result.date && (
                            <span>{new Date(result.date).toLocaleDateString()}</span>
                          )}
                          <span className={`flex items-center gap-1 text-primary-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            View
                            <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or browse our pages
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
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
            <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-500">
              Enter a search term to find pages, blog posts, and more
            </p>
          </div>
        )}
      </div>
    </div>
  );
}