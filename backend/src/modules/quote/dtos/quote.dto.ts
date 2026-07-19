import { z } from 'zod';
import { QuoteStatus } from '../models/quote.model.js';

// Create Quote DTO
export interface CreateQuoteDto {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  serviceTypeAr: string;
  budget: string;
  budgetAr: string;
  timeline: string;
  timelineAr: string;
  projectDescription: string;
  projectDescriptionAr: string;
  attachments?: string[];
}

export const createQuoteSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().max(100).optional(),
  serviceType: z.string().min(1).max(100),
  serviceTypeAr: z.string().min(1).max(100),
  budget: z.string().min(1).max(100),
  budgetAr: z.string().min(1).max(100),
  timeline: z.string().min(1).max(100),
  timelineAr: z.string().min(1).max(100),
  projectDescription: z.string().min(1).max(5000),
  projectDescriptionAr: z.string().min(1).max(5000),
  attachments: z.array(z.string()).optional()
});

// Update Quote DTO
export interface UpdateQuoteDto {
  status?: QuoteStatus;
  isRead?: boolean;
  assignedTo?: string;
  notes?: string;
  notesAr?: string;
}

export const updateQuoteSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'in-progress', 'completed', 'rejected']).optional(),
  isRead: z.boolean().optional(),
  assignedTo: z.string().optional(),
  notes: z.string().max(2000).optional(),
  notesAr: z.string().max(2000).optional()
});

// Query Quote DTO
export interface QueryQuoteDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  isRead?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const queryQuoteSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  status: z.string().optional(),
  isRead: z.boolean().optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});