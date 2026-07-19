import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  company: string;
  companyAr: string;
  content: string;
  contentAr: string;
  rating: number;
  image: string;
  thumbnail: string;
  projectId?: mongoose.Types.ObjectId;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    nameAr: {
      type: String,
      required: [true, 'Arabic name is required'],
      trim: true,
      maxlength: [100, 'Arabic name cannot exceed 100 characters']
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters']
    },
    roleAr: {
      type: String,
      required: [true, 'Arabic role is required'],
      trim: true,
      maxlength: [100, 'Arabic role cannot exceed 100 characters']
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
      maxlength: [100, 'Company cannot exceed 100 characters']
    },
    companyAr: {
      type: String,
      required: [true, 'Arabic company is required'],
      trim: true,
      maxlength: [100, 'Arabic company cannot exceed 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      maxlength: [2000, 'Content cannot exceed 2000 characters']
    },
    contentAr: {
      type: String,
      required: [true, 'Arabic content is required'],
      maxlength: [2000, 'Arabic content cannot exceed 2000 characters']
    },
    rating: {
      type: Number,
      default: 5,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    image: {
      type: String,
      required: [true, 'Image is required']
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required']
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
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
TestimonialSchema.index({ order: 1 });
TestimonialSchema.index({ isFeatured: 1, isActive: 1 });
TestimonialSchema.index({ projectId: 1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
export default Testimonial;