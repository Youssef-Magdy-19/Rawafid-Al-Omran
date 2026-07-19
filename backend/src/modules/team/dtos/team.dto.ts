import { z } from 'zod';

// Create Team DTO
export interface CreateTeamDto {
  name: string;
  nameAr: string;
  slug?: string;
  role: string;
  roleAr: string;
  bio?: string;
  bioAr?: string;
  image: string;
  thumbnail: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  order?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  department: string;
  departmentAr: string;
  yearsOfExperience?: number;
  completedProjects?: number;
}

export const createTeamSchema = z.object({
  name: z.string().min(1).max(100),
  nameAr: z.string().min(1).max(100),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  role: z.string().min(1).max(100),
  roleAr: z.string().min(1).max(100),
  bio: z.string().max(1000).optional(),
  bioAr: z.string().max(1000).optional(),
  image: z.string().min(1),
  thumbnail: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  department: z.string().min(1).max(100),
  departmentAr: z.string().min(1).max(100),
  yearsOfExperience: z.number().int().nonnegative().optional(),
  completedProjects: z.number().int().nonnegative().optional()
});

// Update Team DTO
export type UpdateTeamDto = Partial<CreateTeamDto>;

export const updateTeamSchema = createTeamSchema.partial();

// Query Team DTO
export interface QueryTeamDto {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const queryTeamSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  department: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortBy: z.string().optional().default('order'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
});