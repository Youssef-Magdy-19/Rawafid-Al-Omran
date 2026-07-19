import { Request, Response, NextFunction } from 'express';
import { ServiceService } from '../services/service.service.js';
import { ServiceRepository } from '../repositories/service.repository.js';
import { Service } from '../models/service.model.js';
import { CreateServiceDto, UpdateServiceDto, QueryServiceDto } from '../dtos/service.dto.js';
import {
  sendSuccess,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const serviceRepository = new ServiceRepository(Service);
const serviceService = new ServiceService(serviceRepository);

export const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryServiceDto = req.query as unknown as QueryServiceDto;
    const result = await serviceService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;
    const service = await serviceService.findBySlug(slug);

    sendSuccess(res, service, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreateServiceDto = req.body;
    const service = await serviceService.create(dto);

    sendCreated(res, service, ResponseMessages.CREATED);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdateServiceDto = req.body;
    const service = await serviceService.update(id, dto);

    sendUpdated(res, service, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await serviceService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};