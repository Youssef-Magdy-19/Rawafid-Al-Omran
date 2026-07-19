import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../middlewares/validateRequest.middleware.js';
import { createQuoteSchema, updateQuoteSchema, queryQuoteSchema } from '../modules/quote/dtos/quote.dto.js';
import {
  getAllQuotes,
  createQuote,
  updateQuote,
  deleteQuote
} from '../modules/quote/controllers/quote.controller.js';
import { z } from 'zod';

const router = Router();

// Get all quotes (admin only)
router.get(
  '/',
  authenticate,
  isAdmin,
  validateRequest({ query: queryQuoteSchema }),
  getAllQuotes
);

// Create quote (public)
router.post(
  '/',
  validateRequest({ body: createQuoteSchema }),
  createQuote
);

// Update quote (admin only)
router.put(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updateQuoteSchema
  }),
  updateQuote
);

// Delete quote (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deleteQuote
);

export default router;