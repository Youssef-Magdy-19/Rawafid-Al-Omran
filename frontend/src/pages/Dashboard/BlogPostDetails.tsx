import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Pencil, Calendar, Clock, Star, Tag, FileText, Send, Ban, ImageIcon } from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useBlog, useDeleteBlog } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { ErrorState } from '@components/ui/ErrorState';

const categoryColorMap: Record<string, string> = {
  constructionNews: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  industryInsights: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  projectUpdates: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  safetyTips: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  companyNews: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
};

export function BlogPostDetails() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: blog, isLoading, isError, error, refetch } = useBlog(id || '');
  const deleteBlog = useDeleteBlog();
  const { addToast } = useToast();
  const lang = i18n.language.startsWith('ar') ? 'ar' : 'en';

  const handleDelete = () => {
    if (!blog?.id) return;
    if (!window.confirm(t('dashboard.blogPostDetails.deleteConfirm'))) return;
    deleteBlog.mutate(blog.id, {
      onSuccess: () => {
        addToast(t('dashboard.blogPostDetails.deletedSuccess'), 'success');
        navigate(ROUTES.DASHBOARD_BLOG);
      },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-border p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${[75, 50, 60, 80, 40][i]}%` }} />
            ))}
          </div>
          <div className="rounded-xl border border-border p-6 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${[70, 60, 50, 80, 45, 65][i]}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return <ErrorState message={(error as Error)?.message || t('common.loadError')} onRetry={refetch} />;
  }

  const categoryClass = categoryColorMap[blog.category || ''] || '';
  const tags = blog.tags || [];

  const metaItem = (label: string, value: React.ReactNode) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button onClick={() => navigate(ROUTES.DASHBOARD_BLOG)}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <ArrowLeft className="h-4 w-4" />{t('dashboard.blog.pageTitle')}
          </button>
          <h1 className="text-2xl font-bold text-foreground">{lang === 'ar' ? blog.titleAr : blog.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(ROUTES.DASHBOARD_BLOG_EDIT.replace(':id', blog.slug))}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Pencil className="h-4 w-4" />{t('common.edit')}
          </button>
          <button onClick={handleDelete} disabled={deleteBlog.isPending}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50">
            <Trash2 className="h-4 w-4" />{deleteBlog.isPending ? t('common.deleting') : t('common.delete')}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {blog.coverImage && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('dashboard.blogPostDetails.coverImage')}</h3>
              </div>
              <img src={blog.coverImage} alt={blog.title} className="w-full h-[300px] object-cover" />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.blogPostDetails.articlePreview')}</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.arabicTitle')}</p>
                <p className="text-sm text-foreground font-medium">{blog.titleAr}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.englishTitle')}</p>
                <p className="text-sm text-foreground font-medium">{blog.title}</p>
              </div>
              {blog.excerptAr && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.excerptAr')}</p>
                  <p className="text-sm text-foreground leading-relaxed">{blog.excerptAr}</p>
                </div>
              )}
              {blog.excerpt && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.excerptEn')}</p>
                  <p className="text-sm text-foreground leading-relaxed">{blog.excerpt}</p>
                </div>
              )}
              <div className="lg:col-span-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{t('dashboard.blogPostDetails.fullArticle')}</p>
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {lang === 'ar' ? blog.contentAr : blog.content}
                </div>
              </div>
            </div>
          </motion.div>

          {tags.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
              className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-2">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{t('dashboard.blogPostDetails.metadata')}</h3>
            </div>

            {metaItem(t('dashboard.blogPostDetails.status'),
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${blog.isPublished ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'}`}>
                {blog.isPublished ? <><Send className="h-3 w-3 mr-1" />{t('dashboard.blog.published_badge')}</> : <><Ban className="h-3 w-3 mr-1" />{t('dashboard.blog.draft_badge')}</>}
              </span>
            )}
            {metaItem(t('dashboard.blogPostDetails.featured'),
              blog.isFeatured ? <Star className="h-4 w-4 text-secondary fill-secondary" /> : <Star className="h-4 w-4 text-muted-foreground/50" />
            )}
            {metaItem(t('dashboard.blogPostDetails.category'),
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass}`}>
                {blog.category ? t(`dashboard.blogPostDetails.${blog.category}`) : '—'}
              </span>
            )}
            {metaItem(t('dashboard.blogPostDetails.author'), blog.author || '—')}
            {metaItem(t('dashboard.blogPostDetails.publishedAt'),
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-muted-foreground" />{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : '—'}</span>
            )}
            {metaItem(t('dashboard.blogPostDetails.createdAt'),
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-muted-foreground" />{new Date(blog.createdAt).toLocaleDateString()}</span>
            )}
            {metaItem(t('dashboard.blogPostDetails.updatedAt'),
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-muted-foreground" />{new Date(blog.updatedAt).toLocaleDateString()}</span>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
