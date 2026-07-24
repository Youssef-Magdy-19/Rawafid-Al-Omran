import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import https from 'https';
import crypto from 'crypto';
import config from '../config/index.js';
import logger from '../logger/logger.js';

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
 * Upload a buffer to Cloudinary using base64 data URI.
 * More reliable than upload_stream in serverless environments.
 */
export const uploadBufferSafe = async (
  buffer: Buffer,
  folder: string = 'rawafid-omran',
  options: ImageOptimizationOptions = {}
): Promise<CloudinaryUploadResult> => {
  const mergedOptions = { ...defaultOptimization, ...options };

  if (
    !config.cloudinary.cloudName ||
    !config.cloudinary.apiKey ||
    !config.cloudinary.apiSecret
  ) {
    const error = new Error('Cloudinary is not properly configured');
    (error as any).code = 'CLOUDINARY_CONFIG_MISSING';
    throw error;
  }

  logger.info('Starting safe buffer upload (base64) to Cloudinary', {
    bufferSize: buffer.length,
    folder,
    cloudName: config.cloudinary.cloudName,
  });

  const dataUri = `data:image/png;base64,${buffer.toString('base64')}`;

  const transformations: Record<string, unknown>[] = [
    { quality: mergedOptions.quality },
    { fetch_format: 'auto' },
  ];
  if (mergedOptions.width) transformations.push({ width: mergedOptions.width });
  if (mergedOptions.height) transformations.push({ height: mergedOptions.height });
  if (mergedOptions.crop) transformations.push({ crop: mergedOptions.crop });

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      resource_type: 'image',
      transformation: transformations,
    });

    logger.info('Safe buffer upload successful', {
      publicId: result.public_id,
      secureUrl: result.secure_url,
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      created_at: result.created_at,
    };
  } catch (error: any) {
    logger.error('Safe buffer upload failed', {
      errorMessage: error?.message,
      errorName: error?.name,
      httpCode: error?.http_code,
    });

    const uploadError = new Error(error?.message || 'Cloudinary upload failed');
    Object.defineProperties(uploadError, {
      statusCode: { value: error?.http_code, enumerable: true },
      cloudinaryError: { value: error?.name, enumerable: true },
    });

    throw uploadError;
  }
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
 * Upload a buffer WITHOUT any transformations (for diagnosis)
 */
