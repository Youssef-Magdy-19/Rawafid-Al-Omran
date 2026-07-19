import { Model, Types } from 'mongoose';
import { IBlog } from '../models/blog.model.js';
import { CreateBlogDto, UpdateBlogDto, QueryBlogDto } from '../dtos/blog.dto.js';

export class BlogRepository {
  constructor(private readonly model: Model<IBlog>) {}

  async create(dto: CreateBlogDto): Promise<IBlog> {
    const blog = new this.model(dto);
    return blog.save();
  }

  async findById(id: string): Promise<IBlog | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<IBlog | null>;
  }

  async findBySlug(slug: string): Promise<IBlog | null> {
    return this.model.findOne({ slug }).exec() as Promise<IBlog | null>;
  }

  async findByTitle(title: string): Promise<IBlog | null> {
    return this.model.findOne({ title }).exec() as Promise<IBlog | null>;
  }

  async findByTitleAr(titleAr: string): Promise<IBlog | null> {
    return this.model.findOne({ titleAr }).exec() as Promise<IBlog | null>;
  }

  async findAll(query: QueryBlogDto): Promise<{ data: IBlog[]; total: number }> {
    const { page = 1, limit = 10, search, isActive, isFeatured, isPublished, category, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (isActive !== undefined) filter.isActive = isActive;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured;
    if (isPublished !== undefined) filter.isPublished = isPublished;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { titleAr: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<IBlog[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async findPublished(query: QueryBlogDto): Promise<{ data: IBlog[]; total: number }> {
    return this.findAll({ ...query, isPublished: true, isActive: true });
  }

  async findFeatured(): Promise<IBlog[]> {
    return this.model.find({ isFeatured: true, isPublished: true, isActive: true })
      .sort({ publishedAt: -1 })
      .exec() as Promise<IBlog[]>;
  }

  async findLatest(limit: number = 6): Promise<IBlog[]> {
    return this.model.find({ isPublished: true, isActive: true })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .exec() as Promise<IBlog[]>;
  }

  async findRelated(blogId: string, category: string, limit: number = 3): Promise<IBlog[]> {
    return this.model.find({
      _id: { $ne: blogId },
      category,
      isPublished: true,
      isActive: true
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .exec() as Promise<IBlog[]>;
  }

  async update(id: string, dto: UpdateBlogDto): Promise<IBlog | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<IBlog | null>;
  }

  async delete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}