import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../../../middlewares/auth.middleware.js';
import { isAdmin, isEditor } from '../../../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../../../middlewares/validateRequest.middleware.js';
import { createFaqSchema, updateFaqSchema, queryFaqSchema } from '../dtos/faq.dto.js';
import {
  getAllFaqs,
  getFaqById,
  getActiveFaqs,
  createFaq,
  updateFaq,
  deleteFaq
} from '../controllers/faq.controller.js';

const router = Router();

// Get all FAQs (admin only)
router.get(
  '/',
  authenticate,
  validateRequest({ query: queryFaqSchema }),
  getAllFaqs
);

// Get active FAQs (public)
router.get(
  '/active',
  getActiveFaqs
);

// Get FAQ by ID (admin only)
router.get(
  '/:id',
  authenticate,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  getFaqById
);

// Create FAQ (admin/editor only)
router.post(
  '/',
  authenticate,
  isEditor,
  validateRequest({ body: createFaqSchema }),
  createFaq
);

// Update FAQ (admin/editor only)
router.put(
  '/:id',
  authenticate,
  isEditor,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updateFaqSchema
  }),
  updateFaq
);

// Delete FAQ (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deleteFaq
);

export default router;