import { z } from 'zod';

// Create Blog DTO
export interface CreateBlogDto {
  title: string;
  titleAr: string;
  slug: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  author: string;
  authorAr: string;
  category: string;
  categoryAr: string;
  tags?: string[];
  tagsAr?: string[];
  image: string;
  thumbnail: string;
  readTime?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  isPublished?: boolean;
  publishedAt?: Date;
  seoTitle?: string;
  seoTitleAr?: string;
  seoDescription?: string;
  seoDescriptionAr?: string;
}

export const createBlogSchema = z.object({
  title: z.string().min(1).max(200),
  titleAr: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  excerpt: z.string().min(1).max(500),
  excerptAr: z.string().min(1).max(500),
  content: z.string().min(1),
  contentAr: z.string().min(1),
  author: z.string().min(1).max(100),
  authorAr: z.string().min(1).max(100),
  category: z.string().min(1).max(100),
  categoryAr: z.string().min(1).max(100),
  tags: z.array(z.string()).optional(),
  tagsAr: z.array(z.string()).optional(),
  image: z.string().min(1),
  thumbnail: z.string().min(1),
  readTime: z.number().int().positive().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  publishedAt: z.string().datetime().optional(),
  seoTitle: z.string().max(70).optional(),
  seoTitleAr: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
  seoDescriptionAr: z.string().max(160).optional()
});

// Update Blog DTO
export type UpdateBlogDto = Partial<CreateBlogDto>;

export const updateBlogSchema = createBlogSchema.partial();

// Query Blog DTO
export interface QueryBlogDto {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isPublished?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const queryBlogSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  sortBy: z.string().optional().default('publishedAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});