import { Model, Types } from 'mongoose';
import { IFaq } from '../models/faq.model.js';
import { CreateFaqDto, UpdateFaqDto, QueryFaqDto } from '../dtos/faq.dto.js';

export class FaqRepository {
  constructor(private readonly model: Model<IFaq>) {}

  async create(dto: CreateFaqDto): Promise<IFaq> {
    const faq = new this.model(dto);
    return faq.save();
  }

  async findById(id: string): Promise<IFaq | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<IFaq | null>;
  }

  async findAll(query: QueryFaqDto): Promise<{ data: IFaq[]; total: number }> {
    const { page = 1, limit = 10, category, isActive, sortBy = 'order', sortOrder = 'asc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (isActive !== undefined) filter.isActive = isActive;
    if (category) filter.category = category;

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<IFaq[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async findActive(): Promise<IFaq[]> {
    return this.model.find({ isActive: true })
      .sort({ order: 1 })
      .exec() as Promise<IFaq[]>;
  }

  async update(id: string, dto: UpdateFaqDto): Promise<IFaq | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<IFaq | null>;
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