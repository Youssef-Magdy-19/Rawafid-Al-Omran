import { Request, Response, NextFunction } from 'express';
import { PartnerService } from '../services/partner.service.js';
import { PartnerRepository } from '../repositories/partner.repository.js';
import { Partner } from '../models/partner.model.js';
import { CreatePartnerDto, UpdatePartnerDto, QueryPartnerDto } from '../dtos/partner.dto.js';
import {
  sendSuccess,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const partnerRepository = new PartnerRepository(Partner);
const partnerService = new PartnerService(partnerRepository);

export const getAllPartners = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryPartnerDto = req.query as unknown as QueryPartnerDto;
    const result = await partnerService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getPartnerById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const partner = await partnerService.findById(id);

    sendSuccess(res, partner, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedPartners = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const partners = await partnerService.findFeatured();

    sendSuccess(res, partners, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createPartner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreatePartnerDto = req.body;
    const partner = await partnerService.create(dto);

    sendCreated(res, partner, ResponseMessages.CREATED);
  } catch (error) {
    next(error);
  }
};

export const updatePartner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdatePartnerDto = req.body;
    const partner = await partnerService.update(id, dto);

    sendUpdated(res, partner, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deletePartner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await partnerService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};