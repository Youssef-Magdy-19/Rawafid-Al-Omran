import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    isActive: {
      type: Boolean,
      default: true
    },
    subscribedAt: {
      type: Date,
      default: Date.now
    },
    unsubscribedAt: {
      type: Date
    },
    ipAddress: {
      type: String,
      trim: true
    },
    userAgent: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        ret._id = undefined;
        ret.__v = undefined;
        return ret;
      }
    }
  }
);

// Indexes
NewsletterSchema.index({ email: 1 }, { unique: true });
NewsletterSchema.index({ isActive: 1 });
NewsletterSchema.index({ subscribedAt: -1 });

export const Newsletter = mongoose.model<INewsletter>('Newsletter', NewsletterSchema);
export default Newsletter;