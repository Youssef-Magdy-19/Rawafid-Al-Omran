// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Types
export interface About {
  id: string;
  title: string;
  description: string;
  story: {
    title: string;
    content: string;
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  values: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  statistics: Array<{
    id: string;
    value: string;
    label: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'commercial' | 'infrastructure' | 'education' | 'residential';
  images: string[];
  location: string;
  year: number;
  client: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// API Functions
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// About API
export const aboutApi = {
  getAbout: () => fetchApi<About>('/about'),
  updateAbout: (data: Partial<About>) => fetchApi<About>('/about', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Services API
export const servicesApi = {
  getServices: () => fetchApi<Service[]>('/services'),
  getService: (id: string) => fetchApi<Service>(`/services/${id}`),
  createService: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => fetchApi<Service>('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateService: (id: string, data: Partial<Service>) => fetchApi<Service>(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteService: (id: string) => fetchApi<void>(`/services/${id}`, {
    method: 'DELETE',
  }),
};

// Projects API
export const projectsApi = {
  getProjects: (params?: { category?: string; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.status) searchParams.set('status', params.status);
    const query = searchParams.toString();
    return fetchApi<Project[]>(`/projects${query ? `?${query}` : ''}`);
  },
  getProject: (id: string) => fetchApi<Project>(`/projects/${id}`),
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => fetchApi<Project>('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateProject: (id: string, data: Partial<Project>) => fetchApi<Project>(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteProject: (id: string) => fetchApi<void>(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Team API
export const teamApi = {
  getTeam: () => fetchApi<TeamMember[]>('/team'),
  getTeamMember: (id: string) => fetchApi<TeamMember>(`/team/${id}`),
  createTeamMember: (data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => fetchApi<TeamMember>('/team', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateTeamMember: (id: string, data: Partial<TeamMember>) => fetchApi<TeamMember>(`/team/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteTeamMember: (id: string) => fetchApi<void>(`/team/${id}`, {
    method: 'DELETE',
  }),
};

// Contact API
export const contactApi = {
  submitContact: (data: Omit<Contact, 'id' | 'createdAt'>) => fetchApi<ApiResponse<Contact>>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Export all APIs
export const api = {
  about: aboutApi,
  services: servicesApi,
  projects: projectsApi,
  team: teamApi,
  contact: contactApi,
};

export default api;