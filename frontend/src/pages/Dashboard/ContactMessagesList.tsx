import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, SlidersHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, X, ArrowUpDown,
  Mail, MailOpen, Send, Archive, Ban,
} from 'lucide-react';
import { mockContactMessages } from '@data/contactMessagesMockData';

type SortField = 'createdAt' | 'senderName';
type SortOrder = 'asc' | 'desc';

export function ContactMessagesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [readFilter, setReadFilter] = useState<string>('all');
  const [repliedFilter, setRepliedFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...mockContactMessages];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((m) => m.senderName.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.message.toLowerCase().includes(q));
    }
    if (readFilter === 'read') result = result.filter((m) => m.isRead);
    else if (readFilter === 'unread') result = result.filter((m) => !m.isRead);
    if (repliedFilter === 'replied') result = result.filter((m) => m.isReplied);
    else if (repliedFilter === 'notReplied') result = result.filter((m) => !m.isReplied);
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'createdAt') cmp = a.createdAt.localeCompare(b.createdAt);
      else if (sortField === 'senderName') cmp = a.senderName.localeCompare(b.senderName);
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [search, readFilter, repliedFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const allSelected = paginated.length > 0 && paginated.every((m) => selectedIds.has(m.id));
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };
  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginated.map((m) => m.id)));
  };
  const hasActiveFilters = search || readFilter !== 'all' || repliedFilter !== 'all';
  const clearFilters = () => { setSearch(''); setReadFilter('all'); setRepliedFilter('all'); setCurrentPage(1); };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.contactMessages.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.contactMessages.pageDescription')}</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={t('dashboard.contactMessages.searchPlaceholder')}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 h-10 px-4 rounded-lg border text-sm font-medium transition-colors ${showFilters || hasActiveFilters ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <SlidersHorizontal className="h-4 w-4" /><span className="hidden sm:inline">{t('dashboard.contactMessages.filterRead')}</span>
            </button>
          </div>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-wrap gap-3 pt-2">
              <select value={readFilter} onChange={(e) => { setReadFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">{t('dashboard.contactMessages.all')}</option>
                <option value="read">{t('dashboard.contactMessages.read')}</option>
                <option value="unread">{t('dashboard.contactMessages.unread')}</option>
              </select>
              <select value={repliedFilter} onChange={(e) => { setRepliedFilter(e.target.value); setCurrentPage(1); }}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">{t('dashboard.contactMessages.all')}</option>
                <option value="replied">{t('dashboard.contactMessages.replied')}</option>
                <option value="notReplied">{t('dashboard.contactMessages.notReplied')}</option>
              </select>
              <select value={sortField} onChange={(e) => setSortField(e.target.value as SortField)}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="createdAt">{t('dashboard.contactMessages.sortDate')}</option>
                <option value="senderName">{t('dashboard.contactMessages.sortName')}</option>
              </select>
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
                <ArrowUpDown className="h-4 w-4" />{sortOrder === 'asc' ? t('dashboard.contactMessages.ascending') : t('dashboard.contactMessages.descending')}
              </button>
              {hasActiveFilters && (<button onClick={clearFilters}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <X className="h-4 w-4" />Clear</button>)}
            </motion.div>
          )}
        </div>

        {selectedIds.size > 0 && (
          <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-foreground">{selectedIds.size} {t('dashboard.contactMessages.selected')}</span>
            <div className="h-4 w-px bg-border" />
            <button className="text-sm text-destructive hover:underline flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" />{t('dashboard.contactMessages.bulkDelete')}</button>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"><MailOpen className="h-3.5 w-3.5" />{t('dashboard.contactMessages.bulkMarkRead')}</button>
            <button className="text-sm text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{t('dashboard.contactMessages.bulkMarkUnread')}</button>
            <button className="text-sm text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"><Archive className="h-3.5 w-3.5" />{t('dashboard.contactMessages.bulkArchive')}</button>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"><Ban className="h-3.5 w-3.5" />{t('dashboard.contactMessages.bulkUnarchive')}</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 w-10"><input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="h-4 w-4 rounded border-input text-primary focus:ring-primary" /></th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.contactMessages.senderName')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.contactMessages.subject')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.contactMessages.service')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.contactMessages.status')}</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.contactMessages.createdDate')}</th>
                <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.contactMessages.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Mail className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm font-medium text-foreground">{t('dashboard.contactMessages.noMessages')}</p>
                    <p className="text-xs text-muted-foreground">{t('dashboard.contactMessages.noMessagesDescription')}</p>
                  </div>
                </td></tr>
              ) : (
                paginated.map((msg) => (
                  <tr key={msg.id} className={`hover:bg-muted/50 transition-colors cursor-pointer ${!msg.isRead ? 'bg-primary/5' : ''}`}
                    onClick={() => navigate(`/dashboard/contact-messages/${msg.id}`)}>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={selectedIds.has(msg.id)} onChange={() => toggleSelect(msg.id)} className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!msg.isRead && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                        <span className={`text-sm ${msg.isRead ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>{msg.senderName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm max-w-[200px] truncate block ${msg.isRead ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>{msg.subject}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{msg.service}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {!msg.isRead && <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary border-primary/20">{t('dashboard.contactMessages.unread_badge')}</span>}
                        {msg.isReplied && <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"><Send className="h-2.5 w-2.5 mr-0.5" />{t('dashboard.contactMessages.replied_badge')}</span>}
                        {msg.isArchived && <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20"><Archive className="h-2.5 w-2.5 mr-0.5" />{t('dashboard.contactMessages.archived_badge')}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{msg.createdAt}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => navigate(`/dashboard/contact-messages/${msg.id}`)}
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
            <span>{t('dashboard.contactMessages.showing')}</span>
            <span className="font-medium text-foreground">{filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span>
            <span>{t('dashboard.contactMessages.to')}</span>
            <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filtered.length)}</span>
            <span>{t('dashboard.contactMessages.of')}</span>
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
