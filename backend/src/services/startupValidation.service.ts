import mongoose from 'mongoose';
import config from '../config/index.js';
import logger from '../logger/logger.js';
import { verifyCloudinaryConnection } from './fileUpload.service.js';

export interface ValidationResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: string;
}

export interface StartupValidationReport {
  timestamp: string;
  environment: string;
  overall: 'ready' | 'degraded' | 'not_ready';
  validations: ValidationResult[];
}

/**
 * Validate MongoDB connection
 */
const validateDatabase = async (): Promise<ValidationResult> => {
  try {
    const state = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const stateName = states[state] || 'unknown';

    if (state === 1) {
      // Try a simple ping
      await mongoose.connection.db?.admin().ping();
      return {
        name: 'Database',
        status: 'pass',
        message: 'MongoDB connection is healthy',
        details: `State: ${stateName}`
      };
    } else {
      return {
        name: 'Database',
        status: 'fail',
        message: `MongoDB is not connected`,
        details: `State: ${stateName}`
      };
    }
  } catch (error) {
    return {
      name: 'Database',
      status: 'fail',
      message: 'MongoDB connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validate Cloudinary configuration
 */
const validateCloudinary = async (): Promise<ValidationResult> => {
  try {
    if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
      return {
        name: 'Cloudinary',
        status: 'warning',
        message: 'Cloudinary credentials not fully configured',
        details: 'Some credentials may be missing in environment variables'
      };
    }

    const isConnected = await verifyCloudinaryConnection();
    
    if (isConnected) {
      return {
        name: 'Cloudinary',
        status: 'pass',
        message: 'Cloudinary connection is healthy',
        details: `Cloud: ${config.cloudinary.cloudName}`
      };
    } else {
      return {
        name: 'Cloudinary',
        status: 'fail',
        message: 'Cloudinary connection failed',
        details: 'Unable to ping Cloudinary API'
      };
    }
  } catch (error) {
    return {
      name: 'Cloudinary',
      status: 'fail',
      message: 'Cloudinary validation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validate SMTP configuration
 */
const validateSMTP = (): ValidationResult => {
  try {
    const { host, port, user, pass, from } = config.smtp;
    const missing: string[] = [];

    if (!host) missing.push('host');
    if (!user) missing.push('user');
    if (!pass) missing.push('pass');
    if (!from) missing.push('from');

    if (missing.length > 0) {
      return {
        name: 'SMTP',
        status: 'warning',
        message: 'SMTP configuration incomplete',
        details: `Missing: ${missing.join(', ')}`
      };
    }

    return {
      name: 'SMTP',
      status: 'pass',
      message: 'SMTP configuration is valid',
      details: `Host: ${host}:${port}`
    };
  } catch (error) {
    return {
      name: 'SMTP',
      status: 'fail',
      message: 'SMTP validation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validate JWT configuration
 */
const validateJWT = (): ValidationResult => {
  try {
    if (!config.jwt.secret || config.jwt.secret === 'default-secret-change-me') {
      return {
        name: 'JWT',
        status: 'warning',
        message: 'JWT secret is using default value',
        details: 'Consider changing JWT_SECRET in production'
      };
    }

    if (config.jwt.secret.length < 32) {
      return {
        name: 'JWT',
        status: 'warning',
        message: 'JWT secret may be too short',
        details: 'Consider using a longer secret (32+ characters)'
      };
    }

    return {
      name: 'JWT',
      status: 'pass',
      message: 'JWT configuration is valid',
      details: `Expires in: ${config.jwt.expiresIn}`
    };
  } catch (error) {
    return {
      name: 'JWT',
      status: 'fail',
      message: 'JWT validation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validate environment
 */
const validateEnvironment = (): ValidationResult => {
  const env = config.env;
  
  if (env === 'production') {
    return {
      name: 'Environment',
      status: 'pass',
      message: 'Running in production mode',
      details: `Environment: ${env}`
    };
  } else if (env === 'development') {
    return {
      name: 'Environment',
      status: 'warning',
      message: 'Running in development mode',
      details: 'Some features may be limited'
    };
  } else {
    return {
      name: 'Environment',
      status: 'warning',
      message: `Running in ${env} mode`,
      details: 'Check NODE_ENV configuration'
    };
  }
};

/**
 * Run all startup validations
 */
export const runStartupValidation = async (): Promise<StartupValidationReport> => {
  logger.info('Running startup validations...');

  const validations: ValidationResult[] = [];

  // Run synchronous validations
  validations.push(validateEnvironment());
  validations.push(validateSMTP());
  validations.push(validateJWT());

  // Run async validations
  validations.push(await validateDatabase());
  validations.push(await validateCloudinary());

  // Determine overall status
  const hasFailures = validations.some(v => v.status === 'fail');
  const hasWarnings = validations.some(v => v.status === 'warning');
  
  let overall: 'ready' | 'degraded' | 'not_ready' = 'ready';
  if (hasFailures) {
    overall = 'not_ready';
  } else if (hasWarnings) {
    overall = 'degraded';
  }

  const report: StartupValidationReport = {
    timestamp: new Date().toISOString(),
    environment: config.env,
    overall,
    validations
  };

  // Log results
  logger.info('Startup validation complete', {
    overall,
    passed: validations.filter(v => v.status === 'pass').length,
    warnings: validations.filter(v => v.status === 'warning').length,
    failed: validations.filter(v => v.status === 'fail').length
  });

  return report;
};

/**
 * Validate and throw if critical failures
 */
export const validateOrThrow = async (): Promise<void> => {
  const report = await runStartupValidation();
  
  if (report.overall === 'not_ready') {
    const failures = report.validations
      .filter(v => v.status === 'fail')
      .map(v => `- ${v.name}: ${v.message}`)
      .join('\n');
    
    throw new Error(`Startup validation failed:\n${failures}`);
  }
};

export default {
  runStartupValidation,
  validateOrThrow
};