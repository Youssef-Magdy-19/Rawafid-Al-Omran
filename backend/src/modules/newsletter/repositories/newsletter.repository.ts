import { Model, Types } from 'mongoose';
import { INewsletter } from '../models/newsletter.model.js';
import { CreateNewsletterDto, UpdateNewsletterDto, QueryNewsletterDto } from '../dtos/newsletter.dto.js';

export class NewsletterRepository {
  constructor(private readonly model: Model<INewsletter>) {}

  async create(dto: CreateNewsletterDto): Promise<INewsletter> {
    const newsletter = new this.model(dto);
    return newsletter.save();
  }

  async findById(id: string): Promise<INewsletter | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<INewsletter | null>;
  }

  async findByEmail(email: string): Promise<INewsletter | null> {
    return this.model.findOne({ email: email.toLowerCase() }).exec() as Promise<INewsletter | null>;
  }

  async findAll(query: QueryNewsletterDto): Promise<{ data: INewsletter[]; total: number }> {
    const { page = 1, limit = 10, search, isActive, sortBy = 'subscribedAt', sortOrder = 'desc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (isActive !== undefined) filter.isActive = isActive;
    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<INewsletter[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async update(id: string, dto: UpdateNewsletterDto): Promise<INewsletter | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<INewsletter | null>;
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