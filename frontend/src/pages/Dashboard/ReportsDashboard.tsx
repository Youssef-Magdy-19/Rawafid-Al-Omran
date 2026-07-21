import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, TrendingDown, Download, Printer,
  Building2, Users, FileSpreadsheet, Mail, HardHat, MessageSquare,
  PieChart, Activity,
} from 'lucide-react';
import { useDashboardStats } from '@hooks/dashboard/useDashboard';
import { CardSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { Dropdown } from '@components/ui/Dropdown';

// TODO: Backend API does not provide monthly growth data.
// Replace with real data from GET /dashboard/chart-data when endpoint returns typed chart data.
const monthlyGrowth = [
  { month: 'Jan', projects: 3, revenue: 1200000, clients: 5 },
  { month: 'Feb', projects: 5, revenue: 2100000, clients: 7 },
  { month: 'Mar', projects: 4, revenue: 1800000, clients: 6 },
  { month: 'Apr', projects: 7, revenue: 3200000, clients: 9 },
  { month: 'May', projects: 6, revenue: 2800000, clients: 8 },
  { month: 'Jun', projects: 8, revenue: 3850000, clients: 11 },
  { month: 'Jul', projects: 5, revenue: 2400000, clients: 6 },
  { month: 'Aug', projects: 6, revenue: 2900000, clients: 7 },
  { month: 'Sep', projects: 7, revenue: 3500000, clients: 9 },
  { month: 'Oct', projects: 9, revenue: 4100000, clients: 10 },
  { month: 'Nov', projects: 4, revenue: 1900000, clients: 5 },
  { month: 'Dec', projects: 6, revenue: 3100000, clients: 8 },
];

// TODO: Backend API does not provide project category breakdowns.
// Replace with real data from GET /dashboard/chart-data when available.
const projectStats = [
  { category: 'سكني', count: 52, percentage: 33 },
  { category: 'تجاري', count: 38, percentage: 24 },
  { category: 'صناعي', count: 25, percentage: 16 },
  { category: 'بنية تحتية', count: 22, percentage: 14 },
  { category: 'ترميم', count: 19, percentage: 13 },
];

// TODO: Backend API does not provide per-service booking/revenue stats.
// Replace with real data from GET /dashboard/chart-data when available.
const serviceStats = [
  { name: 'بناء سكني', bookings: 45, revenue: '18,500,000 SAR', growth: 12 },
  { name: 'تشطيب داخلي', bookings: 38, revenue: '8,200,000 SAR', growth: 8 },
  { name: 'مشروع تجاري', bookings: 28, revenue: '14,800,000 SAR', growth: 15 },
  { name: 'تصميم معماري', bookings: 22, revenue: '3,600,000 SAR', growth: 5 },
  { name: 'صيانة وتشغيل', bookings: 18, revenue: '5,300,000 SAR', growth: -3 },
  { name: 'بنية تحتية', bookings: 15, revenue: '9,000,000 SAR', growth: 10 },
];

// TODO: Backend API does not provide per-status quote breakdowns.
// Replace with real data from GET /dashboard/chart-data when available.
const quoteStats = [
  { status: 'pending', count: 12 },
  { status: 'reviewed', count: 8 },
  { status: 'inProgress', count: 15 },
  { status: 'completed', count: 42 },
  { status: 'rejected', count: 6 },
];

// TODO: Backend API does not provide monthly contact message stats.
// Replace with real data from GET /dashboard/chart-data when available.
const contactStats = [
  { month: 'Jan', received: 18, replied: 15 },
  { month: 'Feb', received: 22, replied: 19 },
  { month: 'Mar', received: 15, replied: 14 },
  { month: 'Apr', received: 28, replied: 24 },
  { month: 'May', received: 20, replied: 18 },
  { month: 'Jun', received: 32, replied: 28 },
  { month: 'Jul', received: 25, replied: 22 },
  { month: 'Aug', received: 19, replied: 17 },
  { month: 'Sep', received: 27, replied: 25 },
  { month: 'Oct', received: 30, replied: 26 },
  { month: 'Nov', received: 22, replied: 20 },
  { month: 'Dec', received: 35, replied: 31 },
];

export function ReportsDashboard() {
  const { t } = useTranslation();
  const { data: stats, isLoading, error } = useDashboardStats();
  const [dateRange, setDateRange] = useState('year');

  const KpiCard = ({ icon: Icon, label, value, trend, trendUp, color }: { icon: any; label: string; value: string; trend?: string; trendUp?: boolean; color: string }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`h-12 w-12 rounded-xl border flex items-center justify-center ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {trendUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {trend}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground mt-4">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );

  const ChartPlaceholder = ({ title, height = 'h-64', children }: { title: string; height?: string; children: React.ReactNode }) => (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span>{t('dashboard.reports.placeholder')}</span>
        </div>
      </div>
      <div className={`p-6 ${height} flex items-center justify-center`}>
        {children}
      </div>
    </div>
  );

  const BarPreview = ({ data }: { data: { label: string; value: number }[] }) => (
    <div className="w-full h-full flex items-end gap-2 px-4">
      {data.map((item, idx) => {
        const maxVal = Math.max(...data.map((d) => d.value));
        const pct = (item.value / maxVal) * 100;
        return (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <span className="text-[10px] font-medium text-muted-foreground">{item.value}</span>
            <div className="w-full rounded-t-md transition-all duration-500" style={{ height: `${pct}%`, minHeight: '4px', backgroundColor: `var(--chart-${(idx % 5) + 1}, var(--primary))` }} />
            <span className="text-[10px] text-muted-foreground truncate w-full text-center">{item.label}</span>
          </div>
        );
      })}
    </div>
  );

  const typeColors: Record<string, string> = {
    building: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    users: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    dollar: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    file: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    mail: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    briefcase: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('dashboard.reports.pageTitle')}</h1>
          <p className="text-muted-foreground mt-1">{t('dashboard.reports.pageDescription')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Dropdown
            value={dateRange}
            onChange={(val) => setDateRange(val)}
            options={[
              { value: 'week', label: t('dashboard.reports.thisWeek') },
              { value: 'month', label: t('dashboard.reports.thisMonth') },
              { value: 'quarter', label: t('dashboard.reports.thisQuarter') },
              { value: 'year', label: t('dashboard.reports.thisYear') },
              { value: 'custom', label: t('dashboard.reports.custom') },
            ]}
          />
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            <Download className="h-4 w-4" />{t('dashboard.reports.export')}
          </button>
          <button onClick={() => window.print()}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            <Printer className="h-4 w-4" />{t('dashboard.reports.print')}
          </button>
        </div>
      </motion.div>

      {isLoading ? (
        <CardSkeleton count={8} />
      ) : error ? (
        <ErrorState message={t('common.error')} onRetry={() => window.location.reload()} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard icon={Building2} label={t('dashboard.reports.totalProjects')} value={String(stats?.overview.totalProjects ?? 0)} color={typeColors.building} />
            <KpiCard icon={HardHat} label={t('dashboard.reports.activeServices')} value={String(stats?.overview.totalServices ?? 0)} color={typeColors.building} />
            <KpiCard icon={Users} label={t('dashboard.reports.teamMembers')} value={String(stats?.overview.totalTeamMembers ?? 0)} color={typeColors.users} />
            <KpiCard icon={FileSpreadsheet} label={t('dashboard.reports.totalBlogPosts')} value={String(stats?.overview.totalBlogPosts ?? 0)} color={typeColors.file} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard icon={MessageSquare} label={t('dashboard.reports.totalTestimonials')} value={String(stats?.overview.totalTestimonials ?? 0)} color={typeColors.briefcase} />
            <KpiCard icon={Mail} label={t('dashboard.reports.contactMessages')} value={String(stats?.overview.totalContactMessages ?? 0)} color={typeColors.mail} />
            <KpiCard icon={FileSpreadsheet} label={t('dashboard.reports.pendingQuotes')} value={String(stats?.overview.totalQuoteRequests ?? 0)} color={typeColors.file} />
            <KpiCard icon={Users} label={t('dashboard.reports.subscribers')} value={String(stats?.overview.totalNewsletterSubscribers ?? 0)} color={typeColors.users} />
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <ChartPlaceholder title={t('dashboard.reports.monthlyGrowth')}>
            <BarPreview data={monthlyGrowth.map((m) => ({ label: m.month, value: m.revenue / 100000 }))} />
          </ChartPlaceholder>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
          <ChartPlaceholder title={t('dashboard.reports.projectsByCategory')}>
            <BarPreview data={projectStats.map((p) => ({ label: p.category, value: p.count }))} />
          </ChartPlaceholder>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{t('dashboard.reports.serviceStats')}</h3>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-4 space-y-3">
              {serviceStats.map((svc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{svc.name}</p>
                    <p className="text-xs text-muted-foreground">{svc.bookings} {t('dashboard.reports.bookings')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{svc.revenue}</p>
                    <p className={`text-xs font-medium ${svc.growth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {svc.growth >= 0 ? '+' : ''}{svc.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{t('dashboard.reports.quoteStats')}</h3>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-4 space-y-3">
              {quoteStats.map((qs, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{t(`dashboard.quoteRequests.${qs.status}_badge`)}</span>
                      <span className="text-sm font-semibold text-foreground">{qs.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{
                        width: `${(qs.count / Math.max(...quoteStats.map((q) => q.count))) * 100}%`,
                        backgroundColor: `var(--chart-${(idx % 5) + 1}, var(--primary))`,
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{t('dashboard.reports.contactStats')}</h3>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center h-48">
                <BarPreview data={contactStats.slice(-6).map((c) => ({ label: c.month, value: c.received }))} />
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: 'var(--chart-1, var(--primary))' }} />
                  {t('dashboard.reports.received')}
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-muted-foreground/30" />
                  {t('dashboard.reports.replied')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
        className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">{t('dashboard.reports.recentPerformance')}</h3>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {monthlyGrowth.slice(-4).map((m, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors">
                <p className="text-xs font-medium text-muted-foreground">{m.month}</p>
                <p className="text-lg font-bold text-foreground mt-1">{m.projects}</p>
                <p className="text-xs text-muted-foreground">{t('dashboard.reports.projects')}</p>
                <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-500">
                  <TrendingUp className="h-3 w-3" />{m.clients} {t('dashboard.reports.clients')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
