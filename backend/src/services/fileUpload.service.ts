import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../config/index.js';
import logger from '../logger/logger.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret
});

// Log Cloudinary configuration status (without exposing secrets)
logger.info('Cloudinary configuration', {
  hasCloudName: !!config.cloudinary.cloudName,
  hasApiKey: !!config.cloudinary.apiKey,
  hasApiSecret: !!config.cloudinary.apiSecret,
  cloudNameLength: config.cloudinary.cloudName?.length || 0,
  apiKeyLength: config.cloudinary.apiKey?.length || 0
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}

export interface ImageOptimizationOptions {
  quality?: 'auto' | 'auto:good' | 'auto:best' | number;
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
}

/**
 * Default optimization options
 */
const defaultOptimization: ImageOptimizationOptions = {
  quality: 'auto:good',
  crop: 'fill'
};

/**
 * Upload a single image to Cloudinary (from file path - for local development)
 */
export const uploadSingleImage = async (
  filePath: string,
  folder: string = 'rawafid-omran',
  options: ImageOptimizationOptions = {}
): Promise<CloudinaryUploadResult> => {
  const mergedOptions = { ...defaultOptimization, ...options };
  
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'image',
    transformation: [
      { quality: mergedOptions.quality },
      { fetch_format: 'auto' },
      ...(mergedOptions.width ? [{ width: mergedOptions.width }] : []),
      ...(mergedOptions.height ? [{ height: mergedOptions.height }] : []),
      ...(mergedOptions.crop ? [{ crop: mergedOptions.crop }] : [])
    ]
  });

  // Clean up local file
  await cleanupLocalFile(filePath);

  logger.info('Single image uploaded to Cloudinary', { publicId: result.public_id });
  
  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    created_at: result.created_at
  };
};

/**
 * Upload a buffer directly to Cloudinary (for Vercel serverless)
 * Uses authenticated upload_stream with comprehensive error handling
 */
export const uploadBuffer = async (
  buffer: Buffer,
  folder: string = 'rawafid-omran',
  options: ImageOptimizationOptions = {}
): Promise<CloudinaryUploadResult> => {
  const mergedOptions = { ...defaultOptimization, ...options };

  // Validate Cloudinary configuration
  if (
    !config.cloudinary.cloudName ||
    !config.cloudinary.apiKey ||
    !config.cloudinary.apiSecret
  ) {
    logger.error('Cloudinary configuration missing', {
      hasCloudName: !!config.cloudinary.cloudName,
      hasApiKey: !!config.cloudinary.apiKey,
      hasApiSecret: !!config.cloudinary.apiSecret
    });

    const error = new Error('Cloudinary is not properly configured');
    (error as any).code = 'CLOUDINARY_CONFIG_MISSING';
    throw error;
  }

  logger.info('Starting buffer upload to Cloudinary', {
    bufferSize: buffer.length,
    folder,
    cloudName: config.cloudinary.cloudName,
    hasTransformations: !!(mergedOptions.width || mergedOptions.height || mergedOptions.crop)
  });

  // Build transformation array
  const transformations: Record<string, unknown>[] = [
    { quality: mergedOptions.quality },
    { fetch_format: 'auto' }
  ];
  
  if (mergedOptions.width) {
    transformations.push({ width: mergedOptions.width });
  }
  if (mergedOptions.height) {
    transformations.push({ height: mergedOptions.height });
  }
  if (mergedOptions.crop) {
    transformations.push({ crop: mergedOptions.crop });
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: transformations
      },
      (error, result) => {
        if (error) {
          // Comprehensive error logging for diagnosis
          logger.error('Cloudinary upload_stream error', {
            errorType: typeof error,
            errorMessage: error?.message,
            errorName: error?.name,
            httpCode: error?.http_code,
            errorStack: error?.stack,
            // Log all enumerable keys for debugging
            errorKeys: error ? Object.keys(error) : [],
            errorValues: error ? Object.entries(error).map(([k, v]) => 
              k === 'api_key' || k === 'api_secret' ? [k, '[REDACTED]'] : [k, v]
            ) : []
          });

          // Create a proper Error object with all diagnostic info
          const uploadError = new Error(
            error?.message || 'Cloudinary upload failed'
          );
          
          // Attach diagnostic properties (non-enumerable safe properties)
          Object.defineProperties(uploadError, {
            statusCode: { value: error?.http_code, enumerable: true },
            cloudinaryError: { value: error?.name, enumerable: true },
            cloudinaryMessage: { value: error?.message, enumerable: true },
            cloudinaryHttpCode: { value: error?.http_code, enumerable: true }
          });

          reject(uploadError);
        } else if (result) {
          logger.info('Buffer uploaded to Cloudinary', {
            publicId: result.public_id,
            secureUrl: result.secure_url,
            format: result.format,
            bytes: result.bytes
          });

          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            created_at: result.created_at
          });
        } else {
          logger.error('Cloudinary returned no result');
          const noResultError = new Error('Cloudinary upload failed: no result returned');
          (noResultError as any).code = 'CLOUDINARY_NO_RESULT';
          reject(noResultError);
        }
      }
    );

    // Write buffer to stream
    uploadStream.end(buffer);
  });
};

/**
 * Upload multiple images to Cloudinary (gallery)
 */
export const uploadGallery = async (
  filePaths: string[],
  folder: string = 'rawafid-omran/gallery',
  options: ImageOptimizationOptions = {}
): Promise<CloudinaryUploadResult[]> => {
  const results: CloudinaryUploadResult[] = [];
  
  for (const filePath of filePaths) {
    try {
      const result = await uploadSingleImage(filePath, folder, options);
      results.push(result);
    } catch (error) {
      logger.error('Failed to upload image to gallery', { filePath, error });
      throw error;
    }
  }

  logger.info('Gallery uploaded to Cloudinary', { count: results.length });
  return results;
};

