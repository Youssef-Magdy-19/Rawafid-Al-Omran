import { Request, Response, NextFunction } from 'express';

// Extend Express Request
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Pagination types
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationMeta;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
  statusCode: number;
}

// Locale types
export type Locale = 'en' | 'ar';

// Localized field helper type
export type LocalizedField<T> = {
  [key in Locale]?: T;
};

// Common document interface
export interface BaseDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  isActive: boolean;
}

// Filter options
export interface FilterOptions {
  isActive?: boolean;
  isDeleted?: boolean;
  locale?: Locale;
}

// Search options
export interface SearchOptions extends FilterOptions {
  query?: string;
  fields?: string[];
}

// File upload types
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  url: string;
}

// Async handler type
export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;