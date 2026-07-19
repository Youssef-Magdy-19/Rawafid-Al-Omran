import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  subjectAr: string;
  message: string;
  messageAr: string;
  isRead: boolean;
  isReplied: boolean;
  repliedAt?: Date;
  repliedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    phone: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company cannot exceed 100 characters']
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: [200, 'Subject cannot exceed 200 characters']
    },
    subjectAr: {
      type: String,
      required: [true, 'Arabic subject is required'],
      trim: true,
      maxlength: [200, 'Arabic subject cannot exceed 200 characters']
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [5000, 'Message cannot exceed 5000 characters']
    },
    messageAr: {
      type: String,
      required: [true, 'Arabic message is required'],
      maxlength: [5000, 'Arabic message cannot exceed 5000 characters']
    },
    isRead: {
      type: Boolean,
      default: false
    },
    isReplied: {
      type: Boolean,
      default: false
    },
    repliedAt: {
      type: Date
    },
    repliedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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
ContactSchema.index({ email: 1 });
ContactSchema.index({ isRead: 1 });
ContactSchema.index({ isReplied: 1 });
ContactSchema.index({ createdAt: -1 });

export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
export default Contact;