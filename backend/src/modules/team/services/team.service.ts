import { ITeam } from '../models/team.model.js';
import { TeamRepository } from '../repositories/team.repository.js';
import { CreateTeamDto, UpdateTeamDto, QueryTeamDto } from '../dtos/team.dto.js';
import { AppError } from '../../../errors/AppError.js';

export class TeamService {
  constructor(private readonly repository: TeamRepository) {}

  private async validateDuplicateEmail(email: string, excludeId?: string): Promise<void> {
    const existing = await this.repository.findByEmail(email);
    if (existing && (!excludeId || (existing as unknown as { _id: string })._id.toString() !== excludeId)) {
      throw new AppError('Team member with this email already exists', 400);
    }
  }

  async create(dto: CreateTeamDto): Promise<ITeam> {
    // Validate duplicates
    if (dto.email) {
      await this.validateDuplicateEmail(dto.email);
    }

    // Set default values
    const teamData = {
      ...dto,
      isActive: dto.isActive ?? true,
      isFeatured: dto.isFeatured ?? false,
      order: dto.order ?? 0
    };

    return this.repository.create(teamData);
  }

  async findById(id: string): Promise<ITeam> {
    const team = await this.repository.findById(id);
    if (!team) {
      throw new AppError('Team member not found', 404);
    }
    return team;
  }

  async findAll(query: QueryTeamDto): Promise<{ data: ITeam[]; total: number }> {
    return this.repository.findAll(query);
  }

  async findFeatured(): Promise<ITeam[]> {
    return this.repository.findFeatured();
  }

  async findActive(): Promise<ITeam[]> {
    return this.repository.findActive();
  }

  async update(id: string, dto: UpdateTeamDto): Promise<ITeam> {
    // Check if team member exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError('Team member not found', 404);
    }

    // Validate duplicates
    if (dto.email) {
      await this.validateDuplicateEmail(dto.email, id);
    }

    const team = await this.repository.update(id, dto);
    if (!team) {
      throw new AppError('Team member not found', 404);
    }
    return team;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Team member not found', 404);
    }
  }

  async toggleActive(id: string): Promise<ITeam> {
    const team = await this.repository.findById(id);
    if (!team) {
      throw new AppError('Team member not found', 404);
    }
    return this.repository.update(id, { isActive: !team.isActive }) as Promise<ITeam>;
  }

  async toggleFeatured(id: string): Promise<ITeam> {
    const team = await this.repository.findById(id);
    if (!team) {
      throw new AppError('Team member not found', 404);
    }
    return this.repository.update(id, { isFeatured: !team.isFeatured }) as Promise<ITeam>;
  }

  async reorder(id: string, newOrder: number): Promise<ITeam> {
    const team = await this.repository.findById(id);
    if (!team) {
      throw new AppError('Team member not found', 404);
    }
    return this.repository.update(id, { order: newOrder }) as Promise<ITeam>;
  }

  async count(filter: Record<string, unknown> = {}): Promise<number> {
    return this.repository.count(filter);
  }
}