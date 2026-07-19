import { Model, Types } from 'mongoose';
import { IService } from '../models/service.model.js';
import { CreateServiceDto, UpdateServiceDto, QueryServiceDto } from '../dtos/service.dto.js';

export class ServiceRepository {
  constructor(private readonly model: Model<IService>) {}

  async create(dto: CreateServiceDto): Promise<IService> {
    const service = new this.model(dto);
    return service.save();
  }

  async findById(id: string): Promise<IService | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<IService | null>;
  }

  async findBySlug(slug: string): Promise<IService | null> {
    return this.model.findOne({ slug }).exec() as Promise<IService | null>;
  }

  async findByTitle(title: string): Promise<IService | null> {
    return this.model.findOne({ title }).exec() as Promise<IService | null>;
  }

  async findByTitleAr(titleAr: string): Promise<IService | null> {
    return this.model.findOne({ titleAr }).exec() as Promise<IService | null>;
  }

  async findAll(query: QueryServiceDto): Promise<{ data: IService[]; total: number }> {
    const { page = 1, limit = 10, search, isActive, isFeatured, sortBy = 'order', sortOrder = 'asc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (isActive !== undefined) filter.isActive = isActive;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { titleAr: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<IService[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async findFeatured(): Promise<IService[]> {
    return this.model.find({ isFeatured: true, isActive: true })
      .sort({ order: 1 })
      .exec() as Promise<IService[]>;
  }

  async findActive(): Promise<IService[]> {
    return this.model.find({ isActive: true })
      .sort({ order: 1 })
      .exec() as Promise<IService[]>;
  }

  async update(id: string, dto: UpdateServiceDto): Promise<IService | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<IService | null>;
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