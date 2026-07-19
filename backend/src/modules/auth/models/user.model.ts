import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserRole = 'admin' | 'editor' | 'user' | 'guest';

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  refreshToken?: string;
  lastLogin?: Date;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface UserDocumentMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = mongoose.Model<IUserDocument, object, UserDocumentMethods>;

const userSchema = new Schema<IUserDocument, UserModel, UserDocumentMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      enum: ['admin', 'editor', 'user', 'guest'],
      default: 'user'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationToken: {
      type: String,
      select: false
    },
    emailVerificationExpires: {
      type: Date,
      select: false
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
    refreshToken: {
      type: String,
      select: false
    },
    lastLogin: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { __v, password, refreshToken, emailVerificationToken, passwordResetToken, isDeleted, ...rest } = ret;
        return rest;
      }
    }
  }
);

// Index for email queries
userSchema.index({ email: 1 });
userSchema.index({ isDeleted: 1, isActive: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUserDocument, UserModel>('User', userSchema);