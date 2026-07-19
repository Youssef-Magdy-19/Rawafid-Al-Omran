import { Request, Response, NextFunction } from 'express';
import { TeamService } from '../services/team.service.js';
import { TeamRepository } from '../repositories/team.repository.js';
import { Team } from '../models/team.model.js';
import { CreateTeamDto, UpdateTeamDto, QueryTeamDto } from '../dtos/team.dto.js';
import {
  sendSuccess,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const teamRepository = new TeamRepository(Team);
const teamService = new TeamService(teamRepository);

export const getAllTeamMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryTeamDto = req.query as unknown as QueryTeamDto;
    const result = await teamService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getTeamMemberById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const teamMember = await teamService.findById(id);

    sendSuccess(res, teamMember, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreateTeamDto = req.body;
    const teamMember = await teamService.create(dto);

    sendCreated(res, teamMember, ResponseMessages.CREATED);
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdateTeamDto = req.body;
    const teamMember = await teamService.update(id, dto);

    sendUpdated(res, teamMember, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await teamService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};