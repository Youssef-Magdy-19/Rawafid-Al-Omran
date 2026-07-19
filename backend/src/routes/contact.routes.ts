import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../middlewares/validateRequest.middleware.js';
import { createContactSchema, updateContactSchema, queryContactSchema } from '../modules/contact/dtos/contact.dto.js';
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact
} from '../modules/contact/controllers/contact.controller.js';

const router = Router();

// Get all contacts (admin only)
router.get(
  '/',
  authenticate,
  isAdmin,
  validateRequest({ query: queryContactSchema }),
  getAllContacts
);

// Create contact (public)
router.post(
  '/',
  validateRequest({ body: createContactSchema }),
  createContact
);

// Update contact (admin only)
router.put(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updateContactSchema
  }),
  updateContact
);

// Delete contact (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deleteContact
);

export default router;