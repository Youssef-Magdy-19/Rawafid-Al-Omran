import swaggerJsdoc from 'swagger-jsdoc';
import config from './index.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rawafid Al-Omran API',
      version: '1.0.0',
      description: 'Backend API for Rawafid Al-Omran website',
      contact: {
        name: 'API Support',
        email: 'support@rawafid-omran.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                message: { type: 'string' },
                details: { type: 'array', items: { type: 'object' } },
              },
            },
            statusCode: { type: 'number' },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'Health', description: 'Health check endpoints' },
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Blogs', description: 'Blog management endpoints' },
      { name: 'Services', description: 'Service management endpoints' },
      { name: 'Projects', description: 'Project management endpoints' },
      { name: 'Contact', description: 'Contact form endpoints' },
      { name: 'Team', description: 'Team member endpoints' },
      { name: 'Testimonials', description: 'Testimonial endpoints' },
      { name: 'Quotes', description: 'Quote request endpoints' },
      { name: 'Newsletter', description: 'Newsletter subscription endpoints' },
      { name: 'Dashboard', description: 'Dashboard statistics endpoints' },
    ],
  },
  apis: ['./src/routes/*.ts', './src/modules/**/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;