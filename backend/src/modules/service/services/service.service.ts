import { IService } from '../models/service.model.js';
import { ServiceRepository } from '../repositories/service.repository.js';
import { CreateServiceDto, UpdateServiceDto, QueryServiceDto } from '../dtos/service.dto.js';
import { AppError } from '../../../errors/AppError.js';
import { generateSlug } from '../../../utils/slugify.js';

export class ServiceService {
  constructor(private readonly repository: ServiceRepository) {}

  private async validateDuplicateSlug(slug: string, excludeId?: string): Promise<void> {
    const existing = await this.repository.findBySlug(slug);
    if (existing && (!excludeId || (existing as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Service with this slug already exists', 400);
    }
  }

  private async validateDuplicateTitle(title: string, titleAr: string, excludeId?: string): Promise<void> {
    const existingByTitle = await this.repository.findByTitle(title);
    if (existingByTitle && (!excludeId || (existingByTitle as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Service with this title already exists', 400);
    }

    const existingByTitleAr = await this.repository.findByTitleAr(titleAr);
    if (existingByTitleAr && (!excludeId || (existingByTitleAr as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Service with this Arabic title already exists', 400);
    }
  }

  async create(dto: CreateServiceDto): Promise<IService> {
    // Generate slug if not provided
    const slug = dto.slug || generateSlug(dto.title);

    // Validate duplicates
    await this.validateDuplicateSlug(slug);
    await this.validateDuplicateTitle(dto.title, dto.titleAr);

    // Set default values
    const serviceData = {
      ...dto,
      slug,
      isActive: dto.isActive ?? true,
      isFeatured: dto.isFeatured ?? false,
      order: dto.order ?? 0
    };

    return this.repository.create(serviceData);
  }

  async findById(id: string): Promise<IService> {
    const service = await this.repository.findById(id);
    if (!service) {
      throw new AppError('Service not found', 404);
    }
    return service;
  }

  async findBySlug(slug: string): Promise<IService> {
    const service = await this.repository.findBySlug(slug);
    if (!service) {
      throw new AppError('Service not found', 404);
    }
    return service;
  }

  async findAll(query: QueryServiceDto): Promise<{ data: IService[]; total: number }> {
    return this.repository.findAll(query);
  }

  async findFeatured(): Promise<IService[]> {
    return this.repository.findFeatured();
  }

  async findActive(): Promise<IService[]> {
    return this.repository.findActive();
  }

  async update(id: string, dto: UpdateServiceDto): Promise<IService> {
    // Check if service exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError('Service not found', 404);
    }

    // Generate new slug if title changed
    let slug = dto.slug || existing.slug;
    if (dto.title && dto.title !== existing.title) {
      slug = dto.slug || generateSlug(dto.title);
    }

    // Validate duplicates
    await this.validateDuplicateSlug(slug, id);
    if (dto.title || dto.titleAr) {
      await this.validateDuplicateTitle(
        dto.title || existing.title,
        dto.titleAr || existing.titleAr,
        id
      );
    }

    const service = await this.repository.update(id, { ...dto, slug });
    if (!service) {
      throw new AppError('Service not found', 404);
    }
    return service;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Service not found', 404);
    }
  }

  async toggleActive(id: string): Promise<IService> {
    const service = await this.repository.findById(id);
    if (!service) {
      throw new AppError('Service not found', 404);
    }
    return this.repository.update(id, { isActive: !service.isActive }) as Promise<IService>;
  }

  async toggleFeatured(id: string): Promise<IService> {
    const service = await this.repository.findById(id);
    if (!service) {
      throw new AppError('Service not found', 404);
    }
    return this.repository.update(id, { isFeatured: !service.isFeatured }) as Promise<IService>;
  }

  async reorder(id: string, newOrder: number): Promise<IService> {
    const service = await this.repository.findById(id);
    if (!service) {
      throw new AppError('Service not found', 404);
    }
    return this.repository.update(id, { order: newOrder }) as Promise<IService>;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }
}