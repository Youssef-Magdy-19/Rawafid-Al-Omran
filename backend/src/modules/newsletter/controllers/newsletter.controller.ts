import { Request, Response, NextFunction } from 'express';
import { NewsletterService } from '../services/newsletter.service.js';
import { NewsletterRepository } from '../repositories/newsletter.repository.js';
import { Newsletter } from '../models/newsletter.model.js';
import { CreateNewsletterDto, UpdateNewsletterDto, QueryNewsletterDto } from '../dtos/newsletter.dto.js';
import {
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const newsletterRepository = new NewsletterRepository(Newsletter);
const newsletterService = new NewsletterService(newsletterRepository);

export const getAllNewsletters = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryNewsletterDto = req.query as unknown as QueryNewsletterDto;
    const result = await newsletterService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreateNewsletterDto = req.body;
    const newsletter = await newsletterService.create(dto);

    sendCreated(res, newsletter, ResponseMessages.SUBSCRIBED);
  } catch (error) {
    next(error);
  }
};

export const updateNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdateNewsletterDto = req.body;
    const newsletter = await newsletterService.update(id, dto);

    sendUpdated(res, newsletter, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await newsletterService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};