import { z } from 'zod';

export const createFaqSchema = z.object({
  question: z.string().min(1, 'Question is required').max(500, 'Question cannot exceed 500 characters'),
  questionAr: z.string().min(1, 'Arabic question is required').max(500, 'Arabic question cannot exceed 500 characters'),
  answer: z.string().min(1, 'Answer is required').max(2000, 'Answer cannot exceed 2000 characters'),
  answerAr: z.string().min(1, 'Arabic answer is required').max(2000, 'Arabic answer cannot exceed 2000 characters'),
  category: z.string().min(1, 'Category is required'),
  categoryAr: z.string().min(1, 'Arabic category is required'),
  isActive: z.boolean().optional(),
  order: z.number().optional()
});

export const updateFaqSchema = z.object({
  question: z.string().min(1).max(500).optional(),
  questionAr: z.string().min(1).max(500).optional(),
  answer: z.string().min(1).max(2000).optional(),
  answerAr: z.string().min(1).max(2000).optional(),
  category: z.string().min(1).optional(),
  categoryAr: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional()
});

export const queryFaqSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  category: z.string().optional(),
  isActive: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sortBy: z.string().default('order'),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
});

export type CreateFaqDto = z.infer<typeof createFaqSchema>;
export type UpdateFaqDto = z.infer<typeof updateFaqSchema>;
export type QueryFaqDto = z.infer<typeof queryFaqSchema>;