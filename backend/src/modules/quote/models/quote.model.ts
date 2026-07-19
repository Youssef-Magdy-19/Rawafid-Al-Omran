import mongoose, { Schema, Document } from 'mongoose';

export type QuoteStatus = 'pending' | 'reviewed' | 'in-progress' | 'completed' | 'rejected';

export interface IQuote extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  serviceTypeAr: string;
  budget: string;
  budgetAr: string;
  timeline: string;
  timelineAr: string;
  projectDescription: string;
  projectDescriptionAr: string;
  attachments?: string[];
  status: QuoteStatus;
  isRead: boolean;
  assignedTo?: mongoose.Types.ObjectId;
  notes?: string;
  notesAr?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema = new Schema<IQuote>(
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
      required: [true, 'Phone is required'],
      trim: true
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company cannot exceed 100 characters']
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      trim: true
    },
    serviceTypeAr: {
      type: String,
      required: [true, 'Arabic service type is required'],
      trim: true
    },
    budget: {
      type: String,
      required: [true, 'Budget is required'],
      trim: true
    },
    budgetAr: {
      type: String,
      required: [true, 'Arabic budget is required'],
      trim: true
    },
    timeline: {
      type: String,
      required: [true, 'Timeline is required'],
      trim: true
    },
    timelineAr: {
      type: String,
      required: [true, 'Arabic timeline is required'],
      trim: true
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      maxlength: [5000, 'Project description cannot exceed 5000 characters']
    },
    projectDescriptionAr: {
      type: String,
      required: [true, 'Arabic project description is required'],
      maxlength: [5000, 'Arabic project description cannot exceed 5000 characters']
    },
    attachments: [{
      type: String,
      trim: true
    }],
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'in-progress', 'completed', 'rejected'],
      default: 'pending'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: {
      type: String,
      maxlength: [2000, 'Notes cannot exceed 2000 characters']
    },
    notesAr: {
      type: String,
      maxlength: [2000, 'Arabic notes cannot exceed 2000 characters']
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
QuoteSchema.index({ email: 1 });
QuoteSchema.index({ status: 1 });
QuoteSchema.index({ isRead: 1 });
QuoteSchema.index({ createdAt: -1 });

export const Quote = mongoose.model<IQuote>('Quote', QuoteSchema);
export default Quote;