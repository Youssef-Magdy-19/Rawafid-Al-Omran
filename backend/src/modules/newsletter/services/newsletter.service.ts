import { INewsletter } from '../models/newsletter.model.js';
import { NewsletterRepository } from '../repositories/newsletter.repository.js';
import { CreateNewsletterDto, UpdateNewsletterDto, QueryNewsletterDto } from '../dtos/newsletter.dto.js';
import { AppError } from '../../../errors/AppError.js';

export class NewsletterService {
  constructor(private readonly repository: NewsletterRepository) {}

  private async validateDuplicateEmail(email: string, excludeId?: string): Promise<void> {
    const existing = await this.repository.findByEmail(email);
    if (existing && (!excludeId || (existing as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Email already subscribed', 400);
    }
  }

  async create(dto: CreateNewsletterDto): Promise<INewsletter> {
    // Validate duplicate email
    await this.validateDuplicateEmail(dto.email);

    // Set default values
    const newsletterData = {
      ...dto,
      isActive: dto.isActive ?? true,
      subscribedAt: new Date()
    };

    return this.repository.create(newsletterData);
  }

  async findById(id: string): Promise<INewsletter> {
    const newsletter = await this.repository.findById(id);
    if (!newsletter) {
      throw new AppError('Newsletter subscription not found', 404);
    }
    return newsletter;
  }

  async findByEmail(email: string): Promise<INewsletter | null> {
    return this.repository.findByEmail(email);
  }

  async findAll(query: QueryNewsletterDto): Promise<{ data: INewsletter[]; total: number }> {
    return this.repository.findAll(query);
  }

  async update(id: string, dto: UpdateNewsletterDto): Promise<INewsletter> {
    // Check if newsletter exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError('Newsletter subscription not found', 404);
    }

    // Validate duplicate email if changed
    if (dto.email && dto.email !== existing.email) {
      await this.validateDuplicateEmail(dto.email, id);
    }

    const newsletter = await this.repository.update(id, dto);
    if (!newsletter) {
      throw new AppError('Newsletter subscription not found', 404);
    }
    return newsletter;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Newsletter subscription not found', 404);
    }
  }

  async unsubscribe(id: string): Promise<INewsletter> {
    const newsletter = await this.repository.findById(id);
    if (!newsletter) {
      throw new AppError('Newsletter subscription not found', 404);
    }
    return this.repository.update(id, { isActive: false, unsubscribedAt: new Date() }) as Promise<INewsletter>;
  }

  async resubscribe(email: string): Promise<INewsletter> {
    const newsletter = await this.repository.findByEmail(email);
    if (!newsletter) {
      throw new AppError('Newsletter subscription not found', 404);
    }
    return this.repository.update(newsletter._id.toString(), { isActive: true, unsubscribedAt: undefined }) as Promise<INewsletter>;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }

  async countActive(): Promise<number> {
    return this.repository.count({ isActive: true });
  }
}