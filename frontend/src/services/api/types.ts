export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}


export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Blog {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  content: string;
  contentAr: string;
  excerpt?: string;
  excerptAr?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  author?: string;
  publishedAt?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  category: string;
  categoryAr: string;
  location: string;
  locationAr: string;
  client: string;
  clientAr: string;
  year: number;
  duration: string;
  durationAr: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  images: string[];
  thumbnail: string;
  videoUrl?: string;
  budget: string;
  budgetAr: string;
  features: string[];
  featuresAr: string[];
  challenges?: string;
  challengesAr?: string;
  solutions?: string;
  solutionsAr?: string;
  results?: string;
  resultsAr?: string;
  testimonialId?: string;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  completionDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  icon: string;
  image: string;
  features: string[];
  featuresAr: string[];
  benefits: string[];
  benefitsAr: string[];
  process: { step: number; title: string; titleAr: string; description: string; descriptionAr: string }[];
  faqs: { question: string; questionAr: string; answer: string; answerAr: string }[];
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  _id: string;
  id: string;
  name: string;
  nameAr: string;
  position: string;
  positionAr: string;
  role?: string;
  roleAr?: string;
  bio?: string;
  bioAr?: string;
  image?: string;
  thumbnail?: string;
  email?: string;
  phone?: string;
  department?: string;
  departmentAr?: string;
  order?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  id: string;
  name: string;
  nameAr?: string;
  position?: string;
  roleAr?: string;
  company?: string;
  companyAr?: string;
  content: string;
  contentAr?: string;
  rating?: number;
  image?: string;
  thumbnail?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  _id: string;
  question: string;
  questionAr?: string;
  answer: string;
  answerAr?: string;
  category?: string;
  categoryAr?: string;
  order?: number;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  _id: string;
  name: string;
  nameAr?: string;
  logo?: string;
  website?: string;
  description?: string;
  category?: string;
  categoryAr?: string;
  order?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  projectDescription: string;
  howDidYouHear?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscriber {
  _id: string;
  email: string;
  isActive?: boolean;
  subscribedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardOverview {
  totalProjects: number;
  totalServices: number;
  totalBlogPosts: number;
  totalTeamMembers: number;
  totalTestimonials: number;
  totalContactMessages: number;
  totalQuoteRequests: number;
  totalNewsletterSubscribers: number;
}

export interface DashboardQuickStats {
  publishedProjects: number;
  draftBlogPosts: number;
  activeTeamMembers: number;
  featuredProjects: number;
  featuredTestimonials: number;
  unreadContactMessages: number;
  pendingQuotes: number;
  activeNewsletterSubscribers: number;
}

export interface DashboardRawResponse {
  overview: DashboardOverview;
  quickStats: DashboardQuickStats;
  recentActivity: RecentActivityData;
  chartData: Record<string, unknown>;
  notifications: Notification[];
}

export interface DashboardStats {
  overview: DashboardOverview;
  quickStats: DashboardQuickStats;
  recentProjects: RecentProject[];
  chartData: Record<string, unknown>;
}

export interface RecentProject {
  _id: string;
  title: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface RecentActivityData {
  contactMessages: Array<{
    _id: string;
    name: string;
    email: string;
    subject: string;
    createdAt: string;
  }>;
  quoteRequests: Array<{
    _id: string;
    name: string;
    email: string;
    serviceType: string;
    status: string;
    createdAt: string;
  }>;
  blogPosts: Array<{
    _id: string;
    title: string;
    slug: string;
    category: string;
    isPublished: boolean;
    publishedAt: string | null;
    createdAt: string;
  }>;
  projects: Array<{
    _id: string;
    title: string;
    slug: string;
    category: string;
    isFeatured: boolean;
    createdAt: string;
  }>;
}

export interface Notification {
  _id: string;
  title: string;
  message?: string;
  type?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Activity {
  _id: string;
  action: string;
  description?: string;
  user?: string;
  createdAt: string;
}
