import { Request, Response } from 'express';
import mongoose from 'mongoose';
import config from '../../config/index.js';

/**
 * Health check response interface
 */
interface HealthResponse {
  status: 'ok' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  service: string;
  version: string;
  environment: string;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
}

/**
 * Readiness check response interface
 */
interface ReadinessResponse {
  status: 'ready' | 'not_ready';
  timestamp: string;
  checks: {
    database: boolean;
    memory: boolean;
    timestamp: string;
  };
  details: {
    databaseState: string;
    memoryUsage: number;
  };
}

/**
 * Liveness check response interface
 */
interface LivenessResponse {
  status: 'alive';
  timestamp: string;
  pid: number;
}

/**
 * Get memory usage statistics
 */
const getMemoryUsage = (): { used: number; total: number; percentage: number } => {
  const used = process.memoryUsage();
  const total = used.heapTotal;
  const percentage = Math.round((used.heapUsed / total) * 100);
  
  return {
    used: Math.round(used.heapUsed / 1024 / 1024), // MB
    total: Math.round(total / 1024 / 1024), // MB
    percentage
  };
};

/**
 * Get database connection state description
 */
const getDatabaseState = (): string => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return states[mongoose.connection.readyState] || 'unknown';
};

/**
 * GET /health
 * Basic health check - returns service status with memory info
 */
export const healthCheck = (_req: Request, res: Response): void => {
  const memory = getMemoryUsage();
  
  // Determine status based on memory usage
  let status: 'ok' | 'degraded' | 'unhealthy' = 'ok';
  if (memory.percentage > 90) {
    status = 'unhealthy';
  } else if (memory.percentage > 75) {
    status = 'degraded';
  }

  const response: HealthResponse = {
    status,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'rawafid-omran-api',
    version: '1.0.0',
    environment: config.env,
    memory
  };

  res.json(response);
};

/**
 * GET /ready
 * Readiness check - returns service readiness including database connection
 */
export const readinessCheck = async (_req: Request, res: Response): Promise<void> => {
  const memory = getMemoryUsage();
  const databaseConnected = mongoose.connection.readyState === 1;
  const memoryOk = memory.percentage < 90;

  const checks = {
    database: databaseConnected,
    memory: memoryOk,
    timestamp: new Date().toISOString()
  };

  const isReady = checks.database && checks.memory;
  const status = isReady ? 'ready' : 'not_ready';

  const response: ReadinessResponse = {
    status,
    timestamp: new Date().toISOString(),
    checks,
    details: {
      databaseState: getDatabaseState(),
      memoryUsage: memory.percentage
    }
  };

  res.status(isReady ? 200 : 503).json(response);
};

/**
 * GET /live
 * Liveness check - simple check to verify the process is running
 */
export const livenessCheck = (_req: Request, res: Response): void => {
  const response: LivenessResponse = {
    status: 'alive',
    timestamp: new Date().toISOString(),
    pid: process.pid
  };

  res.json(response);
};

export default {
  healthCheck,
  readinessCheck,
  livenessCheck
};