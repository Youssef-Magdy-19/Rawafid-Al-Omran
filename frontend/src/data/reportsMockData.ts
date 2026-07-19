export interface KpiData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRevenue: string;
  monthlyRevenue: string;
  teamMembers: number;
  activeClients: number;
  pendingQuotes: number;
}

export interface MonthlyGrowth {
  month: string;
  projects: number;
  revenue: number;
  clients: number;
}

export interface ProjectStat {
  category: string;
  count: number;
  percentage: number;
}

export interface ServiceStat {
  name: string;
  bookings: number;
  revenue: string;
  growth: number;
}

export interface QuoteStat {
  status: string;
  count: number;
}

export interface ContactStat {
  month: string;
  received: number;
  replied: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondary?: number;
}

export const kpiData: KpiData = {
  totalProjects: 156,
  activeProjects: 28,
  completedProjects: 118,
  totalRevenue: '52,400,000 SAR',
  monthlyRevenue: '3,850,000 SAR',
  teamMembers: 215,
  activeClients: 87,
  pendingQuotes: 12,
};

export const monthlyGrowth: MonthlyGrowth[] = [
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

export const projectStats: ProjectStat[] = [
  { category: 'سكني', count: 52, percentage: 33 },
  { category: 'تجاري', count: 38, percentage: 24 },
  { category: 'صناعي', count: 25, percentage: 16 },
  { category: 'بنية تحتية', count: 22, percentage: 14 },
  { category: 'ترميم', count: 19, percentage: 13 },
];

export const serviceStats: ServiceStat[] = [
  { name: 'بناء سكني', bookings: 45, revenue: '18,500,000 SAR', growth: 12 },
  { name: 'تشطيب داخلي', bookings: 38, revenue: '8,200,000 SAR', growth: 8 },
  { name: 'مشروع تجاري', bookings: 28, revenue: '14,800,000 SAR', growth: 15 },
  { name: 'تصميم معماري', bookings: 22, revenue: '3,600,000 SAR', growth: 5 },
  { name: 'صيانة وتشغيل', bookings: 18, revenue: '5,300,000 SAR', growth: -3 },
  { name: 'بنية تحتية', bookings: 15, revenue: '9,000,000 SAR', growth: 10 },
];

export const quoteStats: QuoteStat[] = [
  { status: 'pending', count: 12 },
  { status: 'reviewed', count: 8 },
  { status: 'inProgress', count: 15 },
  { status: 'completed', count: 42 },
  { status: 'rejected', count: 6 },
];

export const contactStats: ContactStat[] = [
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

export const chartData = {
  projectCategories: ['سكني', 'تجاري', 'صناعي', 'بنية تحتية', 'ترميم'],
  projectCategoryValues: [52, 38, 25, 22, 19],
  monthlyRevenue: monthlyGrowth.map((m) => m.revenue / 1000000),
  monthlyProjects: monthlyGrowth.map((m) => m.projects),
  months: monthlyGrowth.map((m) => m.month),
};
