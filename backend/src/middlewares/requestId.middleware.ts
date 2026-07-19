import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

// Extend Express Request to include requestId
export interface RequestWithId extends Request {
  requestId: string;
}

/**
 * Middleware to generate and attach a unique request ID to each request
 */
export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get request ID from header or generate new one
  const requestId = (req.headers['x-request-id'] as string) || randomUUID();
  
  // Attach to request object
  (req as RequestWithId).requestId = requestId;
  
  // Add to response headers
  res.setHeader('X-Request-ID', requestId);
  
  next();
};

export default requestIdMiddleware;