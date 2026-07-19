import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { isAdmin, isEditor } from '../middlewares/authorize.middleware.js';
import { validateRequest, objectIdSchema } from '../middlewares/validateRequest.middleware.js';
import { createBlogSchema, updateBlogSchema, queryBlogSchema } from '../modules/blog/dtos/blog.dto.js';
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} from '../modules/blog/controllers/blog.controller.js';
import { z } from 'zod';

const router = Router();

// Get all blogs (public)
router.get(
  '/',
  validateRequest({ query: queryBlogSchema }),
  getAllBlogs
);

// Get blog by slug (public)
router.get(
  '/:slug',
  validateRequest({
    params: z.object({ slug: z.string().min(1) })
  }),
  getBlogBySlug
);

// Create blog (admin/editor only)
router.post(
  '/',
  authenticate,
  isEditor,
  validateRequest({ body: createBlogSchema }),
  createBlog
);

// Update blog (admin/editor only)
router.put(
  '/:id',
  authenticate,
  isEditor,
  validateRequest({
    params: z.object({ id: objectIdSchema }),
    body: updateBlogSchema
  }),
  updateBlog
);

// Delete blog (admin only)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  validateRequest({
    params: z.object({ id: objectIdSchema })
  }),
  deleteBlog
);

export default router;