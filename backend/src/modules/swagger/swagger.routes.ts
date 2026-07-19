import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../config/swagger.js';

const router = Router();

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: API Documentation
 *     description: Swagger UI for API documentation
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Swagger UI page
 */
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { font-size: 2.5em; }
  `,
  customSiteTitle: 'Rawafid Al-Omran API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  },
}));

export default router;