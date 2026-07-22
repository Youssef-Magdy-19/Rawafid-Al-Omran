import { Router } from 'express';
import { healthCheck, readinessCheck, livenessCheck, cloudinaryDiagnostic } from './health.controller.js';

const router = Router();

// Health check routes
router.get('/health', healthCheck);
router.get('/ready', readinessCheck);
router.get('/live', livenessCheck);
router.get('/cloudinary-diagnostic', cloudinaryDiagnostic);

export default router;