export const uploadBufferMinimal = async (
  buffer: Buffer,
  folder: string = 'rawafid-omran'
): Promise<CloudinaryUploadResult> => {
  // Validate Cloudinary configuration
  if (
    !config.cloudinary.cloudName ||
    !config.cloudinary.apiKey ||
    !config.cloudinary.apiSecret
  ) {
    const error = new Error('Cloudinary is not properly configured');
    (error as any).code = 'CLOUDINARY_CONFIG_MISSING';
    throw error;
  }

  logger.info('Starting MINIMAL buffer upload (no transformations)', {
    bufferSize: buffer.length,
    folder,
    cloudName: config.cloudinary.cloudName
  });

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image'
        // NO transformations, NO quality, NO fetch_format
      },
      (error, result) => {
        if (error) {
          // Comprehensive error logging for diagnosis
          logger.error('Cloudinary MINIMAL upload_stream error', {
            errorType: typeof error,
            errorMessage: error?.message,
            errorName: error?.name,
            httpCode: error?.http_code,
            errorStack: error?.stack,
            errorKeys: error ? Object.keys(error) : [],
            // Log all values safely
            errorValues: error ? Object.entries(error).map(([k, v]) => 
              k === 'api_key' || k === 'api_secret' ? [k, '[REDACTED]'] : [k, v]
            ) : []
          });

          const uploadError = new Error(error?.message || 'Cloudinary minimal upload failed');
          Object.defineProperties(uploadError, {
            statusCode: { value: error?.http_code, enumerable: true },
            cloudinaryError: { value: error?.name, enumerable: true },
            cloudinaryMessage: { value: error?.message, enumerable: true },
            cloudinaryHttpCode: { value: error?.http_code, enumerable: true }
          });

          reject(uploadError);
        } else if (result) {
          logger.info('MINIMAL buffer uploaded to Cloudinary', {
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
          logger.error('Cloudinary MINIMAL returned no result');
          const noResultError = new Error('Cloudinary minimal upload failed: no result returned');
          (noResultError as any).code = 'CLOUDINARY_NO_RESULT';
          reject(noResultError);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

/**
 * Upload buffer to ROOT folder (no folder specified) - diagnostic
 */
export const uploadBufferNoFolder = async (buffer: Buffer): Promise<CloudinaryUploadResult> => {
  if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
    const error = new Error('Cloudinary is not properly configured');
    (error as any).code = 'CLOUDINARY_CONFIG_MISSING';
    throw error;
  }

  logger.info('Starting upload to ROOT folder (no folder)', {
    bufferSize: buffer.length,
    cloudName: config.cloudinary.cloudName
  });

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image'
        // NO folder at all
      },
      (error, result) => {
        if (error) {
          logger.error('Cloudinary ROOT folder upload error', {
            errorMessage: error?.message,
            errorName: error?.name,
            httpCode: error?.http_code,
            errorKeys: error ? Object.keys(error) : [],
            errorValues: error ? Object.entries(error).map(([k, v]) => 
              k === 'api_key' || k === 'api_secret' ? [k, '[REDACTED]'] : [k, v]
            ) : []
          });

          const uploadError = new Error(error?.message || 'Cloudinary root folder upload failed');
          Object.defineProperties(uploadError, {
            statusCode: { value: error?.http_code, enumerable: true },
            cloudinaryError: { value: error?.name, enumerable: true },
            cloudinaryMessage: { value: error?.message, enumerable: true },
            cloudinaryHttpCode: { value: error?.http_code, enumerable: true }
          });

          reject(uploadError);
        } else if (result) {
          logger.info('ROOT folder upload successful', {
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
          const noResultError = new Error('Cloudinary root folder upload failed: no result');
          (noResultError as any).code = 'CLOUDINARY_NO_RESULT';
          reject(noResultError);
        }
      }
    );

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
 * RAW HTTP diagnostic — bypasses Cloudinary SDK entirely to capture the actual
 * 403 response body that the SDK silently discards.
 *
 * The SDK's upload error handler only preserves the body for status codes in
 * [200,400,401,404,420,500]. 403 is NOT in that list, so the body is lost and
 * we only see "Server returned unexpected status code - 403".
 *
 * This function sends a real upload request using Node.js built-in `https` and
 * `crypto` modules, signing the request exactly as the SDK does, then returns
 * the COMPLETE HTTP response for diagnosis.
 */
export const testRawUploadDiagnostic = async (): Promise<Record<string, unknown>> => {
  const { cloudName, apiKey, apiSecret } = config.cloudinary;

  if (!cloudName || !apiKey || !apiSecret) {
    return { error: 'Cloudinary not configured' };
  }

  // 1x1 red PNG as base64
  const minimalPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==';
  const fileBuffer = Buffer.from(minimalPngBase64, 'base64');

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'rawafid-omran/diag';

  // Build params to sign (alphabetical order is critical for signature)
  const paramsToSign: Record<string, string> = {
    timestamp: String(timestamp),
    folder,
  };

  // Sign: sort keys alphabetically, join as key=value&key=value, append api_secret, SHA1
  const signatureString = Object.keys(paramsToSign)
    .sort()
    .map(k => `${k}=${paramsToSign[k]}`)
    .join('&') + apiSecret;

  const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

  // Build multipart form-data manually
  const boundary = `----FormBoundary${Math.random().toString(36).slice(2)}`;

  const multipartParts: string[] = [];

  // api_key field
  multipartParts.push(`--${boundary}\r\nContent-Disposition: form-data; name="api_key"\r\n\r\n${apiKey}`);

  // timestamp field
  multipartParts.push(`--${boundary}\r\nContent-Disposition: form-data; name="timestamp"\r\n\r\n${timestamp}`);

  // folder field
  multipartParts.push(`--${boundary}\r\nContent-Disposition: form-data; name="folder"\r\n\r\n${folder}`);

  // signature field
  multipartParts.push(`--${boundary}\r\nContent-Disposition: form-data; name="signature"\r\n\r\n${signature}`);

  // file field (the actual image)
  multipartParts.push(
    `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="diag.png"\r\nContent-Type: image/png\r\n\r\n`
  );

  const bodyHead = Buffer.from(multipartParts.join('\r\n'), 'utf-8');
  const bodyTail = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');

  const body = Buffer.concat([bodyHead, fileBuffer, bodyTail]);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  logger.info('RAW diagnostic: sending direct HTTP request to Cloudinary upload API', {
    url,
    bodySize: body.length,
    boundaryLength: boundary.length,
    signatureLength: signature.length,
    apiKeyPrefix: apiKey.slice(0, 3),
    cloudName,
    timestamp,
  });

  return new Promise((resolve) => {
    const parsedUrl = new URL(url);

    const options: https.RequestOptions = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': String(body.length),
        'User-Agent': 'Rawafid-Omran-Diagnostic/1.0',
      },
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];

      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => {
        const rawBody = Buffer.concat(chunks).toString('utf-8');
        const statusCode = res.statusCode || 0;
        const headers = res.headers || {};

        // Try to parse as JSON
        let parsedBody: unknown = null;
        try {
          parsedBody = JSON.parse(rawBody);
        } catch {
          parsedBody = rawBody;
        }

        logger.info('RAW diagnostic response received', {
          statusCode,
          bodyPreview: typeof parsedBody === 'string' ? parsedBody.slice(0, 500) : parsedBody,
          contentLength: headers['content-length'],
          contentType: headers['content-type'],
        });

        resolve({
          success: statusCode >= 200 && statusCode < 300,
          statusCode,
          statusMessage: res.statusMessage || '',
          headers: {
            'content-type': headers['content-type'],
            'content-length': headers['content-length'],
            'x-request-id': headers['x-request-id'] || headers['x-cloudinary-request-id'] || null,
            'x-cloudinary-error-code': headers['x-cloudinary-error-code'] || null,
          },
          body: typeof parsedBody === 'object' ? parsedBody : { raw: rawBody.slice(0, 2000) },
          error: statusCode >= 400 ? `HTTP ${statusCode}: ${res.statusMessage || ''}` : null,
        });
      });
    });

    req.on('error', (err: Error) => {
      logger.error('RAW diagnostic: request failed', {
        errorMessage: err.message,
        errorName: err.name,
        errorStack: err.stack,
      });

      resolve({
        success: false,
        error: err.message,
        errorName: err.name,
        errorStack: err.stack,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Request timeout',
      });
    });

    req.setTimeout(30000);
    req.write(body);
    req.end();
  });
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
 * Test safe upload (base64 data URI approach) — THE primary diagnostic
 */
