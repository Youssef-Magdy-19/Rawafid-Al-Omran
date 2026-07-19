import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  titleAr: string;
  slug: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  author: string;
  authorAr: string;
  category: string;
  categoryAr: string;
  tags: string[];
  tagsAr: string[];
  image: string;
  thumbnail: string;
  readTime: number;
  isFeatured: boolean;
  isActive: boolean;
  publishedAt?: Date;
  seoTitle?: string;
  seoTitleAr?: string;
  seoDescription?: string;
  seoDescriptionAr?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
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
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [500, 'Excerpt cannot exceed 500 characters']
    },
    excerptAr: {
      type: String,
      required: [true, 'Arabic excerpt is required'],
      maxlength: [500, 'Arabic excerpt cannot exceed 500 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    contentAr: {
      type: String,
      required: [true, 'Arabic content is required']
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    },
    authorAr: {
      type: String,
      required: [true, 'Arabic author is required'],
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
    tags: [{
      type: String,
      trim: true
    }],
    tagsAr: [{
      type: String,
      trim: true
    }],
    image: {
      type: String,
      required: [true, 'Image is required']
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required']
    },
    readTime: {
      type: Number,
      default: 5,
      min: [1, 'Read time must be at least 1 minute']
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    publishedAt: {
      type: Date
    },
    seoTitle: {
      type: String,
      maxlength: [70, 'SEO title cannot exceed 70 characters']
    },
    seoTitleAr: {
      type: String,
      maxlength: [70, 'Arabic SEO title cannot exceed 70 characters']
    },
    seoDescription: {
      type: String,
      maxlength: [160, 'SEO description cannot exceed 160 characters']
    },
    seoDescriptionAr: {
      type: String,
      maxlength: [160, 'Arabic SEO description cannot exceed 160 characters']
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
BlogSchema.index({ slug: 1 }, { unique: true });
BlogSchema.index({ category: 1 });
BlogSchema.index({ isFeatured: 1, isActive: 1 });
BlogSchema.index({ publishedAt: -1 });
BlogSchema.index({ title: 'text', titleAr: 'text', content: 'text', contentAr: 'text' });

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;