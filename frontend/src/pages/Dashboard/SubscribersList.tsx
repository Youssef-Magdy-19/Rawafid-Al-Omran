import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, SlidersHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, X, ArrowUpDown,
  Users, MailPlus, MailX,
} from 'lucide-react';
import { mockSubscribers } from '@data/newsletterMockData';

type SortField = 'subscribedAt' | 'email' | 'name';
type SortOrder = 'asc' | 'desc';

export function SubscribersList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('subscribedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  const sources = useMemo(() => [...new Set(mockSubscribers.map((s) => s.source))], []);

  const filtered = useMemo(() => {
    let result = [...mockSubscribers];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.email.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }
    if (statusFilter === 'active') result = result.filter((s) => s.isActive);
    else if (statusFilter === 'unsubscribed') result = result.filter((s) => !s.isActive);
    if (sourceFilter !== 'all') result = result.filter((s) => s.source === sourceFilter);
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'subscribedAt') cmp = a.subscribedAt.localeCompare(b.subscribedAt);
      else if (sortField === 'email') cmp = a.email.localeCompare(b.email);
      else if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [search, statusFilter, sourceFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const hasActiveFilters = search || statusFilter !== 'all' || sourceFilter !== 'all';
  const clearFilters = () => { setSearch(''); setStatusFilter('all'); setSourceFilter('all'); setCurrentPage(1); };

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
              <SlidersHorizontal className="h-4 w-4" /><span className="hidden sm:inline">{t('dashboard.subscribers.filterStatus')}</span>
            </button>
          </div>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-3 pt-2">
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">{t('dashboard.subscribers.allStatuses')}</option>
                <option value="active">{t('dashboard.subscribers.active')}</option>
                <option value="unsubscribed">{t('dashboard.subscribers.unsubscribed')}</option>
              </select>
              <select value={sourceFilter} onChange={(e) => { setSourceFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">{t('dashboard.subscribers.allSources')}</option>
                {sources.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
              <select value={sortField} onChange={(e) => setSortField(e.target.value as SortField)}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="subscribedAt">{t('dashboard.subscribers.sortDate')}</option>
                <option value="email">{t('dashboard.subscribers.sortEmail')}</option>
                <option value="name">{t('dashboard.subscribers.sortName')}</option>
              </select>
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                <ArrowUpDown className="h-4 w-4" />{sortOrder === 'asc' ? t('dashboard.subscribers.ascending') : t('dashboard.subscribers.descending')}
              </button>
              {hasActiveFilters && (<button onClick={clearFilters}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <X className="h-4 w-4" />Clear</button>)}
            </motion.div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.email')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.name')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.status')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.source')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.subscribedDate')}</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.subscribers.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginated.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm font-medium text-foreground">{t('dashboard.subscribers.noSubscribers')}</p>
                    <p className="text-xs text-muted-foreground">{t('dashboard.subscribers.noSubscribersDescription')}</p>
                  </div>
                </td></tr>
              ) : (
                paginated.map((sub) => (
                  <tr key={sub.id} className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/subscribers/${sub.id}`)}>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{sub.email}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{sub.name}</td>
                    <td className="px-4 py-3">
                      {sub.isActive
                        ? <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"><MailPlus className="h-3 w-3" />{t('dashboard.subscribers.active_badge')}</span>
                        : <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"><MailX className="h-3 w-3" />{t('dashboard.subscribers.unsubscribed_badge')}</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{sub.source}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{sub.subscribedAt}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => navigate(`/dashboard/subscribers/${sub.id}`)}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Eye className="h-4 w-4" /></button>
                        <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
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
            <span className="font-medium text-foreground">{filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>
            <span>{t('dashboard.subscribers.to')}</span>
            <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filtered.length)}</span>
            <span>{t('dashboard.subscribers.of')}</span>
            <span className="font-medium text-foreground">{filtered.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="h-9 px-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value={5}>5</option><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option>
            </select>
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
        </div>
      </motion.div>
    </div>
  );
}
