import mongoose, { Schema, Document } from 'mongoose';

export interface IFaq extends Document {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  category: string;
  categoryAr: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
      maxlength: [500, 'Question cannot exceed 500 characters']
    },
    questionAr: {
      type: String,
      required: [true, 'Arabic question is required'],
      trim: true,
      maxlength: [500, 'Arabic question cannot exceed 500 characters']
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
      maxlength: [2000, 'Answer cannot exceed 2000 characters']
    },
    answerAr: {
      type: String,
      required: [true, 'Arabic answer is required'],
      maxlength: [2000, 'Arabic answer cannot exceed 2000 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    categoryAr: {
      type: String,
      required: [true, 'Arabic category is required'],
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
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
FaqSchema.index({ category: 1 });
FaqSchema.index({ isActive: 1 });
FaqSchema.index({ order: 1 });

export const Faq = mongoose.model<IFaq>('Faq', FaqSchema);
export default Faq;