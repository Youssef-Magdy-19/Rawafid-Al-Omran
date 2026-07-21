import { create } from 'zustand';
import { apiClient } from '@services/api/client';

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

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
  restoreSession: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.post<{ success: boolean; data: AuthResponse }>(
        '/auth/login',
        { email, password }
      );
      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error: any) {
      set({ isLoading: false });
      const message = error?.response?.data?.message || error?.message || 'Login failed';
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  refreshAccessToken: async () => {
    const currentRefreshToken = get().refreshToken || localStorage.getItem('refreshToken');
    if (!currentRefreshToken) {
      get().logout();
      return null;
    }

    try {
      const response = await apiClient.post<{ success: boolean; data: { accessToken: string; refreshToken: string } }>(
        '/auth/refresh',
        { refreshToken: currentRefreshToken }
      );
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      set({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

      return newAccessToken;
    } catch {
      get().logout();
      return null;
    }
  },

  restoreSession: () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userJson = localStorage.getItem('user');

    if (accessToken && refreshToken && userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isInitialized: true,
        });
      } catch {
        get().logout();
        set({ isInitialized: true });
      }
    } else {
      set({ isInitialized: true });
    }
  },

  setUser: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  initialize: () => {
    get().restoreSession();
  },
}));
