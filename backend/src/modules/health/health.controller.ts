import { Request, Response } from 'express';
import mongoose from 'mongoose';
import config from '../../config/index.js';

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

export default {
  healthCheck,
  readinessCheck,
  livenessCheck
};