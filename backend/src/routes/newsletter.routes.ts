import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../middlewares/validateRequest.middleware.js';
import { createNewsletterSchema, updateNewsletterSchema, queryNewsletterSchema } from '../modules/newsletter/dtos/newsletter.dto.js';
import {
  getAllNewsletters,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter
} from '../modules/newsletter/controllers/newsletter.controller.js';
import { z } from 'zod';

const router = Router();

// Get all subscribers (admin only)
router.get(
  '/',
  authenticate,
  isAdmin,
  validateRequest({ query: queryNewsletterSchema }),
  getAllNewsletters
);

// Subscribe (public)
router.post(
  '/',
  validateRequest({ body: createNewsletterSchema }),
  createNewsletter
);

// Update newsletter (admin only)
router.put(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updateNewsletterSchema
  }),
  updateNewsletter
);

// Delete subscriber (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deleteNewsletter
);

export default router;