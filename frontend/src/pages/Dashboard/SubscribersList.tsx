import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, SlidersHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, X, ArrowUpDown,
  Users, MailPlus, MailX,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useSubscribersList, useDeleteSubscriber, useUpdateSubscriber } from '@hooks/dashboard';
import { useToast } from '@providers/ToastProvider';
import { LoadingSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';
import { Dropdown } from '@components/ui/Dropdown';

export function SubscribersList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'createdAt' | 'email'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = { page: String(currentPage), limit: String(itemsPerPage) };
    if (search) params.search = search;
    if (statusFilter === 'active') params.isActive = 'true';
    else if (statusFilter === 'inactive') params.isActive = 'false';
    if (sortField) params.sortBy = sortField;
    if (sortOrder) params.sortOrder = sortOrder;
    return params;
  }, [search, statusFilter, sortField, sortOrder, currentPage, itemsPerPage]);

  const { data, isLoading, isError, refetch } = useSubscribersList(queryParams);
  const deleteSubscriber = useDeleteSubscriber();
  const updateSubscriber = useUpdateSubscriber();

  const subscribers = data?.subscribers || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 0;

  const allSelected = subscribers.length > 0 && subscribers.every((s) => selectedIds.has(s._id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };
  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set()); else setSelectedIds(new Set(subscribers.map((s) => s._id)));
  };

  const handleBulkAction = (action: 'activate' | 'deactivate') => {
    selectedIds.forEach((id) => updateSubscriber.mutate({ id, data: { isActive: action === 'activate' } }));
    addToast(t(`dashboard.subscribers.bulk${action === 'activate' ? 'Activated' : 'Deactivated'}`), 'success');
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => deleteSubscriber.mutate(id));
    addToast(t('dashboard.subscribers.bulkDeleted'), 'success');
    setSelectedIds(new Set());
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteSubscriber.mutate(id, {
      onSuccess: () => { addToast(t('dashboard.subscribers.deletedSuccess'), 'success'); setSelectedIds((prev) => { const n = new Set(prev); n.delete(id); return n; }); },
      onError: () => addToast(t('common.error'), 'error'),
    });
  };

  const clearFilters = () => { setSearch(''); setStatusFilter('all'); setCurrentPage(1); };
  const hasActiveFilters = search || statusFilter !== 'all';

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div><LoadingSkeleton className="h-8 w-48" /><LoadingSkeleton className="h-4 w-64 mt-2" /></div>
        </div>
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <LoadingSkeleton className="h-10 w-full" /><LoadingSkeleton className="h-6 w-full" count={5} />
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
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.subscribers.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.subscribers.pageDescription')}</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={t('dashboard.subscribers.searchPlaceholder')}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-lg border text-sm font-medium transition-colors ${showFilters || hasActiveFilters ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <SlidersHorizontal className="h-4 w-4" /><span className="hidden sm:inline">{t('dashboard.subscribers.filterRead')}</span>
            </button>
          </div>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-3 pt-2">
              <Dropdown
                value={statusFilter}
                onChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}
                placeholder={t('dashboard.subscribers.all')}
                options={[
                  { value: 'active', label: t('dashboard.subscribers.active') },
                  { value: 'inactive', label: t('dashboard.subscribers.inactive') },
                ]}
                className="w-44"
              />
              <Dropdown
                value={sortField}
                onChange={(val) => setSortField(val as 'createdAt' | 'email')}
                placeholder={t('dashboard.subscribers.sortDate')}
                options={[
                  { value: 'createdAt', label: t('dashboard.subscribers.sortDate') },
                  { value: 'email', label: t('dashboard.subscribers.sortEmail') },
                ]}
                className="w-44"
              />
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                <ArrowUpDown className="h-4 w-4" />{sortOrder === 'asc' ? t('dashboard.subscribers.ascending') : t('dashboard.subscribers.descending')}
              </button>
              {hasActiveFilters && (<button onClick={clearFilters}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <X className="h-4 w-4" />{t('common.clear')}</button>)}
            </motion.div>
          )}
        </div>

        {selectedIds.size > 0 && (
          <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-foreground">{selectedIds.size} {t('dashboard.subscribers.selected')}</span>
            <div className="h-4 w-px bg-border" />
            <button onClick={handleBulkDelete} className="text-sm text-destructive hover:underline flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" />{t('dashboard.subscribers.bulkDelete')}</button>
            <button onClick={() => handleBulkAction('activate')} className="text-sm text-emerald-600 hover:underline flex items-center gap-1"><MailPlus className="h-3.5 w-3.5" />{t('dashboard.subscribers.bulkActivate')}</button>
            <button onClick={() => handleBulkAction('deactivate')} className="text-sm text-amber-600 hover:underline flex items-center gap-1"><MailX className="h-3.5 w-3.5" />{t('dashboard.subscribers.bulkDeactivate')}</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 w-10"><input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="h-4 w-4 rounded border-input text-primary focus:ring-primary" /></th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.email')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.status')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.subscribedDate')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.createdDate')}</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {subscribers.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm font-medium text-foreground">{t('dashboard.subscribers.noSubscribers')}</p>
                    <p className="text-xs text-muted-foreground">{t('dashboard.subscribers.noSubscribersDescription')}</p>
                  </div>
                </td></tr>
              ) : (
                subscribers.map((s) => (
                  <tr key={s._id} className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(ROUTES.DASHBOARD_SUBSCRIBERS_DETAILS.replace(':id', s._id))}>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={selectedIds.has(s._id)} onChange={() => toggleSelect(s._id)} className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{s.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.isActive ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'}`}>
                        {s.isActive ? t('dashboard.subscribers.active_badge') : t('dashboard.subscribers.inactive_badge')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => navigate(ROUTES.DASHBOARD_SUBSCRIBERS_DETAILS.replace(':id', s._id))}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Eye className="h-4 w-4" /></button>
                        <button onClick={(e) => handleDelete(e, s._id)} disabled={deleteSubscriber.isPending}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
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
            <span>{t('dashboard.subscribers.showing')}</span>
            <span className="font-medium text-foreground">{pagination?.total === 0 ? 0 : ((pagination?.page || 1) - 1) * (pagination?.limit || 10) + 1}</span>
            <span>{t('dashboard.subscribers.to')}</span>
            <span className="font-medium text-foreground">{Math.min((pagination?.page || 1) * (pagination?.limit || 10), pagination?.total || 0)}</span>
            <span>{t('dashboard.subscribers.of')}</span>
            <span className="font-medium text-foreground">{pagination?.total || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="h-4 w-4" /></button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, currentPage - 2); const page = start + i;
              if (page > totalPages) return null;
              return (<button key={page} onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === currentPage ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{page}</button>);
            })}
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages || totalPages === 0}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
