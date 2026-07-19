import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import logger from '../logger/logger.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  // Handle known errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      },
      statusCode: err.statusCode
    });
    return;
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const details = Object.values(err as unknown as Record<string, unknown>).map((e: unknown) => ({
      field: (e as { path?: string }).path,
      message: (e as { message?: string }).message
    }));
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details
      },
      statusCode: 400
    });
    return;
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_ID',
        message: 'Invalid resource identifier'
      },
      statusCode: 400
    });
    return;
  }

  // Handle MongoDB duplicate key error
  if ((err as { code?: number }).code === 11000) {
    const field = Object.keys((err as { keyValue?: Record<string, unknown> }).keyValue || {})[0];
    res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_ERROR',
        message: `${field} already exists`
      },
      statusCode: 409
    });
    return;
  }

  // Handle unknown errors
  const statusCode = 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred'
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message
    },
    statusCode
  });
};