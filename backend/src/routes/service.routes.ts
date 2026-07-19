import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin, isEditor } from '../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../middlewares/validateRequest.middleware.js';
import { createServiceSchema, updateServiceSchema, queryServiceSchema } from '../modules/service/dtos/service.dto.js';
import {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from '../modules/service/controllers/service.controller.js';
import { z } from 'zod';

const router = Router();

// Get all services (public)
router.get(
  '/',
  validateRequest({ query: queryServiceSchema }),
  getAllServices
);

// Get service by slug (public)
router.get(
  '/:slug',
  validateRequest({
    params: z.object({ slug: z.string().min(1) })
  }),
  getServiceBySlug
);

// Create service (admin/editor only)
router.post(
  '/',
  authenticate,
  isEditor,
  validateRequest({ body: createServiceSchema }),
  createService
);

// Update service (admin/editor only)
router.put(
  '/:id',
  authenticate,
  isEditor,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updateServiceSchema
  }),
  updateService
);

// Delete service (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deleteService
);

export default router;