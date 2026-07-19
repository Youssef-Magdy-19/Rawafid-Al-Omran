import { z } from 'zod';

// Create Testimonial DTO
export interface CreateTestimonialDto {
  name: string;
  nameAr: string;
  slug?: string;
  role: string;
  roleAr: string;
  company: string;
  companyAr: string;
  content: string;
  contentAr: string;
  rating?: number;
  image: string;
  thumbnail: string;
  projectId?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  order?: number;
}

export const createTestimonialSchema = z.object({
  name: z.string().min(1).max(100),
  nameAr: z.string().min(1).max(100),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  role: z.string().min(1).max(100),
  roleAr: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  companyAr: z.string().min(1).max(100),
  content: z.string().min(1).max(2000),
  contentAr: z.string().min(1).max(2000),
  rating: z.number().int().min(1).max(5).optional(),
  image: z.string().min(1),
  thumbnail: z.string().min(1),
  projectId: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional()
});

// Update Testimonial DTO
export type UpdateTestimonialDto = Partial<CreateTestimonialDto>;

export const updateTestimonialSchema = createTestimonialSchema.partial();

// Query Testimonial DTO
export interface QueryTestimonialDto {
  page?: number;
  limit?: number;
  search?: string;
  projectId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const queryTestimonialSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  projectId: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortBy: z.string().optional().default('order'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
});