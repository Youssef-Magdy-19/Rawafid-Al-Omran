import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
  image: string;
  thumbnail: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  department: string;
  departmentAr: string;
  yearsOfExperience: number;
  completedProjects: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
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
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot exceed 1000 characters']
    },
    bioAr: {
      type: String,
      maxlength: [1000, 'Arabic bio cannot exceed 1000 characters']
    },
    image: {
      type: String,
      required: [true, 'Image is required']
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    facebook: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    },
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
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true
    },
    departmentAr: {
      type: String,
      required: [true, 'Arabic department is required'],
      trim: true
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
      min: [0, 'Years of experience cannot be negative']
    },
    completedProjects: {
      type: Number,
      default: 0,
      min: [0, 'Completed projects cannot be negative']
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
TeamSchema.index({ order: 1 });
TeamSchema.index({ department: 1 });
TeamSchema.index({ isFeatured: 1, isActive: 1 });
TeamSchema.index({ name: 'text', nameAr: 'text', role: 'text', roleAr: 'text' });

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
export default Team;