export const testSafeUpload = async (): Promise<{
  success: boolean;
  result?: CloudinaryUploadResult;
  error?: string;
  diagnostic?: Record<string, unknown>;
}> => {
  if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
    return {
      success: false,
      error: 'Cloudinary not configured',
      diagnostic: {
        hasCloudName: !!config.cloudinary.cloudName,
        hasApiKey: !!config.cloudinary.apiKey,
        hasApiSecret: !!config.cloudinary.apiSecret,
      },
    };
  }

  try {
    const minimalPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    logger.info('Testing safe (base64) upload', {
      bufferSize: minimalPng.length,
      cloudName: config.cloudinary.cloudName,
    });

    const result = await uploadBufferSafe(minimalPng, 'rawafid-omran/test-safe');

    logger.info('Safe upload test successful', {
      publicId: result.public_id,
      secureUrl: result.secure_url,
    });

    await deleteImage(result.public_id);

    return { success: true, result };
  } catch (error: any) {
    logger.error('Safe upload test failed', {
      errorMessage: error?.message,
      errorName: error?.name,
      statusCode: error?.statusCode,
    });

    return {
      success: false,
      error: error?.message || 'Safe upload test failed',
      diagnostic: {
        name: error?.name,
        message: error?.message,
        statusCode: error?.statusCode,
      },
    };
  }
};