/**
 * Delete a single image from Cloudinary
 */
export const deleteImage = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info('Image deleted from Cloudinary', { publicId, result });
    return result.result === 'ok';
  } catch (error) {
    logger.error('Failed to delete image from Cloudinary', { publicId, error });
    return false;
  }
};

/**
 * Delete multiple images from Cloudinary
 */
export const deleteMultipleImages = async (publicIds: string[]): Promise<boolean> => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    logger.info('Multiple images deleted from Cloudinary', { count: publicIds.length });
    return !!result;
  } catch (error) {
    logger.error('Failed to delete multiple images from Cloudinary', { error });
    return false;
  }
};

/**
 * Replace an image (delete old, upload new)
 */
export const replaceImage = async (
  oldPublicId: string,
  newFilePath: string,
  folder: string = 'rawafid-omran',
  options: ImageOptimizationOptions = {}
): Promise<CloudinaryUploadResult> => {
  // Delete old image
  await deleteImage(oldPublicId);
  
  // Upload new image
  const result = await uploadSingleImage(newFilePath, folder, options);
  
  logger.info('Image replaced in Cloudinary', { oldPublicId, newPublicId: result.public_id });
  return result;
};

/**
 * Get image details from Cloudinary
 */
export const getImageDetails = async (publicId: string): Promise<Record<string, unknown>> => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      colors: true,
      image_metadata: true
    });
    return result;
  } catch (error) {
    logger.error('Failed to get image details from Cloudinary', { publicId, error });
    throw error;
  }
};

/**
 * Generate optimized image URL
 */
export const getOptimizedImageUrl = (
  publicId: string,
  options: ImageOptimizationOptions = {}
): string => {
  const mergedOptions = { ...defaultOptimization, ...options };
  
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { quality: mergedOptions.quality },
      { fetch_format: 'auto' },
      ...(mergedOptions.width ? [{ width: mergedOptions.width }] : []),
      ...(mergedOptions.height ? [{ height: mergedOptions.height }] : []),
      ...(mergedOptions.crop ? [{ crop: mergedOptions.crop }] : [])
    ]
  });
};

/**
 * Generate thumbnail URL
 */
export const getThumbnailUrl = (
  publicId: string,
  width: number = 150,
  height: number = 150
): string => {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { width, height },
      { crop: 'thumb' },
      { quality: 'auto' },
      { fetch_format: 'auto' }
    ]
  });
};

/**
 * Clean up local file after upload
 */
const cleanupLocalFile = async (filePath: string): Promise<void> => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      logger.debug('Local file cleaned up', { filePath });
    }
  } catch (error) {
    logger.warn('Failed to clean up local file', { filePath, error });
  }
};

/**
 * Verify Cloudinary connection using ping
 */
export const verifyCloudinaryConnection = async (): Promise<{
  success: boolean;
  status?: string;
  error?: string;
  diagnostic?: Record<string, unknown>;
}> => {
  try {
    logger.info('Testing Cloudinary API ping');
    const result = await cloudinary.api.ping();
    logger.info('Cloudinary API ping successful', { status: result.status });
    return { success: true, status: result.status };
  } catch (error: any) {
    logger.error('Cloudinary connection verification failed', {
      errorMessage: error?.message,
      errorName: error?.name,
      httpCode: error?.http_code,
      errorKeys: error ? Object.keys(error) : []
    });
    return { 
      success: false, 
      error: error?.message || 'Connection failed',
      diagnostic: {
        name: error?.name,
        httpCode: error?.http_code,
        message: error?.message
      }
    };
  }
};

/**
 * Test authenticated upload with minimal configuration
 */
export const testAuthenticatedUpload = async (): Promise<{
  success: boolean;
  result?: CloudinaryUploadResult;
  error?: string;
  diagnostic?: Record<string, unknown>;
}> => {
  // Validate configuration first
  if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
    return {
      success: false,
      error: 'Cloudinary not configured',
      diagnostic: {
        hasCloudName: !!config.cloudinary.cloudName,
        hasApiKey: !!config.cloudinary.apiKey,
        hasApiSecret: !!config.cloudinary.apiSecret
      }
    };
  }

  try {
    // Create a minimal 1x1 transparent PNG buffer (base64)
    const minimalPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    logger.info('Testing authenticated upload with minimal image', {
      bufferSize: minimalPng.length,
      cloudName: config.cloudinary.cloudName
    });

    const result = await uploadBuffer(minimalPng, 'rawafid-omran/test');
    
    logger.info('Test authenticated upload successful', {
      publicId: result.public_id,
      secureUrl: result.secure_url
    });

    // Clean up test image
    await deleteImage(result.public_id);

    return { success: true, result };
  } catch (error: any) {
    logger.error('Test authenticated upload failed', {
      errorMessage: error?.message,
      errorName: error?.name,
      statusCode: error?.statusCode,
      cloudinaryError: error?.cloudinaryError,
      cloudinaryHttpCode: error?.cloudinaryHttpCode
    });

    return {
      success: false,
      error: error?.message || 'Upload test failed',
      diagnostic: {
        name: error?.name,
        message: error?.message,
        statusCode: error?.statusCode,
        cloudinaryError: error?.cloudinaryError,
        cloudinaryHttpCode: error?.cloudinaryHttpCode
      }
    };
  }
};

export default {
  uploadSingleImage,
  uploadBuffer,
  uploadGallery,
  deleteImage,
  deleteMultipleImages,
  replaceImage,
  getImageDetails,
  getOptimizedImageUrl,
  getThumbnailUrl,
  verifyCloudinaryConnection,
  testAuthenticatedUpload
};