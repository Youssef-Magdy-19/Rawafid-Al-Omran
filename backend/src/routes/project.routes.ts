import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin, isEditor } from '../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../middlewares/validateRequest.middleware.js';
import { createProjectSchema, updateProjectSchema, queryProjectSchema } from '../modules/project/dtos/project.dto.js';
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} from '../modules/project/controllers/project.controller.js';
import { z } from 'zod';

const router = Router();

// Get all projects (public)
router.get(
  '/',
  validateRequest({ query: queryProjectSchema }),
  getAllProjects
);

// Get project by slug (public)
router.get(
  '/:slug',
  validateRequest({
    params: z.object({ slug: z.string().min(1) })
  }),
  getProjectBySlug
);

// Create project (admin/editor only)
router.post(
  '/',
  authenticate,
  isEditor,
  validateRequest({ body: createProjectSchema }),
  createProject
);

// Update project (admin/editor only)
router.put(
  '/:id',
  authenticate,
  isEditor,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updateProjectSchema
  }),
  updateProject
);

// Delete project (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deleteProject
);

export default router;