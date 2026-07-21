import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import config from './config/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';
import { logStream } from './logger/logger.js';
import morgan from 'morgan';
import { apiRateLimiter } from './middlewares/security.middleware.js';
import { sanitizeMiddleware } from './middlewares/sanitize.middleware.js';
import { requestIdMiddleware } from './middlewares/requestId.middleware.js';
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
import faqRoutes from './modules/faq/routes/faq.routes.js';
import partnerRoutes from './modules/partner/routes/partner.routes.js';
import uploadRoutes from './routes/upload.routes.js';

// Create Express application
const app = express();

// Configure middlewares
app.use(requestIdMiddleware);
app.use(helmet());
app.use(cors({
  origin: config.cors.origins,
  credentials: true
}));
app.use(apiRateLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :req[x-request-id]', { stream: logStream }));
app.use(sanitizeMiddleware);

// Configure routes
app.use('/api-docs', swaggerRoutes);
app.use('/', healthRoutes);

const apiPrefix = `/api/${config.apiVersion}`;
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/users`, userRoutes);
app.use(`${apiPrefix}/blogs`, blogRoutes);
app.use(`${apiPrefix}/services`, serviceRoutes);
app.use(`${apiPrefix}/projects`, projectRoutes);
app.use(`${apiPrefix}/contacts`, contactRoutes);
app.use(`${apiPrefix}/team`, teamRoutes);
app.use(`${apiPrefix}/testimonials`, testimonialRoutes);
app.use(`${apiPrefix}/quotes`, quoteRoutes);
app.use(`${apiPrefix}/newsletter`, newsletterRoutes);
app.use(`${apiPrefix}/dashboard`, dashboardRoutes);
app.use(`${apiPrefix}/faqs`, faqRoutes);
app.use(`${apiPrefix}/partners`, partnerRoutes);
app.use(`${apiPrefix}/upload`, uploadRoutes);

// Configure error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;