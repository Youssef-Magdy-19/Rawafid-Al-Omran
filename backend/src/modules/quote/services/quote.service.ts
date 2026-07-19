import { IQuote, QuoteStatus } from '../models/quote.model.js';
import { QuoteRepository } from '../repositories/quote.repository.js';
import { CreateQuoteDto, UpdateQuoteDto, QueryQuoteDto } from '../dtos/quote.dto.js';
import { AppError } from '../../../errors/AppError.js';

// Valid status transitions
const STATUS_TRANSITIONS: Record<QuoteStatus, QuoteStatus[]> = {
  'pending': ['reviewed', 'rejected'],
  'reviewed': ['in-progress', 'rejected'],
  'in-progress': ['completed', 'rejected'],
  'completed': [],
  'rejected': []
};

export class QuoteService {
  constructor(private readonly repository: QuoteRepository) {}

  private validateStatusTransition(currentStatus: QuoteStatus, newStatus: QuoteStatus): void {
    const allowedTransitions = STATUS_TRANSITIONS[currentStatus];
    if (!allowedTransitions.includes(newStatus)) {
      throw new AppError(
        `Invalid status transition from '${currentStatus}' to '${newStatus}'. Allowed transitions: ${allowedTransitions.join(', ') || 'none'}`,
        400
      );
    }
  }

  async create(dto: CreateQuoteDto): Promise<IQuote> {
    // Set default status to 'pending'
    const quoteData = {
      ...dto,
      status: 'pending' as QuoteStatus,
      isRead: false
    };

    return this.repository.create(quoteData);
  }

  async findById(id: string): Promise<IQuote> {
    const quote = await this.repository.findById(id);
    if (!quote) {
      throw new AppError('Quote not found', 404);
    }
    return quote;
  }

  async findAll(query: QueryQuoteDto): Promise<{ data: IQuote[]; total: number }> {
    return this.repository.findAll(query);
  }

  async update(id: string, dto: UpdateQuoteDto): Promise<IQuote> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError('Quote not found', 404);
    }

    // If status is being changed, validate the transition
    if (dto.status && dto.status !== existing.status) {
      this.validateStatusTransition(existing.status as QuoteStatus, dto.status as QuoteStatus);
    }

    const quote = await this.repository.update(id, dto);
    if (!quote) {
      throw new AppError('Quote not found', 404);
    }
    return quote;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Quote not found', 404);
    }
  }

  async updateStatus(id: string, status: QuoteStatus): Promise<IQuote> {
    const quote = await this.repository.findById(id);
    if (!quote) {
      throw new AppError('Quote not found', 404);
    }

    // Validate the status value
    const validStatuses: QuoteStatus[] = ['pending', 'reviewed', 'in-progress', 'completed', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new AppError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400);
    }

    // Validate status transition
    this.validateStatusTransition(quote.status as QuoteStatus, status);

    return this.repository.update(id, { status }) as Promise<IQuote>;
  }

  async markAsReviewed(id: string): Promise<IQuote> {
    return this.updateStatus(id, 'reviewed');
  }

  async startProgress(id: string): Promise<IQuote> {
    return this.updateStatus(id, 'in-progress');
  }

  async complete(id: string): Promise<IQuote> {
    return this.updateStatus(id, 'completed');
  }

  async reject(id: string): Promise<IQuote> {
    return this.updateStatus(id, 'rejected');
  }

  async markAsRead(id: string): Promise<IQuote> {
    const quote = await this.repository.findById(id);
    if (!quote) {
      throw new AppError('Quote not found', 404);
    }
    return this.repository.update(id, { isRead: true }) as Promise<IQuote>;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }

  async countByStatus(): Promise<Record<QuoteStatus, number>> {
    const statuses: QuoteStatus[] = ['pending', 'reviewed', 'in-progress', 'completed', 'rejected'];
    const counts: Record<QuoteStatus, number> = {
      pending: 0,
      reviewed: 0,
      'in-progress': 0,
      completed: 0,
      rejected: 0
    };

    for (const status of statuses) {
      counts[status] = await this.repository.count({ status });
    }

    return counts;
  }
}