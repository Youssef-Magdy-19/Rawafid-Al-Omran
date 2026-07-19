import App from './app.js';
import { runStartupValidation } from './services/startupValidation.service.js';
import logger from './logger/logger.js';

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error | unknown, promise: Promise<unknown>) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
  // Don't exit in production - let the process handle it gracefully
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
  process.exit(1);
});

const app = new App();

// Run startup validation before starting the server
const startServer = async () => {
  try {
    // Run startup validations (non-blocking, just logs warnings)
    await app.connectToDatabase();

    const validationReport = await runStartupValidation();

    if (validationReport.overall === 'not_ready') {
      logger.error('Startup validation failed.');
      console.table(validationReport.validations);
      process.exit(1);
    }

    app.listen();
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();