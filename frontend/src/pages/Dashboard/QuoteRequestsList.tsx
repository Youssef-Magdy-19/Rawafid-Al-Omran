import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, SlidersHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, X, ArrowUpDown,
  FileSpreadsheet, Download,
} from 'lucide-react';
import { mockQuoteRequests, quoteStatusLabels, statusColorMap } from '@data/quoteRequestsMockData';

type SortField = 'createdAt' | 'customerName' | 'budget';
type SortOrder = 'asc' | 'desc';

export function QuoteRequestsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  const services = useMemo(() => [...new Set(mockQuoteRequests.map((q) => q.service))], []);

  const filtered = useMemo(() => {
    let result = [...mockQuoteRequests];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) => r.customerName.toLowerCase().includes(q) || r.companyName.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') result = result.filter((r) => r.status === statusFilter);
    if (serviceFilter !== 'all') result = result.filter((r) => r.service === serviceFilter);
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'createdAt') cmp = a.createdAt.localeCompare(b.createdAt);
      else if (sortField === 'customerName') cmp = a.customerName.localeCompare(b.customerName);
      else if (sortField === 'budget') cmp = a.budget.localeCompare(b.budget);
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [search, statusFilter, serviceFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const hasActiveFilters = search || statusFilter !== 'all' || serviceFilter !== 'all';
  const clearFilters = () => { setSearch(''); setStatusFilter('all'); setServiceFilter('all'); setCurrentPage(1); };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.quoteRequests.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.quoteRequests.pageDescription')}</p>
        </div>
        <button className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Download className="h-4 w-4" />{t('dashboard.quoteRequests.export')}
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={t('dashboard.quoteRequests.searchPlaceholder')}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-lg border text-sm font-medium transition-colors ${showFilters || hasActiveFilters ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <SlidersHorizontal className="h-4 w-4" /><span className="hidden sm:inline">{t('dashboard.quoteRequests.filterStatus')}</span>
            </button>
          </div>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-3 pt-2">
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">{t('dashboard.quoteRequests.allStatuses')}</option>
                {Object.entries(quoteStatusLabels).map(([key]) => (
                  <option key={key} value={key}>{t(`dashboard.quoteRequestDetails.${key}` as any)}</option>
                ))}
              </select>
              <select value={serviceFilter} onChange={(e) => { setServiceFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">{t('dashboard.quoteRequests.allServices')}</option>
                {services.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
              <select value={sortField} onChange={(e) => setSortField(e.target.value as SortField)}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="createdAt">{t('dashboard.quoteRequests.sortDate')}</option>
                <option value="customerName">{t('dashboard.quoteRequests.sortName')}</option>
                <option value="budget">{t('dashboard.quoteRequests.sortBudget')}</option>
              </select>
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                <ArrowUpDown className="h-4 w-4" />{sortOrder === 'asc' ? t('dashboard.quoteRequests.ascending') : t('dashboard.quoteRequests.descending')}
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
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.quoteRequests.customerName')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.quoteRequests.companyName')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.quoteRequests.service')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.quoteRequests.budget')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.quoteRequests.status')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.quoteRequests.createdDate')}</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.quoteRequests.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <FileSpreadsheet className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm font-medium text-foreground">{t('dashboard.quoteRequests.noQuotes')}</p>
                    <p className="text-xs text-muted-foreground">{t('dashboard.quoteRequests.noQuotesDescription')}</p>
                  </div>
                </td></tr>
              ) : (
                paginated.map((qr) => (
                  <tr key={qr.id} className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/quote-requests/${qr.id}`)}>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{qr.customerName}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{qr.companyName || '-'}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{qr.service}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{qr.budget}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColorMap[qr.status] || ''}`}>
                        {t(`dashboard.quoteRequests.${qr.status}_badge` as any)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{qr.createdAt}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => navigate(`/dashboard/quote-requests/${qr.id}`)}
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
            <span>{t('dashboard.quoteRequests.showing')}</span>
            <span className="font-medium text-foreground">{filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>
            <span>{t('dashboard.quoteRequests.to')}</span>
            <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filtered.length)}</span>
            <span>{t('dashboard.quoteRequests.of')}</span>
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
