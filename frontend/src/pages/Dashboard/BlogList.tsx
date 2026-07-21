import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, Search, SlidersHorizontal, Eye, Pencil, Trash2,
  ChevronLeft, ChevronRight, X, ArrowUpDown, FileText,
  Star, StarOff, Send, Ban, ImageIcon,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useBlogs, useDeleteBlog, useUpdateBlog } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';
import { Dropdown } from '@components/ui/Dropdown';

const categoryColorMap: Record<string, string> = {
  constructionNews: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  industryInsights: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  projectUpdates: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  safetyTips: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  companyNews: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
};

type SortField = 'title' | 'category' | 'publishedAt' | 'createdAt' | 'isPublished';

export function BlogList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = { page: String(currentPage), limit: String(itemsPerPage) };
    if (search) params.search = search;
    if (categoryFilter !== 'all') params.category = categoryFilter;
    if (statusFilter === 'published') params.isPublished = 'true';
    else if (statusFilter === 'draft') params.isPublished = 'false';
    if (featuredFilter === 'featured') params.isFeatured = 'true';
    else if (featuredFilter === 'nonFeatured') params.isFeatured = 'false';
    if (sortField) params.sortBy = sortField;
    if (sortOrder) params.sortOrder = sortOrder;
    return params;
  }, [search, categoryFilter, statusFilter, featuredFilter, sortField, sortOrder, currentPage, itemsPerPage]);

  const { data, isLoading, isError, refetch } = useBlogs(queryParams);
  const deleteBlog = useDeleteBlog();
  const updateBlog = useUpdateBlog();

  const blogs = data?.blogs || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 0;

  const allSelected = blogs.length > 0 && blogs.every((b) => selectedIds.has(b.id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(blogs.map((b) => b.id)));
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteBlog.mutate(id, {
      onSuccess: () => {
        addToast(t('dashboard.blog.deletedSuccess'), 'success');
        setSelectedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => deleteBlog.mutate(id));
    addToast(t('dashboard.blog.bulkDeleted'), 'success');
    setSelectedIds(new Set());
  };

  const handleBulkAction = (action: 'publish' | 'unpublish' | 'feature' | 'unfeature') => {
    selectedIds.forEach((id) => {
      const payload: Record<string, unknown> = {};
      if (action === 'publish') payload.isPublished = true;
      if (action === 'unpublish') payload.isPublished = false;
      if (action === 'feature') payload.isFeatured = true;
      if (action === 'unfeature') payload.isFeatured = false;
      updateBlog.mutate({ id, data: payload });
    });
    const msg = action === 'publish' ? 'bulkPublished' : action === 'unpublish' ? 'bulkUnpublished' : action === 'feature' ? 'bulkFeatured' : 'bulkUnfeatured';
    addToast(t(`dashboard.blog.${msg}`), 'success');
    setSelectedIds(new Set());
  };

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('all');
    setStatusFilter('all');
    setFeaturedFilter('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || categoryFilter !== 'all' || statusFilter !== 'all' || featuredFilter !== 'all';

  const categories = ['constructionNews', 'industryInsights', 'projectUpdates', 'safetyTips', 'companyNews'];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div><LoadingSkeleton className="h-8 w-48" /><LoadingSkeleton className="h-4 w-64 mt-2" /></div>
          <LoadingSkeleton className="h-11 w-32" />
        </div>
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <LoadingSkeleton className="h-10 w-full" />
          <LoadingSkeleton className="h-6 w-full" count={5} />
        </div>
      </div>
    );
  }

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.blog.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.blog.pageDescription')}</p>
        </div>
        <button onClick={() => navigate(ROUTES.DASHBOARD_BLOG_ADD)}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4" />{t('dashboard.blog.addNew')}
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={t('dashboard.blog.searchPlaceholder')}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-lg border text-sm font-medium transition-colors ${showFilters || hasActiveFilters ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <SlidersHorizontal className="h-4 w-4" /><span className="hidden sm:inline">{t('dashboard.blog.filter')}</span>
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-3 pt-2">
              <Dropdown
                value={categoryFilter}
                onChange={(val) => { setCategoryFilter(val); setCurrentPage(1); }}
                placeholder={t('dashboard.blog.allCategories')}
                options={categories.map((cat) => ({ value: cat, label: t(`dashboard.blogPostDetails.${cat}`) }))}
                className="w-48"
              />
              <Dropdown
                value={statusFilter}
                onChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
                placeholder={t('dashboard.blog.allStatuses')}
                options={[
                  { value: 'published', label: t('dashboard.blog.published') },
                  { value: 'draft', label: t('dashboard.blog.draft') },
                ]}
                className="w-44"
              />
              <Dropdown
                value={featuredFilter}
                onChange={(val) => { setFeaturedFilter(val); setCurrentPage(1); }}
                placeholder={t('dashboard.blog.all')}
                options={[
                  { value: 'featured', label: t('dashboard.blog.featuredOnly') },
                  { value: 'nonFeatured', label: t('dashboard.blog.nonFeatured') },
                ]}
                className="w-44"
              />
              <Dropdown
                value={sortField}
                onChange={(val) => setSortField(val as SortField)}
                placeholder={t('dashboard.blog.sortDate')}
                options={[
                  { value: 'createdAt', label: t('dashboard.blog.sortDate') },
                  { value: 'title', label: t('dashboard.blog.sortName') },
                  { value: 'category', label: t('dashboard.blog.category') },
                  { value: 'isPublished', label: t('dashboard.blog.sortStatus') },
                ]}
                className="w-44"
              />
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                <ArrowUpDown className="h-4 w-4" />{sortOrder === 'asc' ? t('dashboard.blog.ascending') : t('dashboard.blog.descending')}
              </button>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="inline-flex items-center gap-1 h-10 px-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <X className="h-4 w-4" />Clear
                </button>
              )}
            </motion.div>
          )}
        </div>

        {selectedIds.size > 0 && (
          <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-foreground">{selectedIds.size} {t('dashboard.blog.selected')}</span>
            <div className="h-4 w-px bg-border" />
            <button onClick={handleBulkDelete} className="text-sm text-destructive hover:underline flex items-center gap-1">
              <Trash2 className="h-3.5 w-3.5" />{t('dashboard.blog.bulkDelete')}
            </button>
            <button onClick={() => handleBulkAction('publish')} className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              <Send className="h-3.5 w-3.5" />{t('dashboard.blog.bulkPublish')}
            </button>
            <button onClick={() => handleBulkAction('unpublish')} className="text-sm text-muted-foreground hover:underline flex items-center gap-1">
              <Ban className="h-3.5 w-3.5" />{t('dashboard.blog.bulkUnpublish')}
            </button>
            <button onClick={() => handleBulkAction('feature')} className="text-sm text-secondary hover:underline flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />{t('dashboard.blog.bulkMarkFeatured')}
            </button>
            <button onClick={() => handleBulkAction('unfeature')} className="text-sm text-muted-foreground hover:underline flex items-center gap-1">
              <StarOff className="h-3.5 w-3.5" />{t('dashboard.blog.bulkRemoveFeatured')}
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={allSelected} onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.blog.featuredImage')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.blog.arabicTitle')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.blog.englishTitle')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.blog.category')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.blog.status')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.blog.featured')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.blog.publishDate')}</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.blog.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">{t('dashboard.blog.noBlog')}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.blog.noBlogDescription')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => {
                  const categoryClass = categoryColorMap[blog.category || ''] || '';
                  return (
                    <tr key={blog.id} className="hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/dashboard/blog/${blog.slug}`)}>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selectedIds.has(blog.id)} onChange={() => toggleSelect(blog.id)}
                          className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-10 w-14 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                          {blog.coverImage ? (
                            <img src={blog.coverImage} alt="" className="h-full w-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          ) : (
                            <ImageIcon className="h-4 w-4 text-muted-foreground/50" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{blog.titleAr}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{blog.title}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass}`}>
                          {blog.category ? t(`dashboard.blogPostDetails.${blog.category}`) : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                          blog.isPublished
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        }`}>
                          {blog.isPublished ? t('dashboard.blog.published_badge') : t('dashboard.blog.draft_badge')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {blog.isFeatured ? (
                          <Star className="h-4 w-4 text-secondary fill-secondary" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground/50" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => navigate(`/dashboard/blog/${blog.slug}`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title={t('dashboard.blog.view')}>
                            <Eye className="h-4 w-4" />
                          </button>
                          <button onClick={() => navigate(`/dashboard/blog/${blog.slug}/edit`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-primary transition-colors" title={t('dashboard.blog.edit')}>
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={(e) => handleDelete(e, blog.id)} disabled={deleteBlog.isPending}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors disabled:opacity-50" title={t('dashboard.blog.delete')}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('dashboard.blog.showing')}</span>
            <span className="font-medium text-foreground">{pagination?.total === 0 ? 0 : ((pagination?.page || 1) - 1) * (pagination?.limit || 10) + 1}</span>
            <span>{t('dashboard.blog.to')}</span>
            <span className="font-medium text-foreground">{Math.min((pagination?.page || 1) * (pagination?.limit || 10), pagination?.total || 0)}</span>
            <span>{t('dashboard.blog.of')}</span>
            <span className="font-medium text-foreground">{pagination?.total || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, currentPage - 2);
              const page = start + i;
              if (page > totalPages) return null;
              return (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === currentPage ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>
                  {page}
                </button>
              );
            })}
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages || totalPages === 0}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
