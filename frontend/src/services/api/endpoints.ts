import { apiClient } from './client';
import type { ApiResponse } from './types';
import type {
  Blog, Project, Service, TeamMember, Testimonial,
  Faq, Partner, Contact, Quote, Subscriber,
  DashboardRawResponse, Notification, User, RecentActivityData,
} from './types';

export interface PaginatedResult<T> {
  data: ApiResponse<T[]>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Auth
export const authApi = {
  login: (data: { email: string; password: string }) =>
    apiClient.post<ApiResponse<{ user: User; accessToken: string; refreshToken: string }>>('/auth/login', data),
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    apiClient.post<ApiResponse<{ user: User; accessToken: string; refreshToken: string }>>('/auth/register', data),
  logout: () => apiClient.post<ApiResponse<null>>('/auth/logout'),
  refresh: (refreshToken: string) =>
    apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/auth/refresh', { refreshToken }),
  me: () => apiClient.get<ApiResponse<User>>('/auth/me'),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.post<ApiResponse<null>>('/auth/change-password', data),
  forgotPassword: (email: string) =>
    apiClient.post<ApiResponse<null>>('/auth/forgot-password', { email }),
  resetPassword: (data: { token: string; newPassword: string }) =>
    apiClient.post<ApiResponse<null>>('/auth/reset-password', data),
};

// Dashboard
export const dashboardApi = {
  getStats: () =>
    apiClient.get<ApiResponse<DashboardRawResponse>>('/dashboard'),
  getOverview: () =>
    apiClient.get<ApiResponse<DashboardRawResponse>>('/dashboard/overview'),
  getQuickStats: () =>
    apiClient.get<ApiResponse<Record<string, number>>>('/dashboard/quick-stats'),
  getRecentActivity: () =>
    apiClient.get<ApiResponse<RecentActivityData>>('/dashboard/recent-activity'),
  getChartData: () =>
    apiClient.get<ApiResponse<Record<string, unknown>>>('/dashboard/chart-data'),
  getNotifications: () =>
    apiClient.get<ApiResponse<Notification[]>>('/dashboard/notifications'),
};

// Blogs
export const blogsApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Blog[]> & { pagination: PaginatedResult<Blog>['pagination'] }>('/blogs', { params }),
  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Blog>>(`/blogs/${slug}`),
  create: (data: Record<string, unknown>) =>
    apiClient.post<ApiResponse<Blog>>('/blogs', data),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.put<ApiResponse<Blog>>(`/blogs/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/blogs/${id}`),
};

// Projects
export const projectsApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Project[]> & { pagination: PaginatedResult<Project>['pagination'] }>('/projects', { params }),
  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Project>>(`/projects/${slug}`),
  create: (data: Record<string, unknown>) =>
    apiClient.post<ApiResponse<Project>>('/projects', data),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.put<ApiResponse<Project>>(`/projects/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/projects/${id}`),
};

// Services
export const servicesApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Service[]> & { pagination: PaginatedResult<Service>['pagination'] }>('/services', { params }),
  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Service>>(`/services/${slug}`),
  create: (data: Record<string, unknown>) =>
    apiClient.post<ApiResponse<Service>>('/services', data),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.put<ApiResponse<Service>>(`/services/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/services/${id}`),
};

// Team
export const teamApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<TeamMember[]> & { pagination: PaginatedResult<TeamMember>['pagination'] }>('/team', { params }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<TeamMember>>(`/team/${id}`),
  create: (data: Record<string, unknown>) =>
    apiClient.post<ApiResponse<TeamMember>>('/team', data),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.put<ApiResponse<TeamMember>>(`/team/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/team/${id}`),
};

// Testimonials
export const testimonialsApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Testimonial[]> & { pagination: PaginatedResult<Testimonial>['pagination'] }>('/testimonials', { params }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<Testimonial>>(`/testimonials/${id}`),
  create: (data: Record<string, unknown>) =>
    apiClient.post<ApiResponse<Testimonial>>('/testimonials', data),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.put<ApiResponse<Testimonial>>(`/testimonials/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/testimonials/${id}`),
};

// FAQ
export const faqApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Faq[]> & { pagination: PaginatedResult<Faq>['pagination'] }>('/faqs', { params }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<Faq>>(`/faqs/${id}`),
  create: (data: Partial<Faq>) =>
    apiClient.post<ApiResponse<Faq>>('/faqs', data),
  update: (id: string, data: Partial<Faq>) =>
    apiClient.put<ApiResponse<Faq>>(`/faqs/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/faqs/${id}`),
};

// Partners
export const partnersApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Partner[]> & { pagination: PaginatedResult<Partner>['pagination'] }>('/partners', { params }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<Partner>>(`/partners/${id}`),
  create: (data: Partial<Partner>) =>
    apiClient.post<ApiResponse<Partner>>('/partners', data),
  update: (id: string, data: Partial<Partner>) =>
    apiClient.put<ApiResponse<Partner>>(`/partners/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/partners/${id}`),
};

// Contacts
export const contactsApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Contact[]> & { pagination: PaginatedResult<Contact>['pagination'] }>('/contacts', { params }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<Contact>>(`/contacts/${id}`),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.put<ApiResponse<Contact>>(`/contacts/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/contacts/${id}`),
};

// Quotes
export const quotesApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Quote[]> & { pagination: PaginatedResult<Quote>['pagination'] }>('/quotes', { params }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<Quote>>(`/quotes/${id}`),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.put<ApiResponse<Quote>>(`/quotes/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/quotes/${id}`),
};

// Newsletter / Subscribers
export const subscribersApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<ApiResponse<Subscriber[]> & { pagination: PaginatedResult<Subscriber>['pagination'] }>('/newsletter', { params }),
  getById: (id: string) =>
    apiClient.get<ApiResponse<Subscriber>>(`/newsletter/${id}`),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.put<ApiResponse<Subscriber>>(`/newsletter/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/newsletter/${id}`),
};

// Upload
export const uploadApi = {
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post<ApiResponse<{ url: string; publicId: string }>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Users
export const usersApi = {
  getById: (id: string) =>
    apiClient.get<ApiResponse<User>>(`/users/${id}`),
  update: (id: string, data: Partial<User>) =>
    apiClient.put<ApiResponse<User>>(`/users/${id}`, data),
  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/users/${id}`),
  getProfile: () =>
    apiClient.get<ApiResponse<User>>('/users/me/profile'),
  updateProfile: (data: Partial<User>) =>
    apiClient.put<ApiResponse<User>>('/users/me/profile', data),
};


