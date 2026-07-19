import { z } from 'zod';

// Create Project DTO
export interface CreateProjectDto {
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
  status?: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  images?: string[];
  thumbnail: string;
  videoUrl?: string;
  budget: string;
  budgetAr: string;
  features?: string[];
  featuresAr?: string[];
  challenges?: string;
  challengesAr?: string;
  solutions?: string;
  solutionsAr?: string;
  results?: string;
  resultsAr?: string;
  testimonialId?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  order?: number;
  completionDate?: Date;
}

export const createProjectSchema = z.object({
  title: z.string().min(1).max(200),
  titleAr: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(1).max(10000),
  descriptionAr: z.string().min(1).max(10000),
  shortDescription: z.string().min(1).max(500),
  shortDescriptionAr: z.string().min(1).max(500),
  category: z.string().min(1).max(100),
  categoryAr: z.string().min(1).max(100),
  location: z.string().min(1).max(200),
  locationAr: z.string().min(1).max(200),
  client: z.string().min(1).max(100),
  clientAr: z.string().min(1).max(100),
  year: z.number().int().positive(),
  duration: z.string().min(1).max(100),
  durationAr: z.string().min(1).max(100),
  status: z.enum(['planning', 'in-progress', 'completed', 'on-hold']).optional(),
  images: z.array(z.string()).optional(),
  thumbnail: z.string().min(1),
  videoUrl: z.string().url().optional(),
  budget: z.string().min(1).max(100),
  budgetAr: z.string().min(1).max(100),
  features: z.array(z.string()).optional(),
  featuresAr: z.array(z.string()).optional(),
  challenges: z.string().max(5000).optional(),
  challengesAr: z.string().max(5000).optional(),
  solutions: z.string().max(5000).optional(),
  solutionsAr: z.string().max(5000).optional(),
  results: z.string().max(5000).optional(),
  resultsAr: z.string().max(5000).optional(),
  testimonialId: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
  completionDate: z.string().datetime().optional()
});

// Update Project DTO
export type UpdateProjectDto = Partial<CreateProjectDto>;

export const updateProjectSchema = createProjectSchema.partial();

// Query Project DTO
export interface QueryProjectDto {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  year?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const queryProjectSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  year: z.coerce.number().int().positive().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortBy: z.string().optional().default('order'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
});