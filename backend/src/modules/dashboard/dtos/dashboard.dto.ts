export interface OverviewStats {
  totalProjects: number;
  totalServices: number;
  totalBlogPosts: number;
  totalTeamMembers: number;
  totalTestimonials: number;
  totalContactMessages: number;
  totalQuoteRequests: number;
  totalNewsletterSubscribers: number;
}

export interface QuickStats {
  publishedProjects: number;
  draftBlogPosts: number;
  activeTeamMembers: number;
  featuredProjects: number;
  featuredTestimonials: number;
  unreadContactMessages: number;
  pendingQuotes: number;
  activeNewsletterSubscribers: number;
}

export interface RecentContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  createdAt: Date;
}

export interface RecentQuoteRequest {
  _id: string;
  name: string;
  email: string;
  serviceType: string;
  status: string;
  createdAt: Date;
}

export interface RecentBlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
}

export interface RecentProject {
  _id: string;
  title: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  createdAt: Date;
}

export interface RecentActivity {
  contactMessages: RecentContactMessage[];
  quoteRequests: RecentQuoteRequest[];
  blogPosts: RecentBlogPost[];
  projects: RecentProject[];
}

export interface ChartData {
  projectsByCategory: Array<{ category: string; count: number }>;
  blogPostsByCategory: Array<{ category: string; count: number }>;
  quotesByStatus: Array<{ status: string; count: number }>;
  contactsByMonth: Array<{ month: string; count: number }>;
  newsletterGrowth: Array<{ month: string; count: number }>;
}

export interface DashboardNotification {
  _id: string;
  type: 'contact' | 'quote' | 'newsletter' | 'blog';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface DashboardResponse {
  overview: OverviewStats;
  quickStats: QuickStats;
  recentActivity: RecentActivity;
  chartData: ChartData;
  notifications: DashboardNotification[];
}