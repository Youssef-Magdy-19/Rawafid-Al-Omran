import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Search, Filter, CheckCheck, Trash2, ChevronLeft, ChevronRight,
  Bell, BellOff, Building2, FileSpreadsheet, Mail, Users, Settings,
  FileText, MessageSquare,
} from 'lucide-react';
import { useDashboardNotifications } from '@hooks/dashboard/useDashboard';
import { TableSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { Dropdown } from '@components/ui/Dropdown';

const categoryIcons: Record<string, any> = {
  project: Building2,
  quote: FileSpreadsheet,
  message: Mail,
  team: Users,
  system: Settings,
  blog: FileText,
  testimonial: MessageSquare,
};

const categoryColors: Record<string, string> = {
  project: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  quote: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  message: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  team: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  system: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  blog: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  testimonial: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

const notificationCategories = [
  { key: 'all', labelEn: 'All', labelAr: 'الكل' },
  { key: 'project', labelEn: 'Projects', labelAr: 'المشاريع' },
  { key: 'quote', labelEn: 'Quotes', labelAr: 'طلبات السعر' },
  { key: 'message', labelEn: 'Messages', labelAr: 'الرسائل' },
  { key: 'team', labelEn: 'Team', labelAr: 'الفريق' },
  { key: 'system', labelEn: 'System', labelAr: 'النظام' },
  { key: 'blog', labelEn: 'Blog', labelAr: 'المدونة' },
  { key: 'testimonial', labelEn: 'Testimonials', labelAr: 'آراء العملاء' },
];

export function NotificationsCenter() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { data: apiNotifications, isLoading, error } = useDashboardNotifications();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; category: string; isRead: boolean; createdAt: string }>>([]);

  useEffect(() => {
    if (apiNotifications) {
      setNotifications(apiNotifications.map((n: any) => ({
        id: n._id,
        title: n.title,
        message: n.message || '',
        category: n.type || 'system',
        isRead: n.isRead,
        createdAt: n.createdAt,
      })));
    }
  }, [apiNotifications]);

  const filtered = useMemo(() => {
    let result = [...notifications];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((n) => n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q));
    }
    if (categoryFilter !== 'all') result = result.filter((n) => n.category === categoryFilter);
    if (readFilter === 'read') result = result.filter((n) => n.isRead);
    else if (readFilter === 'unread') result = result.filter((n) => !n.isRead);
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }, [notifications, search, categoryFilter, readFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const hasActiveFilters = search || categoryFilter !== 'all' || readFilter !== 'all';

  const markAsRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  const markAllAsRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  const deleteNotification = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const clearFilters = () => { setSearch(''); setCategoryFilter('all'); setReadFilter('all'); setCurrentPage(1); };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  if (isLoading) return <div className="space-y-4"><TableSkeleton rows={5} /></div>;
  if (error) return <ErrorState message={t('common.error')} onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.notifications.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.notifications.pageDescription')}</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <CheckCheck className="h-4 w-4" />{t('dashboard.notifications.markAllRead')}
          </button>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
        className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={t('dashboard.notifications.searchPlaceholder')}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <Dropdown
              value={categoryFilter}
              onChange={(val) => { setCategoryFilter(val); setCurrentPage(1); }}
              options={notificationCategories.map((cat) => ({ value: cat.key, label: isRtl ? cat.labelAr : cat.labelEn }))}
              className="w-48"
            />
            <Dropdown
              value={readFilter}
              onChange={(val) => { setReadFilter(val); setCurrentPage(1); }}
              placeholder={t('dashboard.notifications.all')}
              options={[
                { value: 'unread', label: t('dashboard.notifications.unread') },
                { value: 'read', label: t('dashboard.notifications.read') },
              ]}
              className="w-44"
            />
            {hasActiveFilters && (
              <button onClick={clearFilters}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <Filter className="h-4 w-4" />{t('dashboard.notifications.clear')}
              </button>
            )}
          </div>
        </div>

        {paginated.length === 0 ? (
          <div className="py-16 text-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
              <BellOff className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mt-4">{t('dashboard.notifications.emptyTitle')}</p>
            <p className="text-sm text-muted-foreground mt-1">{t('dashboard.notifications.emptyDescription')}</p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {paginated.map((notif) => {
              const Icon = categoryIcons[notif.category] || Bell;
              const colorClass = categoryColors[notif.category] || 'bg-muted text-muted-foreground';
              return (
                <div key={notif.id}
                  className={`flex items-start gap-4 p-4 transition-colors ${notif.isRead ? '' : 'bg-primary/5'} hover:bg-muted/50`}>
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm ${notif.isRead ? 'text-foreground' : 'text-foreground font-semibold'}`}>{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{formatDate(notif.createdAt)}</span>
                        {!notif.isRead && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      {!notif.isRead && (
                        <button onClick={() => markAsRead(notif.id)}
                          className="text-xs text-primary hover:underline flex items-center gap-1">
                          <CheckCheck className="h-3 w-3" />{t('dashboard.notifications.markRead')}
                        </button>
                      )}
                      <button onClick={() => deleteNotification(notif.id)}
                        className="text-xs text-destructive hover:underline flex items-center gap-1">
                        <Trash2 className="h-3 w-3" />{t('dashboard.notifications.delete')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {t('dashboard.notifications.showing')} {filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} {t('dashboard.notifications.to')} {Math.min(currentPage * itemsPerPage, filtered.length)} {t('dashboard.notifications.of')} {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-muted-foreground px-2">{currentPage} / {totalPages}</span>
              <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
