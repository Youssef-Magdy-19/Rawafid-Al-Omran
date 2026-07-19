import { IBlog } from '../models/blog.model.js';
import { BlogRepository } from '../repositories/blog.repository.js';
import { CreateBlogDto, UpdateBlogDto, QueryBlogDto } from '../dtos/blog.dto.js';
import { AppError } from '../../../errors/AppError.js';
import { generateSlug } from '../../../utils/slugify.js';

export class BlogService {
  constructor(private readonly repository: BlogRepository) {}

  private async validateDuplicateSlug(slug: string, excludeId?: string): Promise<void> {
    const existing = await this.repository.findBySlug(slug);
    if (existing && (!excludeId || (existing as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Blog post with this slug already exists', 400);
    }
  }

  private async validateDuplicateTitle(title: string, titleAr: string, excludeId?: string): Promise<void> {
    const existingByTitle = await this.repository.findByTitle(title);
    if (existingByTitle && (!excludeId || (existingByTitle as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Blog post with this title already exists', 400);
    }

    const existingByTitleAr = await this.repository.findByTitleAr(titleAr);
    if (existingByTitleAr && (!excludeId || (existingByTitleAr as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Blog post with this Arabic title already exists', 400);
    }
  }

  async create(dto: CreateBlogDto): Promise<IBlog> {
    // Generate slug if not provided
    const slug = dto.slug || generateSlug(dto.title);

    // Validate duplicates
    await this.validateDuplicateSlug(slug);
    await this.validateDuplicateTitle(dto.title, dto.titleAr);

    // Set default values
    const blogData = {
      ...dto,
      slug,
      isActive: dto.isActive ?? true,
      isFeatured: dto.isFeatured ?? false,
      publishedAt: dto.publishedAt ?? undefined
    };

    return this.repository.create(blogData);
  }

  async findById(id: string): Promise<IBlog> {
    const blog = await this.repository.findById(id);
    if (!blog) {
      throw new AppError('Blog post not found', 404);
    }
    return blog;
  }

  async findBySlug(slug: string): Promise<IBlog> {
    const blog = await this.repository.findBySlug(slug);
    if (!blog) {
      throw new AppError('Blog post not found', 404);
    }
    return blog;
  }

  async findAll(query: QueryBlogDto): Promise<{ data: IBlog[]; total: number }> {
    return this.repository.findAll(query);
  }

  async findPublished(query: QueryBlogDto): Promise<{ data: IBlog[]; total: number }> {
    return this.repository.findPublished(query);
  }

  async findFeatured(): Promise<IBlog[]> {
    return this.repository.findFeatured();
  }

  async findLatest(limit: number = 6): Promise<IBlog[]> {
    return this.repository.findLatest(limit);
  }

  async findRelated(blogId: string, category: string, limit: number = 3): Promise<IBlog[]> {
    return this.repository.findRelated(blogId, category, limit);
  }

  async update(id: string, dto: UpdateBlogDto): Promise<IBlog> {
    // Check if blog exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError('Blog post not found', 404);
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

    // Handle publish status change - use publishedAt to determine if published
    let publishedAt = existing.publishedAt;
    if (dto.publishedAt && !existing.publishedAt) {
      publishedAt = new Date();
    }

    const blog = await this.repository.update(id, { ...dto, slug, publishedAt });
    if (!blog) {
      throw new AppError('Blog post not found', 404);
    }
    return blog;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Blog post not found', 404);
    }
  }

  async publish(id: string): Promise<IBlog> {
    const blog = await this.repository.findById(id);
    if (!blog) {
      throw new AppError('Blog post not found', 404);
    }
    return this.repository.update(id, { publishedAt: new Date() }) as Promise<IBlog>;
  }

  async unpublish(id: string): Promise<IBlog> {
    const blog = await this.repository.findById(id);
    if (!blog) {
      throw new AppError('Blog post not found', 404);
    }
    return this.repository.update(id, { publishedAt: undefined }) as Promise<IBlog>;
  }

  async toggleFeatured(id: string): Promise<IBlog> {
    const blog = await this.repository.findById(id);
    if (!blog) {
      throw new AppError('Blog post not found', 404);
    }
    return this.repository.update(id, { isFeatured: !blog.isFeatured }) as Promise<IBlog>;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }
}