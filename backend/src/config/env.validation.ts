import { z } from 'zod';
import logger from '../logger/logger.js';

// Environment validation schema using Zod
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  API_VERSION: z.string().default('v1'),
  MONGODB_URI: z.string().min(1, 'MongoDB URI is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.string().default('587'),
  SMTP_SECURE: z.string().default('false'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default('noreply@rawafid-omran.com'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
  MAX_FILE_SIZE: z.string().default('10485760'),
  UPLOAD_FOLDER: z.string().default('./uploads'),
  LOG_LEVEL: z.string().default('info'),
  LOG_FILE: z.string().default('./logs/app.log'),
});

// Validate environment variables
export const validateEnv = (): void => {
  try {
    // Get raw env for validation
    const rawEnv = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      API_VERSION: process.env.API_VERSION,
      MONGODB_URI: process.env.MONGODB_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
      JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_SECURE: process.env.SMTP_SECURE,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      SMTP_FROM: process.env.SMTP_FROM,
      RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
      RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
      ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
      MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
      UPLOAD_FOLDER: process.env.UPLOAD_FOLDER,
      LOG_LEVEL: process.env.LOG_LEVEL,
      LOG_FILE: process.env.LOG_FILE,
    };

    // Validate and parse
    const result = envSchema.safeParse(rawEnv);

    if (!result.success) {
      const errors = result.error.errors.map(
        (err) => `${err.path.join('.')}: ${err.message}`
      );
      
      logger.error('Environment validation failed:', { errors });
      throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
    }

    logger.info('Environment validation passed');
  } catch (error) {
    logger.error('Failed to validate environment:', error);
    throw error;
  }
};

export default validateEnv;