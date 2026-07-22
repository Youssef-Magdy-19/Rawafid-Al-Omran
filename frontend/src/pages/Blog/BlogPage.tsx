import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { PageHeader, SearchBox, Pagination, Badge, Image } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { useBlogs } from '@hooks/useBlogs';
import type { Blog } from '@services/api/types';

const ITEMS_PER_PAGE = 6;

export function BlogPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: blogs = [], isLoading, error, refetch } = useBlogs();

  const categories = Array.from(new Set(blogs.map((post) => post.category).filter(Boolean))) as string[];

  const filteredPosts = blogs.filter((post) => {
    const title = language === 'ar' ? post.titleAr : post.title;
    const excerpt = language === 'ar' ? post.excerptAr || post.excerpt || '' : post.excerpt || '';
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const formatDate = (post: Blog) => {
    const dateStr = post.publishedAt || post.createdAt;
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <PageHeader
          title={t('blog.title') || 'Our Blog'}
          description={t('blog.subtitle') || 'Insights, tutorials, and news from our team'}
          variant="centered"
        />
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/30">
        <PageHeader
          title={t('blog.title') || 'Our Blog'}
          description={t('blog.subtitle') || 'Insights, tutorials, and news from our team'}
          variant="centered"
        />
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <p className="text-red-500">{t('blog.error') || 'Failed to load articles. Please try again.'}</p>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-primary-500 px-6 py-2 text-white transition-colors hover:bg-primary-600"
          >
            {t('blog.retry') || 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30">
        <PageHeader
          title={t('blog.title') || 'Our Blog'}
          description={t('blog.subtitle') || 'Insights, tutorials, and news from our team'}
          variant="centered"
        />
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-gray-500">{t('blog.noArticles') || 'No articles found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <PageHeader
        title={t('blog.title') || 'Our Blog'}
        description={t('blog.subtitle') || 'Insights, tutorials, and news from our team'}
        variant="centered"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="max-w-xl mx-auto">
            <SearchBox
              onSearch={handleSearch}
              placeholder={t('blog.search') || 'Search articles...'}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('blog.all') || 'All'}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {paginatedPosts.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-gray-500">{t('blog.noResults') || 'No articles match your search.'}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Image
                      src={post.coverImage || ''}
                      alt={language === 'ar' ? post.titleAr : post.title}
                      aspectRatio="video"
                      className="w-full"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {post.category && (
                        <Badge variant="primary" size="sm">
                          {post.category}
                        </Badge>
                      )}
                      <div className={`flex items-center gap-1 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post)}</span>
                      </div>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-500 transition-colors">
                        {language === 'ar' ? post.titleAr : post.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {language === 'ar' ? post.excerptAr || post.excerpt || '' : post.excerpt || ''}
                    </p>

                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {post.author && (
                        <div className={`flex items-center gap-2 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                      <Link
                        to={`/blog/${post.slug}`}
                        className={`flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        {t('blog.readMore') || 'Read More'}
                        <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
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
        )}
      </div>
    </div>
  );
}