/**
 * Test authenticated upload WITH transformations (upload_stream approach)
 */
export const testAuthenticatedUpload = async (): Promise<{
  success: boolean;
  result?: CloudinaryUploadResult;
  error?: string;
  diagnostic?: Record<string, unknown>;
}> => {
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
    const minimalPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    logger.info('Testing authenticated upload WITH transformations (upload_stream)', {
      bufferSize: minimalPng.length,
      cloudName: config.cloudinary.cloudName
    });

    const result = await uploadBuffer(minimalPng, 'rawafid-omran/test');
    
    logger.info('Test authenticated upload WITH transformations successful', {
      publicId: result.public_id,
      secureUrl: result.secure_url
    });

    await deleteImage(result.public_id);

    return { success: true, result };
  } catch (error: any) {
    logger.error('Test authenticated upload WITH transformations failed', {
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

/**
 * Test authenticated upload WITHOUT transformations (diagnostic, upload_stream)
 */
export const testAuthenticatedUploadMinimal = async (): Promise<{
  success: boolean;
  result?: CloudinaryUploadResult;
  error?: string;
  diagnostic?: Record<string, unknown>;
}> => {
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
    const minimalPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    logger.info('Testing authenticated upload WITHOUT transformations (upload_stream)', {
      bufferSize: minimalPng.length,
      cloudName: config.cloudinary.cloudName
    });

    const result = await uploadBufferMinimal(minimalPng, 'rawafid-omran/test-minimal');
    
    logger.info('Test authenticated upload WITHOUT transformations successful', {
      publicId: result.public_id,
      secureUrl: result.secure_url
    });

    await deleteImage(result.public_id);

    return { success: true, result };
  } catch (error: any) {
    logger.error('Test authenticated upload WITHOUT transformations failed', {
      errorMessage: error?.message,
      errorName: error?.name,
      statusCode: error?.statusCode,
      cloudinaryError: error?.cloudinaryError,
      cloudinaryHttpCode: error?.cloudinaryHttpCode
    });

    return {
      success: false,
      error: error?.message || 'Minimal upload test failed',
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

/**
 * Test upload to ROOT folder (no folder specified, upload_stream)
 */
export const testUploadNoFolder = async (): Promise<{
  success: boolean;
  result?: CloudinaryUploadResult;
  error?: string;
  diagnostic?: Record<string, unknown>;
}> => {
  if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
    return {
      success: false,
      error: 'Cloudinary not configured'
    };
  }

  try {
    const minimalPng = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    logger.info('Testing upload to ROOT folder (no folder, upload_stream)', {
      bufferSize: minimalPng.length,
      cloudName: config.cloudinary.cloudName
    });

    const result = await uploadBufferNoFolder(minimalPng);
    
    logger.info('ROOT folder upload successful', {
      publicId: result.public_id,
      secureUrl: result.secure_url
    });

    await deleteImage(result.public_id);

    return { success: true, result };
  } catch (error: any) {
    logger.error('ROOT folder upload failed', {
      errorMessage: error?.message,
      errorName: error?.name,
      statusCode: error?.statusCode,
      cloudinaryError: error?.cloudinaryError
    });

    return {
      success: false,
      error: error?.message || 'Root folder upload failed',
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
  uploadBufferSafe,
  uploadBufferMinimal,
  uploadBufferNoFolder,
  uploadGallery,
  deleteImage,
  deleteMultipleImages,
  replaceImage,
  getImageDetails,
  getOptimizedImageUrl,
  getThumbnailUrl,
  verifyCloudinaryConnection,
  testSafeUpload,
  testAuthenticatedUpload,
  testAuthenticatedUploadMinimal,
  testUploadNoFolder,
  testRawUploadDiagnostic
};
