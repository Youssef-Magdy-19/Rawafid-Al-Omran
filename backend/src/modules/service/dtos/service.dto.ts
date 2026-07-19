import { z } from 'zod';

// Process Step Schema
export const processStepSchema = z.object({
  step: z.number().int().positive(),
  title: z.string().min(1).max(200),
  titleAr: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  descriptionAr: z.string().min(1).max(2000)
});

// FAQ Schema
export const faqSchema = z.object({
  question: z.string().min(1).max(500),
  questionAr: z.string().min(1).max(500),
  answer: z.string().min(1).max(2000),
  answerAr: z.string().min(1).max(2000)
});

// Create Service DTO
export interface CreateServiceDto {
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  icon?: string;
  image?: string;
  features?: string[];
  featuresAr?: string[];
  benefits?: string[];
  benefitsAr?: string[];
  process?: z.infer<typeof processStepSchema>[];
  faqs?: z.infer<typeof faqSchema>[];
  order?: number;
  isActive?: boolean;
  isFeatured?: boolean;
}

export const createServiceSchema = z.object({
  title: z.string().min(1).max(200),
  titleAr: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(1).max(5000),
  descriptionAr: z.string().min(1).max(5000),
  shortDescription: z.string().min(1).max(500),
  shortDescriptionAr: z.string().min(1).max(500),
  icon: z.string().optional(),
  image: z.string().optional(),
  features: z.array(z.string()).optional(),
  featuresAr: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  benefitsAr: z.array(z.string()).optional(),
  process: z.array(processStepSchema).optional(),
  faqs: z.array(faqSchema).optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional()
});

// Update Service DTO
export type UpdateServiceDto = Partial<CreateServiceDto>;

export const updateServiceSchema = createServiceSchema.partial();

// Query Service DTO
export interface QueryServiceDto {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const queryServiceSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortBy: z.string().optional().default('order'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
});