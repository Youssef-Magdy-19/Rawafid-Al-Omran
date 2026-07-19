import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import config from './config/index.js';
import logger from './logger/logger.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';
import { logStream } from './logger/logger.js';
import morgan from 'morgan';
import { apiRateLimiter } from './middlewares/security.middleware.js';
import { sanitizeMiddleware } from './middlewares/sanitize.middleware.js';
import { requestIdMiddleware } from './middlewares/requestId.middleware.js';
import { validateEnv } from './config/env.validation.js';
import healthRoutes from './modules/health/health.routes.js';
import swaggerRoutes from './modules/swagger/swagger.routes.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import blogRoutes from './routes/blog.routes.js';
import serviceRoutes from './routes/service.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';
import teamRoutes from './routes/team.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import quoteRoutes from './routes/quote.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js';
import dashboardRoutes from './modules/dashboard/routes/dashboard.routes.js';

class App {
  public app: Application;
  private server: ReturnType<typeof this.app.listen> | null = null;

  constructor() {
    this.app = express();
    this.validateEnvironment();
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private validateEnvironment(): void {
    try {
      validateEnv();
      logger.info('Environment validation completed');
    } catch (error) {
      logger.error('Environment validation failed:', error);
      process.exit(1);
    }
  }

  private configureMiddlewares(): void {
    // Request ID (must be first)
    this.app.use(requestIdMiddleware);

    // Security headers
    this.app.use(helmet());

    // CORS
    this.app.use(cors({
      origin: config.cors.origins,
      credentials: true
    }));

    // Rate limiting for API
    this.app.use(apiRateLimiter);

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Compression
    this.app.use(compression());

    // Request logging with request ID
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :req[x-request-id]', { stream: logStream }));

    // Sanitization (XSS, NoSQL injection)
    this.app.use(sanitizeMiddleware);
  }

  private configureRoutes(): void {
    // Swagger documentation (no prefix)
    this.app.use('/api-docs', swaggerRoutes);

    // Health check routes (no prefix)
    this.app.use('/', healthRoutes);

    // API routes
    const apiPrefix = `/api/${config.apiVersion}`;
    
    this.app.use(`${apiPrefix}/auth`, authRoutes);
    this.app.use(`${apiPrefix}/users`, userRoutes);
    this.app.use(`${apiPrefix}/blogs`, blogRoutes);
    this.app.use(`${apiPrefix}/services`, serviceRoutes);
    this.app.use(`${apiPrefix}/projects`, projectRoutes);
    this.app.use(`${apiPrefix}/contacts`, contactRoutes);
    this.app.use(`${apiPrefix}/team`, teamRoutes);
    this.app.use(`${apiPrefix}/testimonials`, testimonialRoutes);
    this.app.use(`${apiPrefix}/quotes`, quoteRoutes);
    this.app.use(`${apiPrefix}/newsletter`, newsletterRoutes);
    this.app.use(`${apiPrefix}/dashboard`, dashboardRoutes);
  }

  private configureErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  public async connectToDatabase(): Promise<void> {
    try {
      await connectDatabase();
    } catch (error) {
      logger.error('Failed to connect to database:', error);
      process.exit(1);
    }
  }

  public async disconnectFromDatabase(): Promise<void> {
    try {
      await disconnectDatabase();
    } catch (error) {
      logger.error('Failed to disconnect from database:', error);
    }
  }

  public async start(): Promise<void> {
    
    this.server = this.app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
      logger.info(`Environment: ${config.env}`);
      logger.info(`API Version: ${config.apiVersion}`);
      logger.info(`Node version: ${process.version}`);
    });

    // Setup graceful shutdown
    this.setupGracefulShutdown();
  }

  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);
      
      if (this.server) {
        this.server.close(async () => {
          logger.info('HTTP server closed');
          await this.disconnectFromDatabase();
          logger.info('Graceful shutdown completed');
          process.exit(0);
        });

        // Force shutdown after 30 seconds
        setTimeout(() => {
          logger.error('Forced shutdown after timeout');
          process.exit(1);
        }, 30000);
      } else {
        await this.disconnectFromDatabase();
        process.exit(0);
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  }

  public listen(): void {
    this.start().catch((error) => {
      logger.error('Failed to start server:', error);
      process.exit(1);
    });
  }
}

export default App;