import { IPartner } from '../models/partner.model.js';
import { PartnerRepository } from '../repositories/partner.repository.js';
import { CreatePartnerDto, UpdatePartnerDto, QueryPartnerDto } from '../dtos/partner.dto.js';
import { AppError } from '../../../errors/AppError.js';
import { generateSlug } from '../../../utils/slugify.js';

export class PartnerService {
  constructor(private readonly repository: PartnerRepository) {}

  private async validateDuplicateSlug(slug: string, excludeId?: string): Promise<void> {
    const existing = await this.repository.findBySlug(slug);
    if (existing && (!excludeId || (existing as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Partner with this slug already exists', 400);
    }
  }

  async create(dto: CreatePartnerDto): Promise<IPartner> {
    const slug = dto.slug || generateSlug(dto.name);
    await this.validateDuplicateSlug(slug);

    const partnerData = {
      ...dto,
      slug,
      isActive: dto.isActive ?? true,
      isFeatured: dto.isFeatured ?? false
    };

    return this.repository.create(partnerData);
  }

  async findById(id: string): Promise<IPartner> {
    const partner = await this.repository.findById(id);
    if (!partner) {
      throw new AppError('Partner not found', 404);
    }
    return partner;
  }

  async findBySlug(slug: string): Promise<IPartner> {
    const partner = await this.repository.findBySlug(slug);
    if (!partner) {
      throw new AppError('Partner not found', 404);
    }
    return partner;
  }

  async findAll(query: QueryPartnerDto): Promise<{ data: IPartner[]; total: number }> {
    return this.repository.findAll(query);
  }

  async findFeatured(): Promise<IPartner[]> {
    return this.repository.findFeatured();
  }

  async update(id: string, dto: UpdatePartnerDto): Promise<IPartner> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError('Partner not found', 404);
    }

    let slug = dto.slug || existing.slug;
    if (dto.name && dto.name !== existing.name) {
      slug = dto.slug || generateSlug(dto.name);
    }

    await this.validateDuplicateSlug(slug, id);

    const partner = await this.repository.update(id, { ...dto, slug });
    if (!partner) {
      throw new AppError('Partner not found', 404);
    }
    return partner;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Partner not found', 404);
    }
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }
}