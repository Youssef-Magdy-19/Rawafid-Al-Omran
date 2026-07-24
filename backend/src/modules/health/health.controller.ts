import { Request, Response } from 'express';
import mongoose from 'mongoose';
import config from '../../config/index.js';
import { verifyCloudinaryConnection, testSafeUpload, testAuthenticatedUpload, testAuthenticatedUploadMinimal, testUploadNoFolder } from '../../services/fileUpload.service.js';

/**
 * Health response
 */
interface HealthResponse {
  status: 'ok' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  service: string;
  version: string;
  environment: string;
  database: {
    connected: boolean;
    state: string;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
}

/**
 * Readiness response
 */
interface ReadinessResponse {
  status: 'ready' | 'not_ready';
  timestamp: string;
  checks: {
    database: boolean;
    timestamp: string;
  };
}

/**
 * Liveness response
 */
interface LivenessResponse {
  status: 'alive';
  timestamp: string;
  pid: number;
}

/**
 * Cloudinary diagnostic response
 */
interface CloudinaryDiagnosticResponse {
  status: 'success' | 'failed';
  timestamp: string;
  cloudinary: {
    configured: boolean;
    cloudName: string;
    hasApiKey: boolean;
    hasApiSecret: boolean;
  };
  ping?: {
    success: boolean;
    status?: string;
    error?: string;
    diagnostic?: Record<string, unknown>;
  };
  uploadWithTransforms?: {
    success: boolean;
    publicId?: string;
    secureUrl?: string;
    error?: string;
    diagnostic?: Record<string, unknown>;
  };
  uploadMinimal?: {
    success: boolean;
    publicId?: string;
    secureUrl?: string;
    error?: string;
    diagnostic?: Record<string, unknown>;
  };
  uploadNoFolder?: {
    success: boolean;
    publicId?: string;
    secureUrl?: string;
    error?: string;
    diagnostic?: Record<string, unknown>;
  };
  uploadSafe?: {
    success: boolean;
    publicId?: string;
    secureUrl?: string;
    error?: string;
    diagnostic?: Record<string, unknown>;
  };
}

const getMemoryUsage = () => {
  const usage = process.memoryUsage();

  return {
    used: Math.round(usage.heapUsed / 1024 / 1024),
    total: Math.round(usage.heapTotal / 1024 / 1024),
    percentage: Math.round((usage.heapUsed / usage.heapTotal) * 100)
  };
};

const getDatabaseState = (): string => {
  switch (mongoose.connection.readyState) {
    case 0:
      return 'disconnected';
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    case 3:
      return 'disconnecting';
    default:
      return 'unknown';
  }
};

/**
 * GET /health
 */
export const healthCheck = (_req: Request, res: Response): void => {
  const memory = getMemoryUsage();
  const dbConnected = mongoose.connection.readyState === 1;

  let status: 'ok' | 'degraded' | 'unhealthy';

  if (dbConnected) {
    status = 'ok';
  } else if (mongoose.connection.readyState === 2) {
    status = 'degraded';
  } else {
    status = 'unhealthy';
  }

  const response: HealthResponse = {
    status,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'rawafid-omran-api',
    version: '1.0.0',
    environment: config.env,
    database: {
      connected: dbConnected,
      state: getDatabaseState()
    },
    memory
  };

  res.status(status === 'unhealthy' ? 503 : 200).json(response);
};

/**
 * GET /ready
 */
export const readinessCheck = (_req: Request, res: Response): void => {
  const dbConnected = mongoose.connection.readyState === 1;

  const response: ReadinessResponse = {
    status: dbConnected ? 'ready' : 'not_ready',
    timestamp: new Date().toISOString(),
    checks: {
      database: dbConnected,
      timestamp: new Date().toISOString()
    }
  };

  res.status(dbConnected ? 200 : 503).json(response);
};

/**
 * GET /live
 */
export const livenessCheck = (_req: Request, res: Response): void => {
  const response: LivenessResponse = {
    status: 'alive',
    timestamp: new Date().toISOString(),
    pid: process.pid
  };

  res.status(200).json(response);
};

/**
 * GET /cloudinary-diagnostic
 * Tests Cloudinary connection and authenticated upload
 * Tests BOTH with and without transformations to isolate the issue
 */
export const cloudinaryDiagnostic = async (_req: Request, res: Response): Promise<void> => {
  const response: CloudinaryDiagnosticResponse = {
    status: 'failed',
    timestamp: new Date().toISOString(),
    cloudinary: {
      configured: !!(config.cloudinary.cloudName && config.cloudinary.apiKey && config.cloudinary.apiSecret),
      cloudName: config.cloudinary.cloudName || 'NOT SET',
      hasApiKey: !!config.cloudinary.apiKey,
      hasApiSecret: !!config.cloudinary.apiSecret
    }
  };

  // Test 1: Ping Cloudinary API
  const pingResult = await verifyCloudinaryConnection();
  response.ping = {
    success: pingResult.success,
    status: pingResult.status,
    error: pingResult.error,
    diagnostic: pingResult.diagnostic
  };

  // Test 2: Test authenticated upload WITH transformations (current production behavior)
  const uploadWithTransformsResult = await testAuthenticatedUpload();
  response.uploadWithTransforms = {
    success: uploadWithTransformsResult.success,
    publicId: uploadWithTransformsResult.result?.public_id,
    secureUrl: uploadWithTransformsResult.result?.secure_url,
    error: uploadWithTransformsResult.error,
    diagnostic: uploadWithTransformsResult.diagnostic
  };

  // Test 3: Test authenticated upload WITHOUT transformations (diagnostic)
  const uploadMinimalResult = await testAuthenticatedUploadMinimal();
  response.uploadMinimal = {
    success: uploadMinimalResult.success,
    publicId: uploadMinimalResult.result?.public_id,
    secureUrl: uploadMinimalResult.result?.secure_url,
    error: uploadMinimalResult.error,
    diagnostic: uploadMinimalResult.diagnostic
  };

  // Test 4: Test safe upload (base64 data URI approach — most reliable for serverless)
  const safeUploadResult = await testSafeUpload();
  response.uploadSafe = {
    success: safeUploadResult.success,
    publicId: safeUploadResult.result?.public_id,
    secureUrl: safeUploadResult.result?.secure_url,
    error: safeUploadResult.error,
    diagnostic: safeUploadResult.diagnostic,
  };

  // Test 5: Test upload to ROOT folder (no folder specified)
  const uploadNoFolderResult = await testUploadNoFolder();
  response.uploadNoFolder = {
    success: uploadNoFolderResult.success,
    publicId: uploadNoFolderResult.result?.public_id,
    secureUrl: uploadNoFolderResult.result?.secure_url,
    error: uploadNoFolderResult.error,
    diagnostic: uploadNoFolderResult.diagnostic
  };

  // Overall status: all tests must pass
  response.status = (pingResult.success && safeUploadResult.success)
    ? 'success'
    : 'failed';

  res.status(response.status === 'success' ? 200 : 503).json(response);
};

export default {
  healthCheck,
  readinessCheck,
  livenessCheck,
  cloudinaryDiagnostic
};