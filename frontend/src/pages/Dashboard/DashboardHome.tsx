import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  HardHat,
  CheckCircle2,
  PauseCircle,
  Plus,
  Eye,
  FileBarChart,
  Users,
  ArrowUpRight,
  MoreHorizontal,
} from 'lucide-react';
import { ROUTES } from '@constants/route.constants';
import { dashboardStats, recentProjects, type DashboardProject } from '@data/dashboardMockData';

const statCards = [
  {
    key: 'totalProjects',
    value: dashboardStats.totalProjects + dashboardStats.completedProjects,
    icon: Building2,
    color: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    key: 'ongoingProjects',
    value: dashboardStats.ongoingProjects,
    icon: HardHat,
    color: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary',
  },
  {
    key: 'completedProjects',
    value: dashboardStats.completedProjects,
    icon: CheckCircle2,
    color: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-500',
  },
  {
    key: 'onHoldProjects',
    value: dashboardStats.onHoldProjects,
    icon: PauseCircle,
    color: 'from-destructive/20 to-destructive/5',
    iconColor: 'text-destructive',
  },
];

const quickActions = [
  { key: 'newProject', icon: Plus, color: 'bg-primary text-primary-foreground', path: ROUTES.DASHBOARD_PROJECTS_ADD },
  { key: 'allProjects', icon: Eye, color: 'bg-secondary text-secondary-foreground', path: ROUTES.DASHBOARD_PROJECTS },
  { key: 'viewReports', icon: FileBarChart, color: 'bg-emerald-500 text-white', path: ROUTES.DASHBOARD_REPORTS },
  { key: 'manageTeam', icon: Users, color: 'bg-violet-500 text-white', path: ROUTES.DASHBOARD_TEAM },
];

const statusConfig: Record<string, { labelKey: string; color: string }> = {
  planning: { labelKey: 'dashboard.home.statusPlanning', color: 'bg-muted text-muted-foreground border-border' },
  inProgress: { labelKey: 'dashboard.home.statusInProgress', color: 'bg-primary/10 text-primary border-primary/20' },
  completed: { labelKey: 'dashboard.home.statusCompleted', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  onHold: { labelKey: 'dashboard.home.statusOnHold', color: 'bg-destructive/10 text-destructive border-destructive/20' },
  cancelled: { labelKey: 'dashboard.home.statusCancelled', color: 'bg-muted text-muted-foreground border-border' },
};

const categoryConfig: Record<string, { labelKey: string }> = {
  commercial: { labelKey: 'dashboard.home.categoryCommercial' },
  residential: { labelKey: 'dashboard.home.categoryResidential' },
  infrastructure: { labelKey: 'dashboard.home.categoryInfrastructure' },
  industrial: { labelKey: 'dashboard.home.categoryIndustrial' },
  educational: { labelKey: 'dashboard.home.categoryEducational' },
};

export function DashboardHome() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === 'ar';

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground">
          {t('dashboard.home.welcome')}, Ahmed
        </h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.home.welcomeMessage')}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-bl ${stat.color} opacity-60`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} ${stat.iconColor}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{t(`dashboard.home.${stat.key}`)}</p>
            </div>
          </motion.div>
        ))}
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
              {recentProjects.map((project: DashboardProject) => {
                const status = statusConfig[project.status];
                const category = categoryConfig[project.category];
                return (
                  <tr
                    key={project.id}
                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img
                            src={project.coverImage}
                            alt={isAr ? project.titleAr : project.titleEn}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {isAr ? project.titleAr : project.titleEn}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {t(category.labelKey)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                        {t(status.labelKey)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {project.createdAt}
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
