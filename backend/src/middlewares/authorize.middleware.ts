import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ForbiddenError } from '../errors/AppError.js';

export type Role = 'admin' | 'editor' | 'user' | 'guest';

export const authorize = (...allowedRoles: Role[]) => {
  return (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ): void => {
    try {
      if (!req.user) {
        throw new ForbiddenError('User not authenticated');
      }

      if (!allowedRoles.includes(req.user.role as Role)) {
        throw new ForbiddenError(
          `Access denied. Required roles: ${allowedRoles.join(', ')}`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const isAdmin = authorize('admin');
export const isEditor = authorize('admin', 'editor');
export const isAuthenticated = authorize('admin', 'editor', 'user');