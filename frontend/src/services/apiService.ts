// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const API_TIMEOUT = 30000;

// Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Custom Error Class
export class ApiException extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

// Base API Client
class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string, timeout: number) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiException(
          errorData.message || 'An error occurred',
          errorData.code,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof ApiException) throw error;
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiException('Request timeout', 'TIMEOUT');
        }
        throw new ApiException(error.message, 'UNKNOWN');
      }
      throw new ApiException('An unexpected error occurred', 'UNKNOWN');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API instance
const apiClient = new ApiClient(API_BASE_URL, API_TIMEOUT);

// Service Modules
export const services = {
  // Contact Service
  contact: {
    submit: (data: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      subject: string;
      message: string;
    }) => apiClient.post('/contact', data),
  },

  // Quote Service
  quote: {
    submit: (data: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      service: string;
      budget?: string;
      timeline?: string;
      projectDescription: string;
      howDidYouHear?: string;
    }) => apiClient.post('/quotes', data),
  },

  // Blog Service
  blog: {
    getAll: (params?: { page?: number; limit?: number; category?: string }) =>
      apiClient.get<PaginatedResponse<any>>('/blog', params as Record<string, string>),
    getById: (id: string) => apiClient.get<ApiResponse<any>>(`/blog/${id}`),
    getCategories: () => apiClient.get<string[]>('/blog/categories'),
  },

  // Careers Service
  careers: {
    getAll: (params?: { page?: number; limit?: number; department?: string; type?: string }) =>
      apiClient.get<PaginatedResponse<any>>('/careers', params as Record<string, string>),
    getById: (id: string) => apiClient.get<ApiResponse<any>>(`/careers/${id}`),
    apply: (id: string, data: FormData) =>
      fetch(`${API_BASE_URL}/careers/${id}/apply`, {
        method: 'POST',
        body: data,
      }),
  },

  // Projects Service
  projects: {
    getAll: (params?: { page?: number; limit?: number; category?: string }) =>
      apiClient.get<PaginatedResponse<any>>('/projects', params as Record<string, string>),
    getById: (id: string) => apiClient.get<ApiResponse<any>>(`/projects/${id}`),
  },

  // Services Service
  services: {
    getAll: () => apiClient.get<any[]>('/services'),
    getById: (id: string) => apiClient.get<ApiResponse<any>>(`/services/${id}`),
  },

  // Team Service
  team: {
    getAll: () => apiClient.get<any[]>('/team'),
    getById: (id: string) => apiClient.get<ApiResponse<any>>(`/team/${id}`),
  },

  // Newsletter Service
  newsletter: {
    subscribe: (email: string) => apiClient.post('/newsletter/subscribe', { email }),
    unsubscribe: (email: string) => apiClient.post('/newsletter/unsubscribe', { email }),
  },

  // Search Service
  search: {
    search: (query: string, params?: { page?: number; limit?: number }) =>
      apiClient.get<PaginatedResponse<any>>('/search', { 
        q: query, 
        ...(params?.page !== undefined ? { page: String(params.page) } : {}),
        ...(params?.limit !== undefined ? { limit: String(params.limit) } : {}),
      }),
  },
};

export default apiClient;