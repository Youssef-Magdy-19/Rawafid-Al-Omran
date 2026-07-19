import { ITestimonial } from '../models/testimonial.model.js';
import { TestimonialRepository } from '../repositories/testimonial.repository.js';
import { CreateTestimonialDto, UpdateTestimonialDto, QueryTestimonialDto } from '../dtos/testimonial.dto.js';
import { AppError } from '../../../errors/AppError.js';

export class TestimonialService {
  constructor(private readonly repository: TestimonialRepository) {}

  async create(dto: CreateTestimonialDto): Promise<ITestimonial> {
    // Set default values
    const testimonialData = {
      ...dto,
      isActive: dto.isActive ?? true,
      isFeatured: dto.isFeatured ?? false,
      order: dto.order ?? 0
    };

    return this.repository.create(testimonialData);
  }

  async findById(id: string): Promise<ITestimonial> {
    const testimonial = await this.repository.findById(id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    return testimonial;
  }

  async findAll(query: QueryTestimonialDto): Promise<{ data: ITestimonial[]; total: number }> {
    return this.repository.findAll(query);
  }

  async findFeatured(): Promise<ITestimonial[]> {
    return this.repository.findFeatured();
  }

  async findActive(): Promise<ITestimonial[]> {
    return this.repository.findActive();
  }

  async update(id: string, dto: UpdateTestimonialDto): Promise<ITestimonial> {
    // Check if testimonial exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError('Testimonial not found', 404);
    }

    const testimonial = await this.repository.update(id, dto);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    return testimonial;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Testimonial not found', 404);
    }
  }

  async toggleActive(id: string): Promise<ITestimonial> {
    const testimonial = await this.repository.findById(id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    return this.repository.update(id, { isActive: !testimonial.isActive }) as Promise<ITestimonial>;
  }

  async toggleFeatured(id: string): Promise<ITestimonial> {
    const testimonial = await this.repository.findById(id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    return this.repository.update(id, { isFeatured: !testimonial.isFeatured }) as Promise<ITestimonial>;
  }

  async reorder(id: string, newOrder: number): Promise<ITestimonial> {
    const testimonial = await this.repository.findById(id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    return this.repository.update(id, { order: newOrder }) as Promise<ITestimonial>;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }
}