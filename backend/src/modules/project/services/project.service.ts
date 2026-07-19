import { IProject } from '../models/project.model.js';
import { ProjectRepository } from '../repositories/project.repository.js';
import { CreateProjectDto, UpdateProjectDto, QueryProjectDto } from '../dtos/project.dto.js';
import { AppError } from '../../../errors/AppError.js';
import { generateSlug } from '../../../utils/slugify.js';

export class ProjectService {
  constructor(private readonly repository: ProjectRepository) {}

  private async validateDuplicateSlug(slug: string, excludeId?: string): Promise<void> {
    const existing = await this.repository.findBySlug(slug);
    if (existing && (!excludeId || (existing as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Project with this slug already exists', 400);
    }
  }

  private async validateDuplicateTitle(title: string, titleAr: string, excludeId?: string): Promise<void> {
    const existingByTitle = await this.repository.findByTitle(title);
    if (existingByTitle && (!excludeId || (existingByTitle as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Project with this title already exists', 400);
    }

    const existingByTitleAr = await this.repository.findByTitleAr(titleAr);
    if (existingByTitleAr && (!excludeId || (existingByTitleAr as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Project with this Arabic title already exists', 400);
    }
  }

  async create(dto: CreateProjectDto): Promise<IProject> {
    // Generate slug if not provided
    const slug = dto.slug || generateSlug(dto.title);

    // Validate duplicates
    await this.validateDuplicateSlug(slug);
    await this.validateDuplicateTitle(dto.title, dto.titleAr);

    // Set default values
    const projectData = {
      ...dto,
      slug,
      isActive: dto.isActive ?? true,
      isFeatured: dto.isFeatured ?? false
    };

    return this.repository.create(projectData);
  }

  async findById(id: string): Promise<IProject> {
    const project = await this.repository.findById(id);
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    return project;
  }

  async findBySlug(slug: string): Promise<IProject> {
    const project = await this.repository.findBySlug(slug);
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    return project;
  }

  async findAll(query: QueryProjectDto): Promise<{ data: IProject[]; total: number }> {
    return this.repository.findAll(query);
  }

  async findFeatured(): Promise<IProject[]> {
    return this.repository.findFeatured();
  }

  async findLatest(limit: number = 6): Promise<IProject[]> {
    return this.repository.findLatest(limit);
  }

  async findByCategory(category: string): Promise<IProject[]> {
    return this.repository.findByCategory(category);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<IProject> {
    // Check if project exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError('Project not found', 404);
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

    const project = await this.repository.update(id, { ...dto, slug });
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    return project;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Project not found', 404);
    }
  }

  async toggleActive(id: string): Promise<IProject> {
    const project = await this.repository.findById(id);
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    return this.repository.update(id, { isActive: !project.isActive }) as Promise<IProject>;
  }

  async toggleFeatured(id: string): Promise<IProject> {
    const project = await this.repository.findById(id);
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    return this.repository.update(id, { isFeatured: !project.isFeatured }) as Promise<IProject>;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }
}