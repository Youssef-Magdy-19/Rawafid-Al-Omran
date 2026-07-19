import { z } from 'zod';

// Create Contact DTO
export interface CreateContactDto {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  subjectAr: string;
  message: string;
  messageAr: string;
}

export const createContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().max(100).optional(),
  subject: z.string().min(1).max(200),
  subjectAr: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
  messageAr: z.string().min(1).max(5000)
});

// Update Contact DTO
export interface UpdateContactDto {
  isRead?: boolean;
  isReplied?: boolean;
  repliedAt?: Date;
  repliedBy?: string;
}

export const updateContactSchema = z.object({
  isRead: z.boolean().optional(),
  isReplied: z.boolean().optional(),
  repliedAt: z.string().datetime().optional(),
  repliedBy: z.string().optional()
});

// Query Contact DTO
export interface QueryContactDto {
  page?: number;
  limit?: number;
  search?: string;
  isRead?: boolean;
  isReplied?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const queryContactSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  isRead: z.boolean().optional(),
  isReplied: z.boolean().optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});