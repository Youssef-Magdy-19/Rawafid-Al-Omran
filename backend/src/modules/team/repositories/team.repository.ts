import { Model, Types } from 'mongoose';
import { ITeam } from '../models/team.model.js';
import { CreateTeamDto, UpdateTeamDto, QueryTeamDto } from '../dtos/team.dto.js';

export class TeamRepository {
  constructor(private readonly model: Model<ITeam>) {}

  async create(dto: CreateTeamDto): Promise<ITeam> {
    const team = new this.model(dto);
    return team.save();
  }

  async findById(id: string): Promise<ITeam | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findById(id).exec() as Promise<ITeam | null>;
  }

  async findBySlug(slug: string): Promise<ITeam | null> {
    return this.model.findOne({ slug }).exec() as Promise<ITeam | null>;
  }

  async findByEmail(email: string): Promise<ITeam | null> {
    return this.model.findOne({ email }).exec() as Promise<ITeam | null>;
  }

  async findAll(query: QueryTeamDto): Promise<{ data: ITeam[]; total: number }> {
    const { page = 1, limit = 10, search, isActive, isFeatured, department, sortBy = 'order', sortOrder = 'asc' } = query;
    
    const filter: Record<string, unknown> = {};
    
    if (isActive !== undefined) filter.isActive = isActive;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured;
    if (department) filter.department = department;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameAr: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec() as Promise<ITeam[]>,
      this.model.countDocuments(filter).exec()
    ]);

    return { data, total };
  }

  async findFeatured(): Promise<ITeam[]> {
    return this.model.find({ isFeatured: true, isActive: true })
      .sort({ order: 1 })
      .exec() as Promise<ITeam[]>;
  }

  async findActive(): Promise<ITeam[]> {
    return this.model.find({ isActive: true })
      .sort({ order: 1 })
      .exec() as Promise<ITeam[]>;
  }

  async update(id: string, dto: UpdateTeamDto): Promise<ITeam | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec() as Promise<ITeam | null>;
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