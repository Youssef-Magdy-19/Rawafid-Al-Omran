import { Model, Types } from 'mongoose';
import { IProject } from '../models/project.model.js';
import { CreateProjectDto, UpdateProjectDto, QueryProjectDto } from '../dtos/project.dto.js';

export class ProjectRepository {
  constructor(private readonly model: Model<IProject>) {}

  async create(dto: CreateProjectDto): Promise<IProject> {
    const project = new this.model(dto);
    return project.save();
  }

  async findById(id: string): Promise<IProject | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<IProject | null>;
  }

  async findBySlug(slug: string): Promise<IProject | null> {
    return this.model.findOne({ slug }).exec() as Promise<IProject | null>;
  }

  async findByTitle(title: string): Promise<IProject | null> {
    return this.model.findOne({ title }).exec() as Promise<IProject | null>;
  }

  async findByTitleAr(titleAr: string): Promise<IProject | null> {
    return this.model.findOne({ titleAr }).exec() as Promise<IProject | null>;
  }

  async findAll(query: QueryProjectDto): Promise<{ data: IProject[]; total: number }> {
    const { page = 1, limit = 10, search, isActive, isFeatured, category, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (isActive !== undefined) filter.isActive = isActive;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { titleAr: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<IProject[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async findFeatured(): Promise<IProject[]> {
    return this.model.find({ isFeatured: true, isActive: true })
      .sort({ createdAt: -1 })
      .exec() as Promise<IProject[]>;
  }

  async findLatest(limit: number = 6): Promise<IProject[]> {
    return this.model.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec() as Promise<IProject[]>;
  }

  async findByCategory(category: string): Promise<IProject[]> {
    return this.model.find({ category, isActive: true })
      .sort({ createdAt: -1 })
      .exec() as Promise<IProject[]>;
  }

  async update(id: string, dto: UpdateProjectDto): Promise<IProject | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<IProject | null>;
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