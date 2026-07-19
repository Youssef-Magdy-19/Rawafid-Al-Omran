import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  nameAr: string;
  slug: string;
  description: string;
  descriptionAr: string;
  logo: string;
  website: string;
  category: string;
  categoryAr: string;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters']
    },
    nameAr: {
      type: String,
      required: [true, 'Arabic name is required'],
      trim: true,
      maxlength: [200, 'Arabic name cannot exceed 200 characters']
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
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    descriptionAr: {
      type: String,
      maxlength: [1000, 'Arabic description cannot exceed 1000 characters']
    },
    logo: {
      type: String,
      required: [true, 'Logo is required']
    },
    website: {
      type: String,
      trim: true
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
PartnerSchema.index({ slug: 1 }, { unique: true });
PartnerSchema.index({ category: 1 });
PartnerSchema.index({ isFeatured: 1, isActive: 1 });
PartnerSchema.index({ order: 1 });

export const Partner = mongoose.model<IPartner>('Partner', PartnerSchema);
export default Partner;