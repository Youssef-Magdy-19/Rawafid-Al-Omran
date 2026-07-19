import { Model, Types } from 'mongoose';
import { IPartner } from '../models/partner.model.js';
import { CreatePartnerDto, UpdatePartnerDto, QueryPartnerDto } from '../dtos/partner.dto.js';

export class PartnerRepository {
  constructor(private readonly model: Model<IPartner>) {}

  async create(dto: CreatePartnerDto): Promise<IPartner> {
    const partner = new this.model(dto);
    return partner.save();
  }

  async findById(id: string): Promise<IPartner | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<IPartner | null>;
  }

  async findBySlug(slug: string): Promise<IPartner | null> {
    return this.model.findOne({ slug }).exec() as Promise<IPartner | null>;
  }

  async findAll(query: QueryPartnerDto): Promise<{ data: IPartner[]; total: number }> {
    const { page = 1, limit = 10, search, isActive, isFeatured, category, sortBy = 'order', sortOrder = 'asc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (isActive !== undefined) filter.isActive = isActive;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameAr: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<IPartner[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async findFeatured(): Promise<IPartner[]> {
    return this.model.find({ isFeatured: true, isActive: true })
      .sort({ order: 1 })
      .exec() as Promise<IPartner[]>;
  }

  async update(id: string, dto: UpdatePartnerDto): Promise<IPartner | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<IPartner | null>;
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