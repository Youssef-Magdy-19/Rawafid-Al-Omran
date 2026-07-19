import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss';
import { Request, Response, NextFunction } from 'express';

/**
 * MongoDB Sanitization
 * Prevents NoSQL injection attacks
 */
export const mongoSanitizer = mongoSanitize({
  onSanitize: ({ key }) => {
    console.warn(`MongoDB sanitization triggered for key: ${key}`);
  }
});

/**
 * XSS Protection options
 */
const xssOptions = {
  whiteList: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    p: [],
    br: [],
    strong: [],
    em: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    ul: [],
    ol: [],
    li: [],
    blockquote: [],
    code: [],
    pre: []
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style']
};

/**
 * XSS Sanitization middleware
 * Sanitizes request body, query, and params
 */
export const xssSanitizer = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  if (req.query) {
    req.query = sanitizeObject(req.query) as typeof req.query;
  }
  if (req.params) {
    req.params = sanitizeObject(req.params) as typeof req.params;
  }
  next();
};

/**
 * Recursively sanitize an object
 */
const sanitizeObject = (obj: unknown): unknown => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return xss(obj, xssOptions);
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  if (typeof obj === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      // Skip keys that might be MongoDB operators
      if (key.startsWith('$')) {
        sanitized[key] = value;
      } else {
        sanitized[key] = sanitizeObject(value);
      }
    }
    return sanitized;
  }

  return obj;
};

/**
 * Combined sanitization middleware
 */
export const sanitizeMiddleware = [mongoSanitizer, xssSanitizer];