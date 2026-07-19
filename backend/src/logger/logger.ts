import winston from 'winston';
import config from '../config/index.js';

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  
  if (Object.keys(metadata).length > 0) {
    log += ` ${JSON.stringify(metadata)}`;
  }
  
  if (stack) {
    log += `\n${stack}`;
  }
  
  return log;
});

// Create transports array
const transports: winston.transport[] = [
  // Console transport
  new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
  }),
];

// Add file transport in production
if (config.env === 'production') {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(
        timestamp(),
        errors({ stack: true }),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: combine(
        timestamp(),
        winston.format.json()
      ),
    })
  );
}

// Create logger instance
const logger = winston.createLogger({
  level: config.log.level,
  defaultMeta: { service: 'rawafid-omran-api' },
  transports,
  exitOnError: false,
});

// Create a stream object for Morgan HTTP logging
export const logStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

export default logger;