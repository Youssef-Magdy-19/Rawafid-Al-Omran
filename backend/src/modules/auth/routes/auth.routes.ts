import { Router } from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  getCurrentUser,
  verifyEmail
} from '../controllers/auth.controller.js';
import { authenticate } from '../../../middlewares/auth.middleware.js';
import { validateBody } from '../validators/auth.validator.js';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  refreshTokenSchema,
  verifyEmailSchema
} from '../schemas/auth.schema.js';
import { authRateLimiter, loginRateLimiter } from '../../../middlewares/security.middleware.js';

const router = Router();

// Public routes with rate limiting
router.post('/register', authRateLimiter, validateBody(registerSchema), register);
router.post('/login', loginRateLimiter, validateBody(loginSchema), login);
router.post('/forgot-password', authRateLimiter, validateBody(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', authRateLimiter, validateBody(resetPasswordSchema), resetPassword);
router.post('/refresh', authRateLimiter, validateBody(refreshTokenSchema), refreshToken);
router.post('/verify-email', authRateLimiter, validateBody(verifyEmailSchema), verifyEmail);

// Protected routes
router.post('/logout', authenticate, logout);
router.post('/change-password', authenticate, validateBody(changePasswordSchema), changePassword);
router.get('/me', authenticate, getCurrentUser);

export default router;
