import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError, z } from 'zod';
import { AppError } from '../errors/AppError.js';

interface ValidationOptions {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

/**
 * Creates a reusable validation middleware
 * Validates request body, query, and params using Zod schemas
 */
export const validateRequest = (options: ValidationOptions) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (options.body) {
        req.body = await options.body.parseAsync(req.body);
      }

      if (options.query) {
        req.query = await options.query.parseAsync(req.query);
      }

      if (options.params) {
        req.params = await options.params.parseAsync(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));

        next(
          new AppError(
            JSON.stringify({
              status: 'error',
              message: 'Validation failed',
              errors
            }),
            400
          )
        );
        return;
      }
      next(error);
    }
  };
};

/**
 * Common validation schemas for reuse
 */
export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

export { z };