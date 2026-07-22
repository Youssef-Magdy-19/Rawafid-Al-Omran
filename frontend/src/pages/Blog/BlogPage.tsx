import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, SearchX, BookOpen, RefreshCw } from 'lucide-react';
import { SearchBox, Pagination, Badge, Image, SkeletonBlogPost } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { useBlogs } from '@hooks/useBlogs';
import type { Blog } from '@services/api/types';

const ITEMS_PER_PAGE = 6;

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

function formatDate(post: Blog) {
  const dateStr = post.publishedAt || post.createdAt;
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString();
}

export function BlogPage() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: blogs = [], isLoading, error, refetch } = useBlogs();

  const categories = useMemo(
    () => Array.from(new Set(blogs.map((p) => p.category).filter(Boolean))) as string[],
    [blogs],
  );

  const featured = useMemo(() => blogs.find((p) => p.isFeatured) || blogs[0], [blogs]);

  const filtered = useMemo(() => {
    const rest = featured ? blogs.filter((p) => p.id !== featured.id) : blogs;
    return rest.filter((post) => {
      const title = language === 'ar' ? post.titleAr : post.title;
      const excerpt = language === 'ar' ? post.excerptAr || post.excerpt || '' : post.excerpt || '';
      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, featured, language, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = (q: string) => { setSearchQuery(q); setCurrentPage(1); };
  const handleCategory = (cat: string | null) => { setSelectedCategory(cat); setCurrentPage(1); };

  const heroContent = (
    <section className="section-gradient relative overflow-hidden py-24 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-3xl text-center">
          <span className="premium-subtitle justify-center mb-6">{t('blog.subtitle')}</span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl xl:text-6xl">{t('blog.title')}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">{t('blog.seo.description')}</p>
        </motion.div>
      </div>
    </section>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet><title>{t('blog.seo.title')}</title><meta name="description" content={t('blog.seo.description')} /></Helmet>
        {heroContent}
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (<SkeletonBlogPost key={i} />))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet><title>{t('blog.seo.title')}</title><meta name="description" content={t('blog.seo.description')} /></Helmet>
        {heroContent}
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <div className="premium-glass rounded-2xl p-12 text-center max-w-md mx-auto">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg text-muted-foreground mb-6">{t('blog.error')}</p>
            <button onClick={() => refetch()} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20">
              <RefreshCw className="h-4 w-4" />{t('blog.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet><title>{t('blog.seo.title')}</title><meta name="description" content={t('blog.seo.description')} /></Helmet>
        {heroContent}
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <div className="premium-glass rounded-2xl p-12 text-center max-w-md mx-auto">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg text-foreground font-medium">{t('blog.noArticles')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>{t('blog.seo.title')}</title><meta name="description" content={t('blog.seo.description')} /></Helmet>

      {heroContent}

      {/* Featured Article */}
      {featured && !searchQuery && !selectedCategory && (
        <section className="bg-background pb-8">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <Link to={`/blog/${featured.slug}`} className="group block">
                <motion.div variants={fadeUp} className="premium-card overflow-hidden grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden min-h-[300px] lg:min-h-[420px]">
                    <Image src={featured.coverImage || ''} alt={language === 'ar' ? featured.titleAr : featured.title} aspectRatio="auto" className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {featured.category && <Badge variant="primary">{featured.category}</Badge>}
                      <span className={`flex items-center gap-1.5 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Calendar className="h-3.5 w-3.5" /><span>{formatDate(featured)}</span>
                      </span>
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl group-hover:text-primary transition-colors">
                      {language === 'ar' ? featured.titleAr : featured.title}
                    </h2>
                    <p className="mb-6 line-clamp-3 text-muted-foreground leading-relaxed">
                      {language === 'ar' ? featured.excerptAr || featured.excerpt : featured.excerpt}
                    </p>
                    <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {featured.author && (
                        <span className={`flex items-center gap-1.5 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <User className="h-3.5 w-3.5" /><span>{featured.author}</span>
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {t('blog.readMore')}<ArrowRight className={`h-4 w-4 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Search + Filter */}
      <section className="section-gradient-alt py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-xl mb-8">
            <SearchBox onSearch={handleSearch} placeholder={t('blog.search')} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-wrap justify-center gap-2 mb-4">
            <button onClick={() => handleCategory(null)} className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${!selectedCategory ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'premium-glass text-muted-foreground hover:text-foreground'}`}>
              {t('blog.all')}
            </button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => handleCategory(cat)} className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'premium-glass text-muted-foreground hover:text-foreground'}`}>
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {paginated.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[300px] flex-col items-center justify-center">
              <div className="premium-glass rounded-2xl p-12 text-center max-w-sm">
                <SearchX className="mx-auto mb-4 h-14 w-14 text-muted-foreground/30" />
                <p className="text-lg font-medium text-foreground mb-1">{t('blog.noResults')}</p>
                <p className="text-sm text-muted-foreground">{t('blog.search')}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginated.map((post) => (
                <motion.article key={post.id} variants={fadeUp} className="premium-card group overflow-hidden flex flex-col">
                  <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                    <Image src={post.coverImage || ''} alt={language === 'ar' ? post.titleAr : post.title} aspectRatio="video" className="w-full group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="flex flex-col flex-1 p-6">
                    <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {post.category && <Badge variant="primary" size="sm">{post.category}</Badge>}
                      <span className={`flex items-center gap-1.5 text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Calendar className="h-3 w-3" /><span>{formatDate(post)}</span>
                      </span>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {language === 'ar' ? post.titleAr : post.title}
                      </h3>
                    </Link>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground flex-1">
                      {language === 'ar' ? post.excerptAr || post.excerpt || '' : post.excerpt || ''}
                    </p>
                    <div className={`flex items-center justify-between pt-4 border-t border-border/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {post.author ? (
                        <span className={`flex items-center gap-1.5 text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <User className="h-3 w-3" /><span>{post.author}</span>
                        </span>
                      ) : <span />}
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {t('blog.readMore')}<ArrowRight className={`h-3.5 w-3.5 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {totalPages > 1 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-14 flex justify-center">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
