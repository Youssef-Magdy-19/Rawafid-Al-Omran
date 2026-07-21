import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  HardHat,
  CheckCircle2,
  Plus,
  Eye,
  FileBarChart,
  Users,
  ArrowUpRight,
  MoreHorizontal,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { useAuthStore } from '@store/authStore';
import { useDashboardStats } from '@hooks/dashboard';
import type { RecentProject } from '@services/api/types';
import { CardSkeleton } from '@components/ui/LoadingSkeleton';
import { ErrorState } from '@components/ui/ErrorState';

const overviewCards = [
  {
    key: 'totalProjects',
    icon: Building2,
    color: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    key: 'totalServices',
    icon: HardHat,
    color: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary',
  },
  {
    key: 'totalTeamMembers',
    icon: Users,
    color: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-500',
  },
  {
    key: 'totalTestimonials',
    icon: CheckCircle2,
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-500',
  },
];

const quickActions = [
  { key: 'newProject', icon: Plus, color: 'bg-primary text-primary-foreground', path: ROUTES.DASHBOARD_PROJECTS_ADD },
  { key: 'allProjects', icon: Eye, color: 'bg-secondary text-secondary-foreground', path: ROUTES.DASHBOARD_PROJECTS },
  { key: 'viewReports', icon: FileBarChart, color: 'bg-emerald-500 text-white', path: ROUTES.DASHBOARD_REPORTS },
  { key: 'manageTeam', icon: Users, color: 'bg-violet-500 text-white', path: ROUTES.DASHBOARD_TEAM },
];

const categoryConfig: Record<string, { labelKey: string }> = {
  commercial: { labelKey: 'dashboard.home.categoryCommercial' },
  residential: { labelKey: 'dashboard.home.categoryResidential' },
  infrastructure: { labelKey: 'dashboard.home.categoryInfrastructure' },
  industrial: { labelKey: 'dashboard.home.categoryIndustrial' },
  educational: { labelKey: 'dashboard.home.categoryEducational' },
};

export function DashboardHome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const { data: stats, isLoading, isError, refetch } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <CardSkeleton count={4} />
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  const statValues = stats
    ? overviewCards.map((card) => ({
        key: card.key,
        value: stats.overview[card.key as keyof typeof stats.overview] ?? 0,
      }))
    : [];

  const recentProjects = stats?.recentProjects || [];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground">
          {t('dashboard.home.welcome')}, {user?.firstName || 'User'}
        </h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.home.welcomeMessage')}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewCards.map((card, index) => {
          const statVal = statValues.find((s) => s.key === card.key);
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-bl ${card.color} opacity-60`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color} ${card.iconColor}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{statVal?.value ?? 0}</p>
                <p className="text-sm text-muted-foreground mt-1">{t(`dashboard.home.${card.key}`)}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-3">
          {t('dashboard.home.quickActions')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.key}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {t(`dashboard.home.${action.key}`)}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="rounded-xl border border-border bg-card shadow-sm"
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {t('dashboard.home.recentProjects')}
          </h2>
          <button
            onClick={() => navigate(ROUTES.DASHBOARD_PROJECTS)}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            {t('dashboard.home.viewAll')}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.home.projectName')}
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.home.category')}
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.home.status')}
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('dashboard.home.date')}
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {recentProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-muted-foreground">
                    {t('common.noData')}
                  </td>
                </tr>
              ) : (
                recentProjects.map((project: RecentProject) => {
                  const category = categoryConfig[project.category] || { labelKey: '' };
                  return (
                    <tr
                      key={project._id}
                      className="hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/dashboard/projects/${project.slug}`)}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted shrink-0 flex items-center justify-center text-muted-foreground">
                            <Building2 className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {project.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">
                        {category.labelKey ? t(category.labelKey) : project.category}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground border-border">
                          {project.isFeatured ? t('common.featured') : t('common.active')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ''}
                      </td>
                      <td className="px-5 py-3.5">
                        <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
