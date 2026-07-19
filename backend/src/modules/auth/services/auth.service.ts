import crypto from 'crypto';
import { userRepository } from '../repositories/user.repository.js';
import { 
  generateTokens, 
  verifyToken, 
  TokenPair, 
  TokenPayload 
} from '../../../services/auth.service.js';
import { 
  UnauthorizedError, 
  BadRequestError, 
  NotFoundError 
} from '../../../errors/AppError.js';
import logger from '../../../logger/logger.js';
import type {
  RegisterDto,
  LoginDto,
  AuthResponseDto,
  CurrentUserResponseDto
} from '../dtos/auth.dto.js';

export class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterDto): Promise<AuthResponseDto> {
    logger.info('Registering new user', { email: data.email });

    // Create user
    const user = await userRepository.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    });

    // Generate tokens
    const tokenPayload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const tokens = generateTokens(tokenPayload);

    // Store refresh token
    await userRepository.updateRefreshToken(user._id.toString(), tokens.refreshToken);

    logger.info('User registered successfully', { userId: user._id });

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
  }

  /**
   * Login user
   */
  async login(data: LoginDto): Promise<AuthResponseDto> {
    logger.info('User login attempt', { email: data.email });

    // Find user with password
    const user = await userRepository.findByEmail(data.email, { selectPassword: true });

    if (!user) {
      logger.warn('Login failed - user not found', { email: data.email });
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      logger.warn('Login failed - user inactive', { email: data.email });
      throw new UnauthorizedError('Account is inactive');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(data.password);

    if (!isPasswordValid) {
      logger.warn('Login failed - invalid password', { email: data.email });
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate tokens
    const tokenPayload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const tokens = generateTokens(tokenPayload);

    // Store refresh token and update last login
    await Promise.all([
      userRepository.updateRefreshToken(user._id.toString(), tokens.refreshToken),
      userRepository.updateLastLogin(user._id.toString())
    ]);

    logger.info('User logged in successfully', { userId: user._id });

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
  }

  /**
   * Logout user
   */
  async logout(userId: string): Promise<void> {
    logger.info('User logout', { userId });

    // Clear refresh token
    await userRepository.updateRefreshToken(userId, null);

    logger.info('User logged out successfully', { userId });
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<TokenPair> {
    logger.info('Refreshing access token');

    // Verify refresh token
    let payload: TokenPayload;
    try {
      payload = verifyToken(refreshToken);
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    // Find user
    const user = await userRepository.findById(payload.id, { selectPassword: true });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Account is inactive');
    }

    // Verify stored refresh token matches
    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Generate new tokens
    const tokenPayload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const tokens = generateTokens(tokenPayload);

    // Update stored refresh token
    await userRepository.updateRefreshToken(user._id.toString(), tokens.refreshToken);

    logger.info('Token refreshed successfully', { userId: user._id });

    return tokens;
  }

  /**
   * Forgot password - generate reset token
   */
  async forgotPassword(email: string): Promise<void> {
    logger.info('Processing forgot password request', { email });

    // Find user (don't reveal if email exists)
    const user = await userRepository.findByEmail(email);

    if (!user) {
      // Don't reveal that email doesn't exist
      logger.info('Forgot password - email not found (silently ignored)', { email });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await userRepository.setPasswordResetToken(user._id.toString(), resetToken, resetExpires);

    // TODO: Send email with reset link
    logger.info('Password reset token generated', { userId: user._id, email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    logger.info('Processing password reset');

    // Find user by token
    const user = await userRepository.findByPasswordResetToken(token);

    if (!user) {
      throw new BadRequestError('Invalid or expired reset token');
    }

    // Update password
    await userRepository.resetPassword(user._id.toString(), newPassword);

    // Invalidate all refresh tokens by clearing stored one
    await userRepository.updateRefreshToken(user._id.toString(), null);

    logger.info('Password reset successfully', { userId: user._id });
  }

  /**
   * Change password (authenticated)
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    logger.info('Processing change password', { userId });

    // Find user with password
    const user = await userRepository.findById(userId, { selectPassword: true });

    if (!user) {
      throw new NotFoundError('User', userId);
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    // Update password (triggers pre-save hook for hashing)
    await userRepository.resetPassword(userId, newPassword);

    // Invalidate all refresh tokens
    await userRepository.updateRefreshToken(userId, null);

    logger.info('Password changed successfully', { userId });
  }

  /**
   * Get current user
   */
  async getCurrentUser(userId: string): Promise<CurrentUserResponseDto> {
    const user = await userRepository.findByIdOrFail(userId);

    return {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<void> {
    logger.info('Verifying email');

    // Find user by token
    const user = await userRepository.findByEmailVerificationToken(token);

    if (!user) {
      throw new BadRequestError('Invalid or expired verification token');
    }

    // Verify email
    await userRepository.verifyEmail(user._id.toString());

    logger.info('Email verified successfully', { userId: user._id });
  }
}

export const authService = new AuthService();