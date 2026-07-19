import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service.js';
import { AuthenticatedRequest } from '../../../types/index.js';
import {
  sendSuccess,
  sendCreated,
  sendUpdated,
  sendDeleted,
  ResponseMessages
} from '../../../utils/apiResponse.js';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await authService.register(req.body);

    sendCreated(res, result, ResponseMessages.REGISTER_SUCCESS);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await authService.login(req.body);

    sendSuccess(res, result, ResponseMessages.LOGIN_SUCCESS);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await authService.logout(req.user!.id);

    sendDeleted(res, ResponseMessages.LOGOUT_SUCCESS);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);

    sendSuccess(res, tokens, 'Token refreshed successfully.');
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);

    // Always return success to prevent email enumeration
    sendSuccess(res, null, 'If an account exists with this email, a password reset link has been sent.');
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);

    sendUpdated(res, null, 'Password reset successful.');
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user!.id, currentPassword, newPassword);

    sendUpdated(res, null, 'Password changed successfully.');
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await authService.getCurrentUser(req.user!.id);

    sendSuccess(res, user, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.body;
    await authService.verifyEmail(token);

    sendUpdated(res, null, 'Email verified successfully.');
  } catch (error) {
    next(error);
  }
};