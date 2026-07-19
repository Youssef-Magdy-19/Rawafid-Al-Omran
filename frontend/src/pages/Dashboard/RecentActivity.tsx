import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Search, Filter, ChevronLeft, ChevronRight, Activity,
  Building2, FileText, FileSpreadsheet, Mail, MessageSquare,
  LogIn, Wrench, UserPlus, UserX,
} from 'lucide-react';
import { mockActivity } from '@data/activityMockData';

const activityIcons: Record<string, any> = {
  project_created: Building2,
  project_updated: Building2,
  service_updated: Wrench,
  team_joined: UserPlus,
  team_left: UserX,
  quote_received: FileSpreadsheet,
  quote_status: FileSpreadsheet,
  contact_message: Mail,
  blog_posted: FileText,
  testimonial_added: MessageSquare,
  login_activity: LogIn,
};

const activityColors: Record<string, string> = {
  project_created: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  project_updated: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  service_updated: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  team_joined: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  team_left: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  quote_received: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  quote_status: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  contact_message: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  blog_posted: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  testimonial_added: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
  login_activity: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
};

const activityTypeLabels: Record<string, string> = {
  project_created: 'projectCreated',
  project_updated: 'projectUpdated',
  service_updated: 'serviceUpdated',
  team_joined: 'teamJoined',
  team_left: 'teamLeft',
  quote_received: 'quoteReceived',
  quote_status: 'quoteStatus',
  contact_message: 'contactMessage',
  blog_posted: 'blogPosted',
  testimonial_added: 'testimonialAdded',
  login_activity: 'loginActivity',
};

export function RecentActivity() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filtered = useMemo(() => {
    let result = [...mockActivity];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.user.name.toLowerCase().includes(q));
    }
    if (typeFilter !== 'all') result = result.filter((a) => a.type === typeFilter);
    result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return result;
  }, [search, typeFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const hasActiveFilters = search || typeFilter !== 'all';
  const clearFilters = () => { setSearch(''); setTypeFilter('all'); setCurrentPage(1); };

  const activityTypes = Object.keys(activityTypeLabels) as (keyof typeof activityTypeLabels)[];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard.activity.pageTitle')}</h1>
            <p className="text-muted-foreground mt-1">{t('dashboard.activity.pageDescription')}</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
        className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder={t('dashboard.activity.searchPlaceholder')}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
              className="h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="all">{t('dashboard.activity.allTypes')}</option>
              {activityTypes.map((type) => (
                <option key={type} value={type}>{t(`dashboard.activity.${activityTypeLabels[type]}`)}</option>
              ))}
            </select>
            {hasActiveFilters && (
              <button onClick={clearFilters}
                className="inline-flex items-center gap-1 h-10 px-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <Filter className="h-4 w-4" />{t('dashboard.activity.clear')}
              </button>
            )}
          </div>
        </div>

        {paginated.length === 0 ? (
          <div className="py-16 text-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mt-4">{t('dashboard.activity.emptyTitle')}</p>
            <p className="text-sm text-muted-foreground mt-1">{t('dashboard.activity.emptyDescription')}</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-6">
                {paginated.map((entry) => {
                  const Icon = activityIcons[entry.type] || Activity;
                  const colorClass = activityColors[entry.type] || 'bg-muted text-muted-foreground';
                  return (
                    <motion.div key={entry.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                      className="relative pl-14">
                      <div className={`absolute left-3 top-1 h-10 w-10 rounded-xl border flex items-center justify-center ${colorClass} z-10`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="rounded-xl border border-border bg-card/50 p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-foreground">{entry.title}</span>
                              <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                {t(`dashboard.activity.${activityTypeLabels[entry.type]}`)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{entry.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-foreground">
                                {entry.user.name.charAt(0)}
                              </div>
                              <span className="text-xs text-muted-foreground">{entry.user.name}</span>
                              <span className="text-xs text-muted-foreground">·</span>
                              <span className="text-xs text-muted-foreground">{entry.relativeTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {t('dashboard.activity.showing')} {filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} {t('dashboard.activity.to')} {Math.min(currentPage * itemsPerPage, filtered.length)} {t('dashboard.activity.of')} {filtered.length}
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
