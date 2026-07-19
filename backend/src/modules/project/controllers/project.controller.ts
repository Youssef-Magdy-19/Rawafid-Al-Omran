import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.service.js';
import { ProjectRepository } from '../repositories/project.repository.js';
import { Project } from '../models/project.model.js';
import { CreateProjectDto, UpdateProjectDto, QueryProjectDto } from '../dtos/project.dto.js';
import {
  sendSuccess,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const projectRepository = new ProjectRepository(Project);
const projectService = new ProjectService(projectRepository);

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryProjectDto = req.query as unknown as QueryProjectDto;
    const result = await projectService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;
    const project = await projectService.findBySlug(slug);

    sendSuccess(res, project, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreateProjectDto = req.body;
    const project = await projectService.create(dto);

    sendCreated(res, project, ResponseMessages.CREATED);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdateProjectDto = req.body;
    const project = await projectService.update(id, dto);

    sendUpdated(res, project, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await projectService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};