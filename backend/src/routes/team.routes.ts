import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin, isEditor } from '../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../middlewares/validateRequest.middleware.js';
import { createTeamSchema, updateTeamSchema, queryTeamSchema } from '../modules/team/dtos/team.dto.js';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../modules/team/controllers/team.controller.js';

const router = Router();

// Get all team members (public)
router.get(
  '/',
  validateRequest({ query: queryTeamSchema }),
  getAllTeamMembers
);

// Get team member by ID (public)
router.get(
  '/:id',
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  getTeamMemberById
);

// Create team member (admin/editor only)
router.post(
  '/',
  authenticate,
  isEditor,
  validateRequest({ body: createTeamSchema }),
  createTeamMember
);

// Update team member (admin/editor only)
router.put(
  '/:id',
  authenticate,
  isEditor,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updateTeamSchema
  }),
  updateTeamMember
);

// Delete team member (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deleteTeamMember
);

export default router;