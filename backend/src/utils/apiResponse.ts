import { Response } from 'express';

/**
 * Standardized API Response Messages
 */
export const ResponseMessages = {
  FETCHED: 'Successfully fetched.',
  CREATED: 'Successfully created.',
  UPDATED: 'Successfully updated.',
  DELETED: 'Successfully deleted.',
  LOGIN_SUCCESS: 'Login successful.',
  REGISTER_SUCCESS: 'Registration successful.',
  LOGOUT_SUCCESS: 'Logout successful.',
  SUBSCRIBED: 'Successfully subscribed.',
  UNSUBSCRIBED: 'Successfully unsubscribed.',
} as const;

/**
 * Pagination metadata interface
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Standard success response
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = ResponseMessages.FETCHED,
  statusCode: number = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Created response
 */
export const sendCreated = <T>(
  res: Response,
  data: T,
  message: string = ResponseMessages.CREATED
): void => {
  res.status(201).json({
    success: true,
    message,
    data,
  });
};

/**
 * Updated response
 */
export const sendUpdated = <T>(
  res: Response,
  data: T,
  message: string = ResponseMessages.UPDATED
): void => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

/**
 * Deleted response
 */
export const sendDeleted = (
  res: Response,
  message: string = ResponseMessages.DELETED
): void => {
  res.status(200).json({
    success: true,
    message,
  });
};

/**
 * Paginated response
 */
export const sendPaginated = <T>(
  res: Response,
  data: T[],
  pagination: PaginationMeta,
  message: string = ResponseMessages.FETCHED
): void => {
  res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
};

/**
 * Empty response (no content)
 */
export const sendNoContent = (res: Response): void => {
  res.status(204).send();
};

/**
 * Build pagination metadata
 */
export const buildPaginationMeta = (
  page: number,
  limit: number,
  total: number
): PaginationMeta => {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};