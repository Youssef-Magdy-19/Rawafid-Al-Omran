import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  Globe,
  Image as ImageIcon,
  Hash,
  Tag,
  ChevronLeft,
  ChevronRight,
  FileText,
  Star,
  StarOff,
  Send,
  Ban,
  User,
  Timer,
} from 'lucide-react';
import { mockBlogPosts } from '@data/blogMockData';
import { ROUTES } from '@constants/route.constants';

const categoryColorMap: Record<string, string> = {
  constructionNews: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  industryInsights: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  projectUpdates: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  safetyTips: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  companyNews: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

export function BlogPostDetails() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isAr = i18n.language === 'ar';

  const [galleryIndex, setGalleryIndex] = useState(0);

  const post = useMemo(() => mockBlogPosts.find((p) => p.id === id), [id]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Blog post not found</p>
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_BLOG)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {t('dashboard.blog.pageTitle')}
        </button>
      </div>
    );
  }

  const allImages = [post.coverImage, ...post.galleryImages].filter(Boolean);
  const categoryClass = categoryColorMap[post.category] || '';
  const tags = post.tags.split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => navigate(ROUTES.DASHBOARD_BLOG)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard.blogPostDetails.backToBlog')}
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isAr ? post.titleAr : post.titleEn}
            </h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.blogPostDetails.pageDescription')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/dashboard/blog/${post.id}/edit`)}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300"
            >
              <Pencil className="h-4 w-4" />
              {t('dashboard.blogPostDetails.editPost')}
            </button>
            <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-destructive/30 text-destructive font-semibold hover:bg-destructive/10 transition-all duration-300">
              <Trash2 className="h-4 w-4" />
              {t('dashboard.blogPostDetails.deletePost')}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {allImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <div className="p-5 border-b border-border flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.blogPostDetails.gallery')}</h3>
              </div>

              <div className="relative">
                <img
                  src={allImages[galleryIndex]}
                  alt={`${isAr ? post.titleAr : post.titleEn} - ${galleryIndex + 1}`}
                  className="w-full h-[320px] object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setGalleryIndex((i) => (i === 0 ? allImages.length - 1 : i - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setGalleryIndex((i) => (i === allImages.length - 1 ? 0 : i + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {allImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIndex(i)}
                          className={`h-2 w-2 rounded-full transition-all ${
                            i === galleryIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`shrink-0 h-16 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        i === galleryIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.blogPostDetails.articlePreview')}</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.arabicTitle')}</p>
                <p className="text-sm text-foreground">{post.titleAr}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.englishTitle')}</p>
                <p className="text-sm text-foreground">{post.titleEn}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.addBlogPost.shortDescriptionAr')}</p>
                <p className="text-sm text-foreground leading-relaxed">{post.shortDescriptionAr}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.addBlogPost.shortDescriptionEn')}</p>
                <p className="text-sm text-foreground leading-relaxed">{post.shortDescriptionEn}</p>
              </div>
              <div className="lg:col-span-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.fullArticle')}</p>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: isAr ? post.fullContentAr : post.fullContentEn }}
                />
              </div>
            </div>
          </motion.div>

          {tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.blogPostDetails.tags')}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.blogPostDetails.metadata')}</h3>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center gap-3 py-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileText className="h-8 w-8" />
                </div>
                <p className="text-xs text-muted-foreground">{post.id}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.blogPostDetails.status')}</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  post.published
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                }`}>
                  {post.published ? (
                    <><Send className="h-3 w-3 mr-1" />{t('dashboard.blog.published_badge')}</>
                  ) : (
                    <><Ban className="h-3 w-3 mr-1" />{t('dashboard.blog.draft_badge')}</>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.blogPostDetails.featured')}</span>
                {post.featured ? (
                  <Star className="h-4 w-4 text-secondary fill-secondary" />
                ) : (
                  <StarOff className="h-4 w-4 text-muted-foreground/50" />
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.blogPostDetails.category')}</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass}`}>
                  {t(`dashboard.blogPostDetails.${post.category}` as any)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.blogPostDetails.author')}</span>
                <span className="text-sm text-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  {t(`dashboard.blogPostDetails.${post.author}` as any)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.blogPostDetails.readingTime')}</span>
                <span className="text-sm text-foreground flex items-center gap-1.5">
                  <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                  {post.readingTime} min
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.blogPostDetails.publishDate')}</span>
                <span className="text-sm text-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {post.publishDate || '—'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.blogPostDetails.createdAt')}</span>
                <span className="text-sm text-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  {post.createdAt}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.blogPostDetails.updatedAt')}</span>
                <span className="text-sm text-foreground flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  {post.updatedAt}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.blogPostDetails.seoInformation')}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.seoTitleAr')}</p>
                <p className="text-sm text-foreground">{post.seo.titleAr || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.seoTitleEn')}</p>
                <p className="text-sm text-foreground">{post.seo.titleEn || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.seoDescriptionAr')}</p>
                <p className="text-sm text-foreground">{post.seo.descriptionAr || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.seoDescriptionEn')}</p>
                <p className="text-sm text-foreground">{post.seo.descriptionEn || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.seoKeywords')}</p>
                <p className="text-sm text-foreground">
                  {post.seo.keywords
                    ? post.seo.keywords.split(',').map((kw) => (
                        <span key={kw.trim()} className="inline-block mr-1.5 mb-1 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {kw.trim()}
                        </span>
                      ))
                    : '—'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
