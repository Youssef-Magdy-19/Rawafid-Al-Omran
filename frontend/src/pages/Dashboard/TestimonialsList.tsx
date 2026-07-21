import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, Search, SlidersHorizontal, Eye, Pencil, Trash2,
  ChevronLeft, ChevronRight, X, ArrowUpDown, Star,
  MessageSquareQuote, Send, Ban,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useTestimonialsList, useDeleteTestimonial, useUpdateTestimonial } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';
import { Dropdown } from '@components/ui/Dropdown';

type SortField = 'name' | 'rating' | 'createdAt' | 'company';

export function TestimonialsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = { page: String(currentPage), limit: String(itemsPerPage) };
    if (search) params.search = search;
    if (ratingFilter !== 'all') params.rating = ratingFilter;
    if (statusFilter === 'active') params.isActive = 'true';
    else if (statusFilter === 'inactive') params.isActive = 'false';
    if (sortField) params.sortBy = sortField;
    if (sortOrder) params.sortOrder = sortOrder;
    return params;
  }, [search, ratingFilter, statusFilter, sortField, sortOrder, currentPage, itemsPerPage]);

  const { data, isLoading, isError, refetch } = useTestimonialsList(queryParams);
  const deleteTestimonial = useDeleteTestimonial();
  const updateTestimonial = useUpdateTestimonial();

  const testimonials = data?.testimonials || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 0;

  const allSelected = testimonials.length > 0 && testimonials.every((tst) => selectedIds.has(tst.id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(testimonials.map((tst) => tst.id)));
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteTestimonial.mutate(id, {
      onSuccess: () => {
        addToast(t('dashboard.testimonials.deletedSuccess'), 'success');
        setSelectedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => deleteTestimonial.mutate(id));
    addToast(t('dashboard.testimonials.bulkDeleted'), 'success');
    setSelectedIds(new Set());
  };

  const handleBulkAction = (action: 'activate' | 'deactivate') => {
    selectedIds.forEach((id) => {
      const payload: Record<string, unknown> = {};
      if (action === 'activate') payload.isActive = true;
      if (action === 'deactivate') payload.isActive = false;
      updateTestimonial.mutate({ id, data: payload });
    });
    const msg = action === 'activate' ? 'bulkActivated' : 'bulkDeactivated';
    addToast(t(`dashboard.testimonials.${msg}`), 'success');
    setSelectedIds(new Set());
  };

  const clearFilters = () => {
    setSearch('');
    setRatingFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || ratingFilter !== 'all' || statusFilter !== 'all';

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
    ));
  };

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
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.testimonials.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.testimonials.pageDescription')}</p>
        </div>
        <button onClick={() => navigate(ROUTES.DASHBOARD_TESTIMONIALS_ADD)}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4" />{t('dashboard.testimonials.addNew')}
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={t('dashboard.testimonials.searchPlaceholder')}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-lg border text-sm font-medium transition-colors ${showFilters || hasActiveFilters ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <SlidersHorizontal className="h-4 w-4" /><span className="hidden sm:inline">{t('dashboard.testimonials.filter')}</span>
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-3 pt-2">
              <Dropdown
                value={ratingFilter}
                onChange={(val) => { setRatingFilter(val); setCurrentPage(1); }}
                placeholder={t('dashboard.testimonials.allRatings')}
                options={[5, 4, 3, 2, 1].map((r) => ({ value: String(r), label: `${r} Stars` }))}
                className="w-44"
              />
              <Dropdown
                value={statusFilter}
                onChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
                placeholder={t('dashboard.testimonials.all')}
                options={[
                  { value: 'active', label: t('dashboard.testimonials.active') },
                  { value: 'inactive', label: t('dashboard.testimonials.inactive') },
                ]}
                className="w-44"
              />
              <Dropdown
                value={sortField}
                onChange={(val) => setSortField(val as SortField)}
                placeholder={t('dashboard.testimonials.sortName')}
                options={[
                  { value: 'name', label: t('dashboard.testimonials.sortName') },
                  { value: 'rating', label: t('dashboard.testimonials.sortRating') },
                  { value: 'createdAt', label: t('dashboard.testimonials.sortDate') },
                  { value: 'company', label: t('dashboard.testimonials.sortCompany') },
                ]}
                className="w-44"
              />
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                <ArrowUpDown className="h-4 w-4" />{sortOrder === 'asc' ? t('dashboard.testimonials.ascending') : t('dashboard.testimonials.descending')}
              </button>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="inline-flex items-center gap-1 h-10 px-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <X className="h-4 w-4" />{t('common.clear')}
                </button>
              )}
            </motion.div>
          )}
        </div>

        {selectedIds.size > 0 && (
          <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-foreground">{selectedIds.size} {t('dashboard.testimonials.selected')}</span>
            <div className="h-4 w-px bg-border" />
            <button onClick={handleBulkDelete} className="text-sm text-destructive hover:underline flex items-center gap-1">
              <Trash2 className="h-3.5 w-3.5" />{t('dashboard.testimonials.bulkDelete')}
            </button>
            <button onClick={() => handleBulkAction('activate')} className="text-sm text-emerald-600 hover:underline flex items-center gap-1">
              <Send className="h-3.5 w-3.5" />{t('dashboard.testimonials.bulkActivate')}
            </button>
            <button onClick={() => handleBulkAction('deactivate')} className="text-sm text-amber-600 hover:underline flex items-center gap-1">
              <Ban className="h-3.5 w-3.5" />{t('dashboard.testimonials.bulkDeactivate')}
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
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.testimonials.avatar')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.testimonials.clientName')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.testimonials.clientPosition')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.testimonials.companyName')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.testimonials.rating')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.testimonials.status')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.testimonials.createdDate')}</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.testimonials.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <MessageSquareQuote className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">{t('dashboard.testimonials.noTestimonials')}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.testimonials.noTestimonialsDescription')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                testimonials.map((tst) => (
                  <tr key={tst.id} className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(ROUTES.DASHBOARD_TESTIMONIALS_DETAILS.replace(':id', tst.id))}>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={selectedIds.has(tst.id)} onChange={() => toggleSelect(tst.id)}
                        className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-9 w-9 rounded-full overflow-hidden border border-border bg-muted">
                        {tst.image && <img src={tst.image} alt="" className="h-full w-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{tst.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{tst.position || '—'}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{tst.company || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-0.5">{renderStars(tst.rating || 0)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        tst.isActive
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                          : 'bg-muted text-muted-foreground border-border'
                      }`}>
                        {tst.isActive ? t('dashboard.testimonials.active_badge') : t('dashboard.testimonials.inactive_badge')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(tst.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => navigate(ROUTES.DASHBOARD_TESTIMONIALS_DETAILS.replace(':id', tst.id))}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title={t('dashboard.testimonials.view')}>
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => navigate(ROUTES.DASHBOARD_TESTIMONIALS_EDIT.replace(':id', tst.id))}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-primary transition-colors" title={t('dashboard.testimonials.edit')}>
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={(e) => handleDelete(e, tst.id)} disabled={deleteTestimonial.isPending}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors disabled:opacity-50" title={t('dashboard.testimonials.delete')}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('dashboard.testimonials.showing')}</span>
            <span className="font-medium text-foreground">{pagination?.total === 0 ? 0 : ((pagination?.page || 1) - 1) * (pagination?.limit || 10) + 1}</span>
            <span>{t('dashboard.testimonials.to')}</span>
            <span className="font-medium text-foreground">{Math.min((pagination?.page || 1) * (pagination?.limit || 10), pagination?.total || 0)}</span>
            <span>{t('dashboard.testimonials.of')}</span>
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
