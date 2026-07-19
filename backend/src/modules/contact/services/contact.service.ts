import { IContact } from '../models/contact.model.js';
import { ContactRepository } from '../repositories/contact.repository.js';
import { CreateContactDto, UpdateContactDto, QueryContactDto } from '../dtos/contact.dto.js';
import { AppError } from '../../../errors/AppError.js';

export class ContactService {
  constructor(private readonly repository: ContactRepository) {}

  async create(dto: CreateContactDto): Promise<IContact> {
    return this.repository.create(dto);
  }

  async findById(id: string): Promise<IContact> {
    const contact = await this.repository.findById(id);
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }
    return contact;
  }

  async findAll(query: QueryContactDto): Promise<{ data: IContact[]; total: number }> {
    return this.repository.findAll(query);
  }

  async update(id: string, dto: UpdateContactDto): Promise<IContact> {
    const contact = await this.repository.update(id, dto);
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }
    return contact;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Contact not found', 404);
    }
  }

  async markAsRead(id: string): Promise<IContact> {
    const contact = await this.repository.findById(id);
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }
    return this.repository.update(id, { isRead: true }) as Promise<IContact>;
  }

  async markAsReplied(id: string, repliedBy?: string): Promise<IContact> {
    const contact = await this.repository.findById(id);
    if (!contact) {
      throw new AppError('Contact not found', 404);
    }
    return this.repository.update(id, { 
      isReplied: true, 
      repliedAt: new Date(),
      repliedBy 
    }) as Promise<IContact>;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }

  async countUnread(): Promise<number> {
    return this.repository.count({ isRead: false });
  }
}