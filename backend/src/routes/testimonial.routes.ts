import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin, isEditor } from '../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../middlewares/validateRequest.middleware.js';
import { createTestimonialSchema, updateTestimonialSchema, queryTestimonialSchema } from '../modules/testimonial/dtos/testimonial.dto.js';
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../modules/testimonial/controllers/testimonial.controller.js';

const router = Router();

// Get all testimonials (public)
router.get(
  '/',
  validateRequest({ query: queryTestimonialSchema }),
  getAllTestimonials
);

// Get testimonial by ID (public)
router.get(
  '/:id',
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  getTestimonialById
);

// Create testimonial (admin/editor only)
router.post(
  '/',
  authenticate,
  isEditor,
  validateRequest({ body: createTestimonialSchema }),
  createTestimonial
);

// Update testimonial (admin/editor only)
router.put(
  '/:id',
  authenticate,
  isEditor,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updateTestimonialSchema
  }),
  updateTestimonial
);

// Delete testimonial (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deleteTestimonial
);

export default router;