import { Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service.js';
import { AuthenticatedRequest } from '../types/index.js';
import { UnauthorizedError } from '../errors/AppError.js';

export const authenticate = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const optionalAuth = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);

      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      };
    }

    next();
  } catch {
    // Token invalid but optional, continue without user
    next();
  }
};