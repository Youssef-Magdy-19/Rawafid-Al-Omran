import { z } from 'zod';

export const createPartnerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name cannot exceed 200 characters'),
  nameAr: z.string().min(1, 'Arabic name is required').max(200, 'Arabic name cannot exceed 200 characters'),
  slug: z.string().min(1, 'Slug is required').max(200, 'Slug cannot exceed 200 characters').optional(),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional(),
  descriptionAr: z.string().max(1000, 'Arabic description cannot exceed 1000 characters').optional(),
  logo: z.string().min(1, 'Logo is required'),
  website: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  categoryAr: z.string().min(1, 'Arabic category is required'),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional()
});

export const updatePartnerSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  nameAr: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  descriptionAr: z.string().max(1000).optional(),
  logo: z.string().optional(),
  website: z.string().optional(),
  category: z.string().min(1).optional(),
  categoryAr: z.string().min(1).optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional()
});

export const queryPartnerSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  isActive: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  isFeatured: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  category: z.string().optional(),
  sortBy: z.string().default('order'),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
});

export type CreatePartnerDto = z.infer<typeof createPartnerSchema>;
export type UpdatePartnerDto = z.infer<typeof updatePartnerSchema>;
export type QueryPartnerDto = z.infer<typeof queryPartnerSchema>;