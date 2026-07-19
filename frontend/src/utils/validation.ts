import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Quote Request Schema
export const quoteRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  projectDescription: z.string().min(20, 'Please provide more details about your project'),
  howDidYouHear: z.string().optional(),
});

// Job Application Schema
export const jobApplicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  linkedin: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  coverLetter: z.string().optional(),
});

// Newsletter Schema
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Search Schema
export const searchSchema = z.object({
  query: z.string().min(1, 'Please enter a search term'),
});

// Type exports
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;
export type JobApplicationData = z.infer<typeof jobApplicationSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type SearchData = z.infer<typeof searchSchema>;