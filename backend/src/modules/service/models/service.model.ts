import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  icon: string;
  image: string;
  features: string[];
  featuresAr: string[];
  benefits: string[];
  benefitsAr: string[];
  process: {
    step: number;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
  }[];
  faqs: {
    question: string;
    questionAr: string;
    answer: string;
    answerAr: string;
  }[];
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    titleAr: {
      type: String,
      required: [true, 'Arabic title is required'],
      trim: true,
      maxlength: [200, 'Arabic title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    descriptionAr: {
      type: String,
      required: [true, 'Arabic description is required'],
      maxlength: [5000, 'Arabic description cannot exceed 5000 characters']
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [500, 'Short description cannot exceed 500 characters']
    },
    shortDescriptionAr: {
      type: String,
      required: [true, 'Arabic short description is required'],
      maxlength: [500, 'Arabic short description cannot exceed 500 characters']
    },
    icon: {
      type: String,
      default: 'construction'
    },
    image: {
      type: String,
      default: ''
    },
    features: [{
      type: String,
      trim: true
    }],
    featuresAr: [{
      type: String,
      trim: true
    }],
    benefits: [{
      type: String,
      trim: true
    }],
    benefitsAr: [{
      type: String,
      trim: true
    }],
    process: [{
      step: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      titleAr: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      descriptionAr: {
        type: String,
        required: true
      }
    }],
    faqs: [{
      question: {
        type: String,
        required: true
      },
      questionAr: {
        type: String,
        required: true
      },
      answer: {
        type: String,
        required: true
      },
      answerAr: {
        type: String,
        required: true
      }
    }],
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
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
ServiceSchema.index({ slug: 1 }, { unique: true });
ServiceSchema.index({ order: 1 });
ServiceSchema.index({ isActive: 1, isFeatured: 1 });
ServiceSchema.index({ title: 'text', titleAr: 'text', description: 'text', descriptionAr: 'text' });

export const Service = mongoose.model<IService>('Service', ServiceSchema);
export default Service;