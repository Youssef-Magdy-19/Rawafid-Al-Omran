import { IFaq } from '../models/faq.model.js';
import { FaqRepository } from '../repositories/faq.repository.js';
import { CreateFaqDto, UpdateFaqDto, QueryFaqDto } from '../dtos/faq.dto.js';
import { AppError } from '../../../errors/AppError.js';

export class FaqService {
  constructor(private readonly repository: FaqRepository) {}

  async create(dto: CreateFaqDto): Promise<IFaq> {
    const faqData = {
      ...dto,
      isActive: dto.isActive ?? true
    };

    return this.repository.create(faqData);
  }

  async findById(id: string): Promise<IFaq> {
    const faq = await this.repository.findById(id);
    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }
    return faq;
  }

  async findAll(query: QueryFaqDto): Promise<{ data: IFaq[]; total: number }> {
    return this.repository.findAll(query);
  }

  async findActive(): Promise<IFaq[]> {
    return this.repository.findActive();
  }

  async update(id: string, dto: UpdateFaqDto): Promise<IFaq> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError('FAQ not found', 404);
    }

    const faq = await this.repository.update(id, dto);
    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }
    return faq;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('FAQ not found', 404);
    }
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }
}