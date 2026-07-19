import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  titleAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  category: string;
  categoryAr: string;
  location: string;
  locationAr: string;
  client: string;
  clientAr: string;
  year: number;
  duration: string;
  durationAr: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  images: string[];
  thumbnail: string;
  videoUrl?: string;
  budget: string;
  budgetAr: string;
  features: string[];
  featuresAr: string[];
  challenges?: string;
  challengesAr?: string;
  solutions?: string;
  solutionsAr?: string;
  results?: string;
  resultsAr?: string;
  testimonialId?: mongoose.Types.ObjectId;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  completionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
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
      maxlength: [10000, 'Description cannot exceed 10000 characters']
    },
    descriptionAr: {
      type: String,
      required: [true, 'Arabic description is required'],
      maxlength: [10000, 'Arabic description cannot exceed 10000 characters']
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
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    locationAr: {
      type: String,
      required: [true, 'Arabic location is required'],
      trim: true
    },
    client: {
      type: String,
      required: [true, 'Client is required'],
      trim: true
    },
    clientAr: {
      type: String,
      required: [true, 'Arabic client is required'],
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'Year is required']
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true
    },
    durationAr: {
      type: String,
      required: [true, 'Arabic duration is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['planning', 'in-progress', 'completed', 'on-hold'],
      default: 'planning'
    },
    images: [{
      type: String,
      trim: true
    }],
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required']
    },
    videoUrl: {
      type: String,
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
    features: [{
      type: String,
      trim: true
    }],
    featuresAr: [{
      type: String,
      trim: true
    }],
    challenges: {
      type: String,
      maxlength: [5000, 'Challenges cannot exceed 5000 characters']
    },
    challengesAr: {
      type: String,
      maxlength: [5000, 'Arabic challenges cannot exceed 5000 characters']
    },
    solutions: {
      type: String,
      maxlength: [5000, 'Solutions cannot exceed 5000 characters']
    },
    solutionsAr: {
      type: String,
      maxlength: [5000, 'Arabic solutions cannot exceed 5000 characters']
    },
    results: {
      type: String,
      maxlength: [5000, 'Results cannot exceed 5000 characters']
    },
    resultsAr: {
      type: String,
      maxlength: [5000, 'Arabic results cannot exceed 5000 characters']
    },
    testimonialId: {
      type: Schema.Types.ObjectId,
      ref: 'Testimonial'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    },
    completionDate: {
      type: Date
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
ProjectSchema.index({ slug: 1 }, { unique: true });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ year: 1 });
ProjectSchema.index({ isFeatured: 1, isActive: 1 });
ProjectSchema.index({ order: 1 });
ProjectSchema.index({ title: 'text', titleAr: 'text', description: 'text', descriptionAr: 'text' });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;