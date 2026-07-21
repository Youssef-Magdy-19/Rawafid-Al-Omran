import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@services/api/endpoints';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => ['dashboard', 'stats'] as const,
  overview: () => ['dashboard', 'overview'] as const,
  quickStats: () => ['dashboard', 'quick-stats'] as const,
  activity: () => ['dashboard', 'activity'] as const,
  chartData: () => ['dashboard', 'chart-data'] as const,
  notifications: () => ['dashboard', 'notifications'] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const res = await dashboardApi.getStats();
      const data = res.data.data;
      return {
        overview: data.overview,
        quickStats: data.quickStats,
        recentProjects: data.recentActivity?.projects || [],
        chartData: data.chartData,
      };
    },
  });
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: dashboardKeys.activity(),
    queryFn: async () => {
      const res = await dashboardApi.getRecentActivity();
      const data = res.data.data;
      const items: Array<{ _id: string; action: string; description: string; user: string; createdAt: string }> = [];
      data.contactMessages.forEach((c) => items.push({ _id: c._id, action: 'contact_message', description: `${c.name}: ${c.subject}`, user: c.name, createdAt: c.createdAt }));
      data.quoteRequests.forEach((q) => items.push({ _id: q._id, action: 'quote_received', description: `${q.name} - ${q.serviceType}`, user: q.name, createdAt: q.createdAt }));
      data.blogPosts.forEach((b) => items.push({ _id: b._id, action: 'blog_posted', description: b.title, user: 'System', createdAt: b.createdAt }));
      data.projects.forEach((p) => items.push({ _id: p._id, action: 'project_created', description: p.title, user: 'System', createdAt: p.createdAt }));
      return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
  });
}

export function useDashboardNotifications() {
  return useQuery({
    queryKey: dashboardKeys.notifications(),
    queryFn: async () => {
      const res = await dashboardApi.getNotifications();
      return res.data.data;
    },
  });
}

export function useDashboardChartData() {
  return useQuery({
    queryKey: dashboardKeys.chartData(),
    queryFn: async () => {
      const res = await dashboardApi.getChartData();
      return res.data.data;
    },
  });
}
