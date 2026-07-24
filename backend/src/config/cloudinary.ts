/**
 * Centralized Cloudinary Configuration
 * 
 * This is the single source of truth for Cloudinary configuration.
 * Import this in services that need Cloudinary access.
 */

import { v2 as cloudinary } from 'cloudinary';
import config from './index.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true
});

// Export configured instance
export default cloudinary;

// Export validation helper
export const isCloudinaryConfigured = (): boolean =>
  !!(config.cloudinary.cloudName && config.cloudinary.apiKey && config.cloudinary.apiSecret);

// Export config for debugging (without secrets)
export const getCloudinaryConfigStatus = () => ({
  configured: !!(config.cloudinary.cloudName && config.cloudinary.apiKey && config.cloudinary.apiSecret),
  cloudName: config.cloudinary.cloudName || null,
  hasApiKey: !!config.cloudinary.apiKey,
  hasApiSecret: !!config.cloudinary.apiSecret
});