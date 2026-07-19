import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../../../middlewares/auth.middleware.js';
import { isAdmin, isEditor } from '../../../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../../../middlewares/validateRequest.middleware.js';
import { createPartnerSchema, updatePartnerSchema, queryPartnerSchema } from '../dtos/partner.dto.js';
import {
  getAllPartners,
  getPartnerById,
  getFeaturedPartners,
  createPartner,
  updatePartner,
  deletePartner
} from '../controllers/partner.controller.js';

const router = Router();

// Get all partners (public)
router.get(
  '/',
  validateRequest({ query: queryPartnerSchema }),
  getAllPartners
);

// Get featured partners (public)
router.get(
  '/featured',
  getFeaturedPartners
);

// Get partner by ID (public)
router.get(
  '/:id',
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  getPartnerById
);

// Create partner (admin/editor only)
router.post(
  '/',
  authenticate,
  isEditor,
  validateRequest({ body: createPartnerSchema }),
  createPartner
);

// Update partner (admin/editor only)
router.put(
  '/:id',
  authenticate,
  isEditor,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updatePartnerSchema
  }),
  updatePartner
);

// Delete partner (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deletePartner
);

export default router;