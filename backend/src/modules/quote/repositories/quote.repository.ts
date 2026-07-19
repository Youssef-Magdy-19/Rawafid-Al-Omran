import { Model, Types } from 'mongoose';
import { IQuote } from '../models/quote.model.js';
import { CreateQuoteDto, UpdateQuoteDto, QueryQuoteDto } from '../dtos/quote.dto.js';

export class QuoteRepository {
  constructor(private readonly model: Model<IQuote>) {}

  async create(dto: CreateQuoteDto): Promise<IQuote> {
    const quote = new this.model(dto);
    return quote.save();
  }

  async findById(id: string): Promise<IQuote | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<IQuote | null>;
  }

  async findAll(query: QueryQuoteDto): Promise<{ data: IQuote[]; total: number }> {
    const { page = 1, limit = 10, search, status, isRead, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (status) filter.status = status;
    if (isRead !== undefined) filter.isRead = isRead;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<IQuote[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async update(id: string, dto: UpdateQuoteDto): Promise<IQuote | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<IQuote | null>;
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