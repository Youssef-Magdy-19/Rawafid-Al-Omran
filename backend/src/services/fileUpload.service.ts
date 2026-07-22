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
  hasApiSecret: !!config.cloudinary.apiSecret
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
 * Tests minimal configuration first, then adds transformations
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

    throw new Error('Cloudinary is not properly configured');
  }

  logger.info('Starting buffer upload to Cloudinary', {
    bufferSize: buffer.length,
    folder,
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
          // Create a proper Error object with diagnostic info
          const uploadError = new Error(
            error.message || 'Cloudinary upload failed'
          );
          
          // Attach safe diagnostic properties
          (uploadError as any).statusCode = error.http_code;
          (uploadError as any).cloudinaryError = error.name;
          (uploadError as any).cloudinaryMessage = error.message;
          
          logger.error('Cloudinary upload_stream error', {
            message: error.message,
            name: error.name,
            httpCode: error.http_code,
            folder
          });

          reject(uploadError);
        } else if (result) {
          logger.info('Buffer uploaded to Cloudinary', {
            publicId: result.public_id,
            secureUrl: result.secure_url
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
          reject(new Error('Cloudinary upload failed: no result returned'));
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
 * Verify Cloudinary connection
 */
export const verifyCloudinaryConnection = async (): Promise<boolean> => {
  try {
    const result = await cloudinary.api.ping();
    logger.info('Cloudinary connection verified');
    return result.status === 'ok';
  } catch (error) {
    logger.error('Cloudinary connection verification failed', { error });
    return false;
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
  verifyCloudinaryConnection
};