import { z } from 'zod';

// Create Newsletter DTO
export interface CreateNewsletterDto {
  email: string;
  name?: string;
  isActive?: boolean;
  ipAddress?: string;
  userAgent?: string;
  subscribedAt?: Date;
}

export const createNewsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional()
});

// Update Newsletter DTO
export interface UpdateNewsletterDto {
  email?: string;
  name?: string;
  isActive?: boolean;
  unsubscribedAt?: Date;
}

export const updateNewsletterSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  unsubscribedAt: z.string().datetime().optional()
});

// Query Newsletter DTO
export interface QueryNewsletterDto {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const queryNewsletterSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
  sortBy: z.string().optional().default('subscribedAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});