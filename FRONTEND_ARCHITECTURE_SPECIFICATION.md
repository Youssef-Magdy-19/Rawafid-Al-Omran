# Frontend Architecture Specification

**Document Date:** July 16, 2026  
**Document Version:** 1.0  
**Project:** Rawafid Al Omran Contracting Corporate Website  
**Scope:** Frontend Architecture

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [Folder Structure](#3-folder-structure)
4. [Feature-Based Architecture](#4-feature-based-architecture)
5. [Routing Architecture](#5-routing-architecture)
6. [State Management](#6-state-management)
7. [API Layer](#7-api-layer)
8. [Forms Architecture](#8-forms-architecture)
9. [Internationalization](#9-internationalization)
10. [Theme System](#10-theme-system)
11. [Component Organization](#11-component-organization)
12. [Performance Strategy](#12-performance-strategy)
13. [SEO Architecture](#13-seo-architecture)
14. [Security Best Practices](#14-security-best-practices)
15. [Error Handling Strategy](#15-error-handling-strategy)
16. [Loading Strategy](#16-loading-strategy)
17. [Coding Standards](#17-coding-standards)
18. [Reusable Patterns](#18-reusable-patterns)
19. [Testing Strategy](#19-testing-strategy)
20. [Deployment Strategy](#20-deployment-strategy)
21. [Recommended Packages](#21-recommended-packages)
22. [Best Practices](#22-best-practices)
23. [Future Scalability](#23-future-scalability)

---

## 1. Architecture Overview

### 1.1 Design Philosophy

The frontend architecture follows a **feature-based modular design** that promotes separation of concerns, reusability, and maintainability. The architecture prioritizes developer experience while ensuring optimal performance and accessibility compliance.

### 1.2 Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Modularity** | Features are self-contained modules with their own components, hooks, services, and types |
| **Scalability** | Horizontal scaling through feature addition without architectural changes |
| **Type Safety** | TypeScript strict mode with comprehensive type definitions |
| **Performance** | Lazy loading, code splitting, and optimized rendering |
| **Accessibility** | WCAG 2.1 AA compliance as a first-class requirement |
| **Internationalization** | RTL support for Arabic with English as default |

### 1.3 Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│         (Components, Pages, Layouts, Animations)            │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                        │
│         (Hooks, State Management, Forms, Routing)            │
├─────────────────────────────────────────────────────────────┤
│                    Service Layer                            │
│         (API Client, Authentication, External Services)      │
├─────────────────────────────────────────────────────────────┤
│                    Infrastructure Layer                    │
│         (i18n, Theme, Utilities, Constants)                 │
└─────────────────────────────────────────────────────────────┘
```

### 1.4 Build Pipeline

```
Source Code → TypeScript → Vite → Bundler → Optimizer → Production Build
     ↓           ↓          ↓        ↓           ↓            ↓
  .tsx/.ts   Type Check  Dev Server  Code Split  Minification  Deploy
```

---

## 2. Technology Stack

### 2.1 Core Framework

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| **React** | 19.x | UI Library | Latest features including concurrent rendering, automatic batching, and improved Suspense |
| **Vite** | 6.x | Build Tool | Sub-second HMR, optimized builds, native ESM support |
| **TypeScript** | 5.x | Language | Static type checking, IDE support, refactoring safety |

### 2.2 Routing

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| **React Router** | 7.x | Client-side routing | Nested routes, data loading, pending UI, view transitions |

### 2.3 State Management

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| **Zustand** | 5.x | Global state | Minimal boilerplate, TypeScript-first, middleware support |
| **TanStack Query** | 5.x | Server state | Caching, background refetching, pagination, optimistic updates |

### 2.4 Forms

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| **React Hook Form** | 7.x | Form management | Performance, uncontrolled inputs, validation integration |
| **Zod** | 3.x | Schema validation | TypeScript-native, composable schemas, error messages |

### 2.5 Styling

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| **Tailwind CSS** | 4.x | Utility-first CSS | Rapid development, consistent design system, tree-shaking |
| **Framer Motion** | 11.x | Animations | Declarative animations, gestures, layout animations |

### 2.6 Internationalization

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| **i18next** | 24.x | i18n framework | Industry standard, React bindings, plugins |
| **react-i18next** | 15.x | React integration | Component-based translations, hooks API |

### 2.7 Data Fetching

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| **Axios** | 1.x | HTTP client | Interceptors, cancellation, typed responses |

### 2.8 UI Components

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| **Lucide React** | latest | Icons | Consistent icon set, tree-shakeable, customizable |
| **Swiper** | 11.x | Carousels | Touch-enabled, performant, feature-rich |

### 2.9 SEO & Meta

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| **React Helmet Async** | 2.x | Meta tags | Document head management, SSR support |

---

## 3. Folder Structure

### 3.1 Complete Directory Tree

```
src/
├── app/
│   ├── App.tsx                    # Root application component
│   ├── providers.tsx              # Global providers composition
│   └── routes.tsx                # Route configuration
│
├── assets/
│   ├── images/                    # Static images
│   │   ├── logos/                 # Logo variations
│   │   ├── icons/                 # Custom SVG icons
│   │   └── illustrations/         # UI illustrations
│   ├── fonts/                     # Custom font files
│   └── videos/                    # Video assets
│
├── components/
│   ├── ui/                        # Reusable UI primitives
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Modal/
│   │   ├── Card/
│   │   ├── Skeleton/
│   │   └── ...
│   ├── layout/                     # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── Container/
│   └── shared/                     # Cross-cutting components
│       ├── SEOHead/
│       ├── ErrorBoundary/
│       └── LoadingOverlay/
│
├── features/
│   ├── home/
│   │   ├── components/            # Feature-specific components
│   │   ├── hooks/                  # Feature-specific hooks
│   │   ├── api/                   # Feature API endpoints
│   │   ├── types/                 # Feature-specific types
│   │   ├── utils/                  # Feature utilities
│   │   └── index.ts               # Public exports
│   ├── services/
│   ├── projects/
│   ├── blog/
│   ├── careers/
│   ├── contact/
│   └── about/
│
├── hooks/
│   ├── useMediaQuery.ts           # Shared hooks
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useIntersectionObserver.ts
│   └── index.ts
│
├── layouts/
│   ├── MainLayout/                # Primary layout
│   │   ├── MainLayout.tsx
│   │   └── MainLayout.module.css
│   ├── AuthLayout/                # Authentication layout
│   └── MinimalLayout/             # Minimal layout (404, thank you)
│
├── pages/
│   ├── Home/
│   │   └── HomePage.tsx
│   ├── About/
│   ├── Services/
│   ├── Projects/
│   ├── Blog/
│   ├── Careers/
│   ├── Contact/
│   ├── FAQ/
│   ├── NotFound/
│   └── ThankYou/
│
├── routes/
│   ├── routes.config.ts           # Route definitions
│   ├── PrivateRoutes.tsx          # Protected route wrapper
│   └── PublicRoutes.tsx           # Public route wrapper
│
├── services/
│   ├── api/
│   │   ├── client.ts              # Axios instance
│   │   ├── interceptors.ts       # Request/response interceptors
│   │   └── endpoints/             # API endpoint functions
│   │       ├── services.ts
│   │       ├── projects.ts
│   │       ├── blog.ts
│   │       ├── careers.ts
│   │       └── contact.ts
│   └── analytics/
│       └── analytics.ts           # Analytics service
│
├── store/
│   ├── index.ts                   # Store exports
│   ├── slices/
│   │   ├── uiSlice.ts             # UI state (modals, drawers)
│   │   ├── themeSlice.ts          # Theme preferences
│   │   ├── languageSlice.ts       # Language preferences
│   │   └── cartSlice.ts           # Cart state (if needed)
│   └── selectors/
│       └── uiSelectors.ts         # Memoized selectors
│
├── types/
│   ├── api.types.ts               # API response types
│   ├── common.types.ts            # Shared types
│   ├── navigation.types.ts         # Route types
│   └── form.types.ts              # Form-related types
│
├── utils/
│   ├── cn.ts                      # Class name utility
│   ├── formatDate.ts              # Date formatting
│   ├── formatCurrency.ts           # Currency formatting
│   ├── validation.ts              # Shared validation utilities
│   ├── seo.ts                     # SEO utilities
│   └── constants.ts               # Application constants
│
├── contexts/
│   ├── ThemeContext.tsx           # Theme provider
│   ├── LanguageContext.tsx        # Language provider
│   └── ToastContext.tsx           # Toast notifications
│
├── constants/
│   ├── api.constants.ts           # API configuration
│   ├── route.constants.ts          # Route paths
│   ├── config.constants.ts        # App configuration
│   └── ui.constants.ts            # UI configuration
│
├── lib/
│   ├── validators/                # Zod schemas
│   │   ├── contact.schema.ts
│   │   ├── quote.schema.ts
│   │   └── career.schema.ts
│   └── utils/                     # Library utilities
│       └── scroll.ts              # Scroll utilities
│
├── styles/
│   ├── globals.css                # Global styles
│   ├── variables.css              # CSS custom properties
│   └── animations.css             # Animation keyframes
│
└── i18n/
    ├── index.ts                   # i18n configuration
    ├── config.ts                  # i18n settings
    ├── locales/
    │   ├── en/
    │   │   ├── common.json
    │   │   ├── navigation.json
    │   │   ├── home.json
    │   │   ├── services.json
    │   │   ├── projects.json
    │   │   ├── blog.json
    │   │   ├── careers.json
    │   │   ├── contact.json
    │   │   ├── about.json
    │   │   ├── faq.json
    │   │   └── footer.json
    │   └── ar/
    │       └── ...                # Arabic translations
    └── middleware.ts               # i18next middleware
```

### 3.2 Folder Descriptions

| Folder | Purpose |
|--------|---------|
| `app/` | Application entry point and root configuration |
| `assets/` | Static files including images, fonts, and videos |
| `components/` | Reusable UI components organized by type |
| `features/` | Feature-specific code with self-contained modules |
| `hooks/` | Shared custom React hooks |
| `layouts/` | Page layout components |
| `pages/` | Page-level components mapped to routes |
| `routes/` | Route configuration and guards |
| `services/` | API clients and external service integrations |
| `store/` | Zustand store configuration and slices |
| `types/` | TypeScript type definitions |
| `utils/` | Utility functions and helpers |
| `contexts/` | React context providers |
| `constants/` | Application constants and configuration |
| `lib/` | Third-party library configurations |
| `styles/` | Global CSS and design tokens |
| `i18n/` | Internationalization configuration and translations |

---

## 4. Feature-Based Architecture

### 4.1 Feature Module Structure

Each feature follows a consistent internal structure:

```
features/
└── [feature-name]/
    ├── components/                 # Feature-specific components
    │   ├── [FeatureName]Card.tsx
    │   ├── [FeatureName]List.tsx
    │   ├── [FeatureName]Detail.tsx
    │   └── index.ts
    ├── hooks/                      # Feature-specific hooks
    │   ├── use[FeatureName].ts
    │   ├── use[FeatureName]List.ts
    │   └── index.ts
    ├── api/                        # Feature API functions
    │   ├── [featureName].api.ts
    │   └── index.ts
    ├── types/                      # Feature-specific types
    │   ├── [featureName].types.ts
    │   └── index.ts
    ├── utils/                      # Feature utilities
    │   ├── [featureName].utils.ts
    │   └── index.ts
    ├── constants/                  # Feature constants
    │   └── [featureName].constants.ts
    └── index.ts                    # Public API exports
```

### 4.2 Feature Modules

#### Home Feature
- Hero section components
- Statistics counter
- Featured content selectors
- Newsletter subscription

#### Services Feature
- Service listing
- Service detail
- Service filtering
- Service comparison

#### Projects Feature
- Project listing with filters
- Project detail with gallery
- Project filtering by category/status
- Project search

#### Blog Feature
- Blog listing with pagination
- Blog post detail
- Category filtering
- Author profiles
- Related posts

#### Careers Feature
- Job listings
- Job detail
- Application form
- Department filtering
- Benefits display

#### Contact Feature
- Contact form
- Office information
- Map integration
- WhatsApp integration

#### About Feature
- Company overview
- Team members
- Timeline
- Mission/Vision

---

## 5. Routing Architecture

### 5.1 Route Configuration

```typescript
// routes/routes.config.ts
export const routes = {
  // Public Routes
  home: '/',
  about: '/about',
  services: '/services',
  serviceDetail: '/services/:slug',
  projects: '/projects',
  projectDetail: '/projects/:slug',
  blog: '/blog',
  blogPost: '/blog/:slug',
  careers: '/careers',
  careerDetail: '/careers/:id',
  contact: '/contact',
  faq: '/faq',
  quote: '/quote',
  search: '/search',
  privacy: '/privacy',
  terms: '/terms',
  
  // Special Routes
  notFound: '/404',
  thankYou: '/thank-you/:type',
  
  // Admin Routes (Future)
  admin: '/admin',
  adminDashboard: '/admin/dashboard',
} as const;
```

### 5.2 Route Types

```typescript
// types/navigation.types.ts
export type RoutePath = typeof routes[keyof typeof routes];

export interface RouteConfig {
  path: string;
  title: string;
  description?: string;
  isPublic: boolean;
  layout: 'main' | 'minimal' | 'auth';
  meta?: MetaConfig;
}

export interface MetaConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
}
```

### 5.3 Route Structure

```
/                           → HomePage (MainLayout)
/about                      → AboutPage (MainLayout)
/services                   → ServicesPage (MainLayout)
/services/:slug             → ServiceDetailPage (MainLayout)
/projects                   → ProjectsPage (MainLayout)
/projects/:slug             → ProjectDetailPage (MainLayout)
/blog                       → BlogPage (MainLayout)
/blog/:slug                 → BlogPostPage (MainLayout)
/careers                     → CareersPage (MainLayout)
/careers/:id                → CareerDetailPage (MainLayout)
/contact                    → ContactPage (MainLayout)
/faq                        → FAQPage (MainLayout)
/quote                       → QuotePage (MainLayout)
/search                     → SearchPage (MainLayout)
/privacy                    → PrivacyPage (MainLayout)
/terms                      → TermsPage (MainLayout)
/thank-you/:type            → ThankYouPage (MinimalLayout)
/404                        → NotFoundPage (MinimalLayout)
```

### 5.4 Nested Routes Example

```typescript
// Services nested routes
{
  path: '/services',
  children: [
    { index: true, element: <ServicesPage /> },
    { path: ':slug', element: <ServiceDetailPage /> },
  ]
}
```

### 5.5 Route Guards

```typescript
// routes/PrivateRoutes.tsx
interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

// Future implementation for admin routes
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
```

---

## 6. State Management

### 6.1 State Management Strategy

| State Type | Solution | Rationale |
|------------|----------|-----------|
| **Server State** | TanStack Query | Caching, background refetch, pagination |
| **Global UI State** | Zustand | Modals, drawers, sidebar state |
| **Theme State** | Zustand + CSS Variables | Theme persistence |
| **Language State** | Zustand + i18next | Language persistence |
| **Form State** | React Hook Form | Performance, validation |
| **Local UI State** | useState/useReducer | Component-specific state |
| **Shared State** | Context API | Truly global, low-frequency updates |

### 6.2 Zustand Store Structure

```typescript
// store/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create()(
  persist(
    (set) => ({
      // UI State
      isMobileMenuOpen: false,
      isSearchOpen: false,
      activeModal: null,
      
      // Theme State
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      
      // Language State
      language: 'en',
      setLanguage: (language) => set({ language }),
      
      // Actions
      toggleMobileMenu: () => set((state) => ({ 
        isMobileMenuOpen: !state.isMobileMenuOpen 
      })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ 
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);
```

### 6.3 TanStack Query Usage

```typescript
// Feature API hook example
export const useServices = (filters?: ServiceFilters) => {
  return useQuery({
    queryKey: ['services', filters],
    queryFn: () => servicesApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });
};

// Mutation example
export const useContactForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactApi.submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
    },
  });
};
```

### 6.4 Context API Usage

```typescript
// contexts/ToastContext.tsx
// Used for toast notifications that need to be accessible anywhere
// Low update frequency, simple state

// contexts/ThemeContext.tsx
// Provides theme context to CSS variables
// Works with Zustand for persistence
```

---

## 7. API Layer

### 7.1 Axios Client Configuration

```typescript
// services/api/client.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 7.2 Interceptors

```typescript
// services/api/interceptors.ts

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add language header
    config.headers['Accept-Language'] = getCurrentLanguage();
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 - Token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

### 7.3 API Service Structure

```typescript
// services/api/endpoints/services.api.ts
export const servicesApi = {
  getAll: async (filters?: ServiceFilters) => {
    const { data } = await apiClient.get<ServiceResponse>('/services', {
      params: filters,
    });
    return data;
  },
  
  getBySlug: async (slug: string) => {
    const { data } = await apiClient.get<ServiceDetailResponse>(`/services/${slug}`);
    return data;
  },
  
  getRelated: async (slug: string) => {
    const { data } = await apiClient.get<Service[]>(`/services/${slug}/related`);
    return data;
  },
};
```

### 7.4 Error Handling

```typescript
// utils/api.utils.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const { response } = error;
    
    if (response) {
      const { status, data } = response;
      
      return new ApiError(
        status,
        data.code || 'UNKNOWN_ERROR',
        data.message || 'An error occurred',
        data.details
      );
    }
    
    if (error.request) {
      return new ApiError(0, 'NETWORK_ERROR', 'Network connection failed');
    }
  }
  
  return new ApiError(0, 'UNKNOWN_ERROR', 'An unexpected error occurred');
};
```

### 7.5 Request Configuration

```typescript
// Request cancellation
const controller = new AbortController();
const response = await apiClient.get('/data', {
  signal: controller.signal,
});

// Request retries
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => error.response?.status === 503,
});
```

---

## 8. Forms Architecture

### 8.1 Form Component Structure

```
components/
└── ui/
    └── Form/
        ├── Form.tsx              # Base form wrapper
        ├── FormField.tsx        # Field wrapper with label/error
        ├── Input.tsx             # Text input
        ├── Textarea.tsx          # Multi-line input
        ├── Select.tsx             # Dropdown select
        ├── Checkbox.tsx          # Checkbox input
        ├── RadioGroup.tsx        # Radio group
        ├── FileInput.tsx         # File upload
        └── index.ts
```

### 8.2 Zod Schema Structure

```typescript
// lib/validators/contact.schema.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z
    .string()
    .email('Please enter a valid email address'),
  
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{6,14}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  
  subject: z
    .string()
    .min(1, 'Please select a subject'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
});

export type ContactFormData = z.infer<contactFormSchema>;
```

### 8.3 Form Implementation Pattern

```typescript
// Feature form component
export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });
  
  const mutation = useContactMutation();
  
  const onSubmit = async (data: ContactFormData) => {
    try {
      await mutation.mutateAsync(data);
      toast.success('Message sent successfully');
      reset();
    } catch (error) {
      toast.error('Failed to send message');
    }
  };
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Name" error={errors.name?.message}>
        <Input {...register('name')} placeholder="Your name" />
      </FormField>
      {/* ... other fields */}
      <Button type="submit" isLoading={isSubmitting}>
        Send Message
      </Button>
    </Form>
  );
};
```

### 8.4 Server Validation

```typescript
// Handle server-side validation errors
const onSubmit = async (data: ContactFormData) => {
  try {
    await mutation.mutateAsync(data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 422) {
      // Map server errors to form fields
      const serverErrors = error.details;
      setError('email', { message: serverErrors?.email?.[0] });
      setError('message', { message: serverErrors?.message?.[0] });
    }
  }
};
```

---

## 9. Internationalization

### 9.1 i18n Configuration

```typescript
// i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en';
import arTranslations from './locales/ar';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

### 9.2 Translation File Structure

```typescript
// i18n/locales/en/common.json
{
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "retry": "Try again",
    "save": "Save",
    "cancel": "Cancel",
    "submit": "Submit",
    "search": "Search",
    "noResults": "No results found"
  },
  "navigation": {
    "home": "Home",
    "about": "About Us",
    "services": "Services",
    "projects": "Projects",
    "blog": "Blog",
    "careers": "Careers",
    "contact": "Contact"
  },
  "buttons": {
    "requestQuote": "Request Quote",
    "viewAll": "View All",
    "learnMore": "Learn More",
    "contactUs": "Contact Us"
  }
}
```

### 9.3 RTL Support

```typescript
// styles/globals.css
html[dir="rtl"] {
  direction: rtl;
}

html[dir="rtl"] .flip-rtl {
  transform: scaleX(-1);
}
```

```typescript
// Hook for RTL detection
export const useRTL = () => {
  const { language } = useAppStore();
  return language === 'ar';
};
```

### 9.4 URL Strategy

```
# English (default)
https://example.com/services
https://example.com/projects/villa-construction

# Arabic
https://example.com/ar/services
https://example.com/ar/projects/villa-construction
```

---

## 10. Theme System

### 10.1 CSS Variables

```css
/* styles/variables.css */
:root {
  /* Primary Colors */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;
  
  /* Secondary Colors */
  --color-secondary-50: #faf5ff;
  --color-secondary-500: #a855f7;
  --color-secondary-700: #7e22ce;
  
  /* Neutral Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  
  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
```

### 10.2 Theme Provider

```typescript
// contexts/ThemeContext.tsx
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useAppStore();
  
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);
  
  return <>{children}</>;
};
```

### 10.3 Tailwind Integration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          // ... etc
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
        },
      },
      borderRadius: {
        DEFAULT: 'var(--radius-md)',
      },
      boxShadow: {
        DEFAULT: 'var(--shadow-md)',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 11. Component Organization

### 11.1 Component Categories

| Category | Location | Description |
|----------|----------|-------------|
| **UI Primitives** | `components/ui/` | Buttons, inputs, cards, modals |
| **Layout Components** | `components/layout/` | Header, footer, sidebar, container |
| **Shared Components** | `components/shared/` | SEO, error boundary, loading |
| **Feature Components** | `features/*/components/` | Feature-specific components |
| **Page Components** | `pages/*/` | Page-level compositions |

### 11.2 Component Hierarchy

```
App
└── Providers
    └── MainLayout
        ├── Header
        │   ├── Logo
        │   ├── Navigation
        │   ├── LanguageSwitcher
        │   ├── ThemeSwitcher
        │   └── MobileMenu
        ├── MainContent
        │   └── Page Components
        └── Footer
            ├── FooterColumns
            ├── SocialLinks
            └── BottomBar
```

### 11.3 Component Export Pattern

```typescript
// components/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

---

## 12. Performance Strategy

### 12.1 Code Splitting

```typescript
// routes/routes.config.ts
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const ServicesPage = lazy(() => import('./pages/Services/ServicesPage'));

// Route configuration
{
  path: '/',
  element: (
    <Suspense fallback={<PageSkeleton />}>
      <HomePage />
    </Suspense>
  ),
}
```

### 12.2 Lazy Loading Strategy

| Resource Type | Strategy |
|---------------|----------|
| Pages | Lazy load all pages |
| Heavy Components | Lazy load (modals, carousels) |
| Images | Lazy loading with Intersection Observer |
| Fonts | Font-display: swap |
| Third-party | Dynamic imports |

### 12.3 Memoization

```typescript
// Memoize expensive computations
const sortedProjects = useMemo(
  () => projects.sort((a, b) => new Date(b.date) - new Date(a.date)),
  [projects]
);

// Memoize callbacks
const handleClick = useCallback((id: string) => {
  navigate(`/projects/${id}`);
}, [navigate]);

// Memoize components
const MemoizedCard = memo(ProjectCard);
```

### 12.4 Image Optimization

```typescript
// Use responsive images
<img
  srcSet={`${image}?w=400 400w, ${image}?w=800 800w`}
  sizes="(max-width: 768px) 100vw, 50vw"
  src={`${image}?w=800`}
  alt={alt}
/>;

// Use WebP with fallbacks
<picture>
  <source srcSet={`${image}.webp`} type="image/webp" />
  <img src={`${image}.jpg`} alt={alt} />
</picture>
```

### 12.5 Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          query: ['@tanstack/react-query'],
          forms: ['react-hook-form', 'zod'],
        },
      },
    },
  },
});
```

---

## 13. SEO Architecture

### 13.1 SEO Component

```typescript
// components/shared/SEOHead/SEOHead.tsx
interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonical,
  noIndex = false,
}) => {
  const fullTitle = `${title} | Rawafid Al Omran`;
  const defaultOgImage = '/images/og-default.jpg';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ar_SA" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};
```

### 13.2 Structured Data

```typescript
// SEO utilities for structured data
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Rawafid Al Omran Contracting',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+966-XX-XXX-XXXX',
    contactType: 'customer service',
  },
});

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
```

### 13.3 Sitemap Configuration

```typescript
// sitemap.config.ts
export const sitemapConfig = {
  alternates: {
    languages: {
      en: 'https://example.com',
      ar: 'https://example.com/ar',
    },
  },
  filter: ({ allPages }) => allPages.filter((page) => !page.noIndex),
};
```

---

## 14. Security Best Practices

### 14.1 XSS Prevention

| Practice | Implementation |
|----------|----------------|
| **Content Sanitization** | Use DOMPurify for user-generated content |
| **Input Encoding** | React auto-escapes JSX |
| **CSP Headers** | Configure Content-Security-Policy |
| **Dangerously Set** | Avoid `dangerouslySetInnerHTML` |

### 14.2 Environment Variables

```typescript
// .env.example
VITE_API_URL=https://api.example.com
VITE_GA_ID=G-XXXXXXXXXX
VITE_WHATSAPP_NUMBER=966XXXXXXXXx

// Access in code
const apiUrl = import.meta.env.VITE_API_URL;
```

### 14.3 API Security

| Measure | Implementation |
|---------|----------------|
| **HTTPS Only** | Enforce HTTPS in production |
| **Token Storage** | Use httpOnly cookies for refresh tokens |
| **Request Signing** | Sign sensitive requests |
| **Rate Limiting** | Implement client-side rate limiting |

### 14.4 Input Validation

```typescript
// All form inputs validated with Zod
// API responses validated before use
// URL parameters sanitized
```

---

## 15. Error Handling Strategy

### 15.1 Error Boundaries

```typescript
// components/shared/ErrorBoundary/ErrorBoundary.tsx
export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### 15.2 Error Pages

| Page | Route | Purpose |
|------|-------|---------|
| **404** | `/404` | Page not found |
| **500** | Server-rendered | Server error |
| **Maintenance** | `/maintenance` | Site maintenance |

### 15.3 Toast Notifications

```typescript
// Toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

// Usage
toast.success('Form submitted successfully');
toast.error('Failed to submit form');
toast.warning('Please review your input');
toast.info('New notification');
```

### 15.4 Error States

| State | Component | Trigger |
|-------|-----------|---------|
| **Empty** | EmptyState | No data |
| **Error** | ErrorState | API failure |
| **Loading** | Skeleton | Data fetching |
| **No Results** | NoResults | Search/filter with no results |

---

## 16. Loading Strategy

### 16.1 Loading States

| Type | Component | Usage |
|------|-----------|-------|
| **Page Load** | PageSkeleton | Initial page load |
| **Component** | Skeleton | Component-level loading |
| **Inline** | Spinner | Button, form submission |
| **Progress** | ProgressBar | File upload, long operations |

### 16.2 Skeleton Components

```typescript
// Skeleton variants
<Skeleton variant="text" width="60%" />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" height={200} />
<Skeleton variant="card" />
```

### 16.3 Suspense Boundaries

```typescript
// Wrap lazy-loaded content
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>

// Multiple boundaries
<Suspense fallback={<PageSkeleton />}>
  <AsyncPage />
</Suspense>
```

---

## 17. Coding Standards

### 17.1 Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `ProjectCard.tsx` |
| **Hooks** | camelCase with `use` prefix | `useProjectList.ts` |
| **Utilities** | camelCase | `formatDate.ts` |
| **Types/Interfaces** | PascalCase | `ProjectType.ts` |
| **Constants** | SCREAMING_SNAKE_CASE | `API_ENDPOINTS` |
| **Files** | kebab-case | `project-card.tsx` |
| **CSS Classes** | kebab-case | `.project-card` |

### 17.2 Component Structure

```typescript
// Component file structure
// 1. Imports
// 2. Types
// 3. Component
// 4. Styles (if using CSS modules)

import React from 'react';
import { cn } from '@/utils/cn';
import type { ProjectCardProps } from './ProjectCard.types';

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project,
  className,
}) => {
  return (
    <article className={cn('project-card', className)}>
      {/* content */}
    </article>
  );
};
```

### 17.3 Type Definitions

```typescript
// types/project.types.ts

// Interface for object types
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  createdAt: Date;
}

// Type for union values
export type ProjectStatus = 'completed' | 'in-progress' | 'upcoming';

// Enum for limited options
export enum ProjectCategory {
  Residential = 'residential',
  Commercial = 'commercial',
  Industrial = 'industrial',
}

// Type for component props
export interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
  onClick?: () => void;
}
```

### 17.4 File Organization

```
// Maximum file length: 300 lines
// If exceeded, split into smaller files

// exports at bottom
export { ProjectCard } from './ProjectCard';
export type { ProjectCardProps } from './ProjectCard.types';
```

---

## 18. Reusable Patterns

### 18.1 Container/Presentational Pattern

```typescript
// Container handles logic
const ProjectListContainer: React.FC = () => {
  const { data, isLoading } = useProjects();
  
  return (
    <ProjectList 
      projects={data}
      isLoading={isLoading}
    />
  );
};

// Presentational handles rendering
interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, isLoading }) => {
  if (isLoading) return <ProjectListSkeleton />;
  return <div>{/* render */}</div>;
};
```

### 18.2 Composition Pattern

```typescript
// Composable card
const Card = ({ children, className, ...props }) => (
  <div className={cn('card', className)} {...props}>
    {children}
  </div>
);

Card.Header = ({ children }) => <div className="card-header">{children}</div>;
Card.Body = ({ children }) => <div className="card-body">{children}</div>;
Card.Footer = ({ children }) => <div className="card-footer">{children}</div>;

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

### 18.3 Custom Hooks Pattern

```typescript
// hooks/useIntersectionObserver.ts
export const useIntersectionObserver = (
  options?: IntersectionObserverInit
) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);
  
  return [setRef, isIntersecting] as const;
};
```

### 18.4 Provider Pattern

```typescript
// contexts/ToastProvider.tsx
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);
  
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  
  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};
```

---

## 19. Testing Strategy

### 19.1 Testing Pyramid

```
        ┌─────────────┐
        │     E2E     │  10%
        │   Testing   │
       ┌┴─────────────┴┐
       │  Integration  │  30%
       │    Tests      │
      ┌┴───────────────┴┐
      │     Unit        │  60%
      │    Tests        │
      └─────────────────┘
```

### 19.2 Testing Tools

| Type | Tool | Purpose |
|------|------|---------|
| **Unit** | Vitest | Component and utility testing |
| **Component** | React Testing Library | Component behavior |
| **E2E** | Playwright | Full flow testing |
| **Visual** | Chromatic | Visual regression |

### 19.3 Test Structure

```typescript
// Component test
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

---

## 20. Deployment Strategy

### 20.1 Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
  },
});
```

### 20.2 Environment Files

| File | Purpose |
|------|---------|
| `.env` | Default values |
| `.env.local` | Local overrides (gitignored) |
| `.env.development` | Dev-specific |
| `.env.production` | Production-specific |

### 20.3 Deployment Platforms

| Platform | Configuration |
|----------|----------------|
| **Vercel** | Zero-config deployment |
| **Netlify** | netlify.toml configuration |
| **AWS S3 + CloudFront** | Static hosting |

### 20.4 Cache Strategy

| Resource | Cache Duration |
|----------|----------------|
| HTML | No cache (always fresh) |
| JS/CSS | 1 year (hashed filenames) |
| Images | 1 year |
| Fonts | 1 year |

---

## 21. Recommended Packages

### 21.1 Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM rendering |
| react-router-dom | ^7.0.0 | Routing |

### 21.2 State Management

| Package | Version | Purpose |
|---------|---------|---------|
| zustand | ^5.0.0 | Global state |
| @tanstack/react-query | ^5.0.0 | Server state |

### 21.3 Forms & Validation

| Package | Version | Purpose |
|---------|---------|---------|
| react-hook-form | ^7.0.0 | Form management |
| @hookform/resolvers | ^3.0.0 | Schema validation |
| zod | ^3.0.0 | Schema validation |

### 21.4 Styling & Animation

| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^4.0.0 | Utility CSS |
| framer-motion | ^11.0.0 | Animations |
| clsx | ^2.0.0 | Class utilities |

### 21.5 Data Fetching

| Package | Version | Purpose |
|---------|---------|---------|
| axios | ^1.0.0 | HTTP client |
| axios-retry | ^4.0.0 | Retry logic |

### 21.6 Internationalization

| Package | Version | Purpose |
|---------|---------|---------|
| i18next | ^24.0.0 | i18n framework |
| react-i18next | ^15.0.0 | React bindings |
| i18next-browser-languagedetector | ^8.0.0 | Language detection |

### 21.7 UI Components

| Package | Version | Purpose |
|---------|---------|---------|
| lucide-react | latest | Icons |
| swiper | ^11.0.0 | Carousels |
| @radix-ui/react-dialog | ^1.0.0 | Accessible modals |
| @radix-ui/react-dropdown-menu | ^2.0.0 | Accessible dropdowns |
| @radix-ui/react-accordion | ^1.0.0 | Accessible accordions |
| @radix-ui/react-tabs | ^1.0.0 | Accessible tabs |

### 21.8 SEO & Meta

| Package | Version | Purpose |
|---------|---------|---------|
| react-helmet-async | ^2.0.0 | Meta tags |
| react-schemaorg | ^3.0.0 | Structured data |

### 21.9 Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| date-fns | ^3.0.0 | Date formatting |
| dompurify | ^3.0.0 | HTML sanitization |
| lodash-es | ^4.0.0 | Utility functions |

### 21.10 Development Tools

| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.0.0 | Type checking |
| vite | ^6.0.0 | Build tool |
| eslint | ^9.0.0 | Linting |
| prettier | ^3.0.0 | Formatting |
| vitest | ^2.0.0 | Testing |
| @testing-library/react | ^15.0.0 | Component testing |
| @playwright/test | ^1.0.0 | E2E testing |

---

## 22. Best Practices

### 22.1 Performance

| Rule | Implementation |
|------|----------------|
| **Lazy Load** | All pages and heavy components |
| **Memoize** | Expensive computations, callbacks |
| **Virtualize** | Long lists (>100 items) |
| **Optimize Images** | WebP, responsive sizes, lazy loading |
| **Bundle Split** | Vendor, app, page-specific chunks |

### 22.2 Accessibility

| Rule | Implementation |
|------|----------------|
| **Semantic HTML** | Use proper elements |
| **ARIA Labels** | All interactive elements |
| **Keyboard Nav** | Full keyboard support |
| **Focus Management** | Visible focus states |
| **Color Contrast** | WCAG AA minimum |

### 22.3 Code Quality

| Rule | Implementation |
|------|----------------|
| **TypeScript Strict** | No implicit any |
| **ESLint** | Enforce code style |
| **Prettier** | Consistent formatting |
| **No Magic Numbers** | Use constants |
| **Single Responsibility** | Small, focused functions |

### 22.4 Security

| Rule | Implementation |
|------|----------------|
| **Validate Input** | Zod on all forms |
| **Sanitize Output** | DOMPurify for HTML |
| **Secure Tokens** | httpOnly cookies |
| **Env Variables** | No secrets in code |

### 22.5 Git Workflow

| Rule | Implementation |
|------|----------------|
| **Commits** | Conventional commits |
| **Branches** | feature/, fix/, chore/ |
| **PRs** | Required reviews |
| **Linting** | Pre-commit hooks |

---

## 23. Future Scalability

### 23.1 Feature Expansion

The architecture supports adding new features without modifying existing code:

```
features/
├── existing-feature/     # No changes needed
├── new-feature/          # Add new feature module
│   ├── components/
│   ├── hooks/
│   ├── api/
│   ├── types/
│   └── utils/
└── another-feature/       # Independent development
```

### 23.2 Module Federation Ready

The architecture is prepared for micro-frontend implementation:

- Feature modules are self-contained
- Shared design system via packages
- Independent deployments possible

### 23.3 State Management Scaling

| Scale | Solution |
|-------|----------|
| **Current** | Zustand + TanStack Query |
| **Medium** | Add React Query pagination |
| **Large** | Consider RTK Query |
| **Enterprise** | Micro-frontend architecture |

### 23.4 Performance Scaling

| Challenge | Solution |
|-----------|----------|
| **More Data** | Virtual scrolling, pagination |
| **More Users** | CDN, edge caching |
| **More Features** | Lazy loading, tree shaking |
| **More Traffic** | SSR/SSG, ISR |

### 23.5 Internationalization Scaling

| Language | Implementation |
|----------|----------------|
| **English** | Default |
| **Arabic** | RTL support |
| **Future** | Add locale folder |

---

**Document Status:** Ready for Implementation  
**Next Phase:** UI Design & Development  
**Prepared By:** Engineering Team  
**Review Date:** July 16, 2026