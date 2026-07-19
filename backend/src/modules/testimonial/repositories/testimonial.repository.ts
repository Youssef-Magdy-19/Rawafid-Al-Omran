import { Model, Types } from 'mongoose';
import { ITestimonial } from '../models/testimonial.model.js';
import { CreateTestimonialDto, UpdateTestimonialDto, QueryTestimonialDto } from '../dtos/testimonial.dto.js';

export class TestimonialRepository {
  constructor(private readonly model: Model<ITestimonial>) {}

  async create(dto: CreateTestimonialDto): Promise<ITestimonial> {
    const testimonial = new this.model(dto);
    return testimonial.save();
  }

  async findById(id: string): Promise<ITestimonial | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<ITestimonial | null>;
  }

  async findBySlug(slug: string): Promise<ITestimonial | null> {
    return this.model.findOne({ slug }).exec() as Promise<ITestimonial | null>;
  }

  async findAll(query: QueryTestimonialDto): Promise<{ data: ITestimonial[]; total: number }> {
    const { page = 1, limit = 10, search, isActive, isFeatured, sortBy = 'order', sortOrder = 'asc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (isActive !== undefined) filter.isActive = isActive;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameAr: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<ITestimonial[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async findFeatured(): Promise<ITestimonial[]> {
    return this.model.find({ isFeatured: true, isActive: true })
      .sort({ order: 1 })
      .exec() as Promise<ITestimonial[]>;
  }

  async findActive(): Promise<ITestimonial[]> {
    return this.model.find({ isActive: true })
      .sort({ order: 1 })
      .exec() as Promise<ITestimonial[]>;
  }

  async update(id: string, dto: UpdateTestimonialDto): Promise<ITestimonial | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<ITestimonial | null>;
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