import { Model, Types } from 'mongoose';
import { IContact } from '../models/contact.model.js';
import { CreateContactDto, UpdateContactDto, QueryContactDto } from '../dtos/contact.dto.js';

export class ContactRepository {
  constructor(private readonly model: Model<IContact>) {}

  async create(dto: CreateContactDto): Promise<IContact> {
    const contact = new this.model(dto);
    return contact.save();
  }

  async findById(id: string): Promise<IContact | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<IContact | null>;
  }

  async findAll(query: QueryContactDto): Promise<{ data: IContact[]; total: number }> {
    const { page = 1, limit = 10, search, isRead, isReplied, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (isRead !== undefined) filter.isRead = isRead;
    if (isReplied !== undefined) filter.isReplied = isReplied;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<IContact[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async update(id: string, dto: UpdateContactDto): Promise<IContact | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<IContact | null>;
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