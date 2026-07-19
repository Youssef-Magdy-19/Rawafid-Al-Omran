import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  ArrowUpDown,
  HelpCircle,
  Send,
  Ban,
  Star,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { mockFaqs, faqCategoryLabels } from '@data/faqMockData';

const categoryColorMap: Record<string, string> = {
  general: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  pricing: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  process: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  technical: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

type SortField = 'questionEn' | 'displayOrder' | 'category';
type SortOrder = 'asc' | 'desc';

export function FaqList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('displayOrder');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = useMemo(() => {
    let result = [...mockFaqs];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) =>
          f.questionAr.includes(q) ||
          f.questionEn.toLowerCase().includes(q) ||
          f.answerAr.includes(q) ||
          f.answerEn.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'all') result = result.filter((f) => f.category === categoryFilter);
    if (activeFilter === 'active') result = result.filter((f) => f.isActive);
    else if (activeFilter === 'inactive') result = result.filter((f) => !f.isActive);
    if (featuredFilter === 'featured') result = result.filter((f) => f.featured);
    else if (featuredFilter === 'nonFeatured') result = result.filter((f) => !f.featured);
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'questionEn') cmp = a.questionEn.localeCompare(b.questionEn);
      else if (sortField === 'displayOrder') cmp = a.displayOrder - b.displayOrder;
      else if (sortField === 'category') cmp = a.category.localeCompare(b.category);
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [search, categoryFilter, activeFilter, featuredFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const allSelected = paginated.length > 0 && paginated.every((f) => selectedIds.has(f.id));
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };
  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginated.map((f) => f.id)));
  };
  const hasActiveFilters = search || categoryFilter !== 'all' || activeFilter !== 'all' || featuredFilter !== 'all';
  const clearFilters = () => { setSearch(''); setCategoryFilter('all'); setActiveFilter('all'); setFeaturedFilter('all'); setCurrentPage(1); };
  const categoryOptions = Object.entries(faqCategoryLabels);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.faq.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.faq.pageDescription')}</p>
        </div>
        <button onClick={() => navigate(ROUTES.DASHBOARD_FAQ_ADD)}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4" />{t('dashboard.faq.addNew')}
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={t('dashboard.faq.searchPlaceholder')}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-lg border text-sm font-medium transition-colors ${showFilters || hasActiveFilters ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard.faq.filterCategory')}</span>
            </button>
          </div>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-3 pt-2">
              <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">{t('dashboard.faq.allCategories')}</option>
                {categoryOptions.map(([key]) => (
                  <option key={key} value={key}>{t(`faq.categories.${key}` as any)}</option>
                ))}
              </select>
              <select value={activeFilter} onChange={(e) => { setActiveFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">{t('dashboard.faq.all')}</option>
                <option value="active">{t('dashboard.faq.active')}</option>
                <option value="inactive">{t('dashboard.faq.inactive')}</option>
              </select>
              <select value={featuredFilter} onChange={(e) => { setFeaturedFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">{t('dashboard.faq.all')}</option>
                <option value="featured">{t('dashboard.faq.featured')}</option>
                <option value="nonFeatured">{t('dashboard.faq.inactive')}</option>
              </select>
              <select value={sortField} onChange={(e) => setSortField(e.target.value as SortField)}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="displayOrder">{t('dashboard.faq.sortOrder')}</option>
                <option value="questionEn">{t('dashboard.faq.sortQuestion')}</option>
                <option value="category">{t('dashboard.faq.category')}</option>
              </select>
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === 'asc' ? t('dashboard.faq.ascending') : t('dashboard.faq.descending')}
              </button>
              {hasActiveFilters && (
                <button onClick={clearFilters}
                  className="inline-flex items-center gap-1 h-10 px-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <X className="h-4 w-4" />Clear
                </button>
              )}
            </motion.div>
          )}
        </div>

        {selectedIds.size > 0 && (
          <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-foreground">{selectedIds.size} {t('dashboard.faq.selected')}</span>
            <div className="h-4 w-px bg-border" />
            <button className="text-sm text-destructive hover:underline flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" />{t('dashboard.faq.bulkDelete')}</button>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"><Send className="h-3.5 w-3.5" />{t('dashboard.faq.bulkActivate')}</button>
            <button className="text-sm text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"><Ban className="h-3.5 w-3.5" />{t('dashboard.faq.bulkDeactivate')}</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 w-10"><input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="h-4 w-4 rounded border-input text-primary focus:ring-primary" /></th>
                <th className="w-10 px-4 py-3" />
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faq.questionAr')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faq.questionEn')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faq.category')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faq.displayOrder')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faq.status')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faq.featured')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faq.createdDate')}</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faq.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <HelpCircle className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">{t('dashboard.faq.noFaq')}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.faq.noFaqDescription')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((faq) => (
                  <tbody key={faq.id} className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/dashboard/faq/${faq.id}`)}>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selectedIds.has(faq.id)} onChange={() => toggleSelect(faq.id)}
                          className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleExpand(faq.id); }}
                          className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          {expandedId === faq.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground font-medium max-w-[200px] truncate">{faq.questionAr}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground max-w-[200px] truncate">{faq.questionEn}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColorMap[faq.category] || ''}`}>
                          {t(`faq.categories.${faq.category}` as any)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{faq.displayOrder}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${faq.isActive ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'}`}>
                          {faq.isActive ? t('dashboard.faq.active_badge') : t('dashboard.faq.inactive_badge')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {faq.featured && (
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                            <Star className="h-3 w-3 mr-1" />
                            {t('dashboard.faq.featured_badge')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{faq.createdAt}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => navigate(`/dashboard/faq/${faq.id}`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => navigate(`/dashboard/faq/${faq.id}/edit`)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-primary transition-colors"><Pencil className="h-4 w-4" /></button>
                          <button onClick={(e) => e.stopPropagation()}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {expandedId === faq.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <td colSpan={10} className="px-4 py-3 bg-muted/30">
                            <div className="text-sm text-foreground leading-relaxed">
                              <p className="text-xs text-muted-foreground mb-1">{t('dashboard.faqDetails.arabicAnswer')}</p>
                              <p className="mb-3">{faq.answerAr}</p>
                              <p className="text-xs text-muted-foreground mb-1">{t('dashboard.faqDetails.englishAnswer')}</p>
                              <p>{faq.answerEn}</p>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('dashboard.faq.showing')}</span>
            <span className="font-medium text-foreground">{filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>
            <span>{t('dashboard.faq.to')}</span>
            <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filtered.length)}</span>
            <span>{t('dashboard.faq.of')}</span>
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
