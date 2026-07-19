import { User, IUserDocument } from '../models/user.model.js';
import { NotFoundError, ConflictError } from '../../../errors/AppError.js';
import mongoose from 'mongoose';

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'admin' | 'editor' | 'user' | 'guest';
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  role?: 'admin' | 'editor' | 'user' | 'guest';
  isActive?: boolean;
}

export interface FindUserOptions {
  selectPassword?: boolean;
  includeDeleted?: boolean;
}

export class UserRepository {
  /**
   * Create a new user
   */
  async create(data: CreateUserData): Promise<IUserDocument> {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const user = new User(data);
    await user.save();
    return user;
  }

  /**
   * Find user by ID
   */
  async findById(
    id: string,
    options: FindUserOptions = {}
  ): Promise<IUserDocument | null> {
    const query = User.findById(id);

    if (options.selectPassword) {
      query.select('+password');
    }

    if (!options.includeDeleted) {
      query.where({ isDeleted: false });
    }

    return query.exec();
  }

  /**
   * Find user by email
   */
  async findByEmail(
    email: string,
    options: FindUserOptions = {}
  ): Promise<IUserDocument | null> {
    const query = User.findOne({ email: email.toLowerCase() });

    if (options.selectPassword) {
      query.select('+password');
    }

    if (!options.includeDeleted) {
      query.where({ isDeleted: false });
    }

    return query.exec();
  }

  /**
   * Find user by email or throw error
   */
  async findByEmailOrFail(
    email: string,
    options: FindUserOptions = {}
  ): Promise<IUserDocument> {
    const user = await this.findByEmail(email, options);
    if (!user) {
      throw new NotFoundError('User', email);
    }
    return user;
  }

  /**
   * Find user by ID or throw error
   */
  async findByIdOrFail(id: string, options: FindUserOptions = {}): Promise<IUserDocument> {
    const user = await this.findById(id, options);
    if (!user) {
      throw new NotFoundError('User', id);
    }
    return user;
  }

  /**
   * Update user by ID
   */
  async updateById(id: string, data: UpdateUserData): Promise<IUserDocument> {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError('User', id);
    }

    return user;
  }

  /**
   * Update user email verification status
   */
  async verifyEmail(userId: string): Promise<IUserDocument> {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { isEmailVerified: true },
        $unset: { emailVerificationToken: 1, emailVerificationExpires: 1 }
      },
      { new: true }
    );

    if (!user) {
      throw new NotFoundError('User', userId);
    }

    return user;
  }

  /**
   * Set password reset token
   */
  async setPasswordResetToken(
    userId: string,
    token: string,
    expires: Date
  ): Promise<void> {
    const result = await User.findByIdAndUpdate(userId, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: expires
      }
    });

    if (!result) {
      throw new NotFoundError('User', userId);
    }
  }

  /**
   * Find user by password reset token
   */
  async findByPasswordResetToken(token: string): Promise<IUserDocument | null> {
    return User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() }
    }).select('+password');
  }

  /**
   * Reset password
   */
  async resetPassword(userId: string, newPassword: string): Promise<IUserDocument> {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { password: newPassword },
        $unset: { passwordResetToken: 1, passwordResetExpires: 1 }
      },
      { new: true }
    );

    if (!user) {
      throw new NotFoundError('User', userId);
    }

    return user;
  }

  /**
   * Set email verification token
   */
  async setEmailVerificationToken(
    userId: string,
    token: string,
    expires: Date
  ): Promise<void> {
    const result = await User.findByIdAndUpdate(userId, {
      $set: {
        emailVerificationToken: token,
        emailVerificationExpires: expires
      }
    });

    if (!result) {
      throw new NotFoundError('User', userId);
    }
  }

  /**
   * Find user by email verification token
   */
  async findByEmailVerificationToken(token: string): Promise<IUserDocument | null> {
    return User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() }
    });
  }

  /**
   * Update refresh token
   */
  async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
    const result = await User.findByIdAndUpdate(userId, {
      $set: { refreshToken }
    });

    if (!result) {
      throw new NotFoundError('User', userId);
    }
  }

  /**
   * Update last login
   */
  async updateLastLogin(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      $set: { lastLogin: new Date() }
    });
  }

  /**
   * Soft delete user
   */
  async softDelete(userId: string): Promise<void> {
    const result = await User.findByIdAndUpdate(userId, {
      $set: { isDeleted: true, isActive: false }
    });

    if (!result) {
      throw new NotFoundError('User', userId);
    }
  }

  /**
   * Hard delete user (use with caution)
   */
  async hardDelete(userId: string): Promise<void> {
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      throw new NotFoundError('User', userId);
    }
  }

  /**
   * Count users
   */
  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return User.countDocuments({ ...filter, isDeleted: false });
  }

  /**
   * Check if email exists
   */
  async emailExists(email: string, excludeUserId?: string): Promise<boolean> {
    const query: Record<string, unknown> = {
      email: email.toLowerCase(),
      isDeleted: false
    };

    if (excludeUserId) {
      query._id = { $ne: new mongoose.Types.ObjectId(excludeUserId) };
    }

    const count = await User.countDocuments(query);
    return count > 0;
  }
}

export const userRepository = new UserRepository();