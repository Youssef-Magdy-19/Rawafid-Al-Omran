import { Router } from 'express';
import authRoutes from '../modules/auth/routes/auth.routes.js';

const router = Router();

// Mount auth module routes
router.use('/', authRoutes);

export default router;