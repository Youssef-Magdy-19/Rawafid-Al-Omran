import { Request, Response, NextFunction } from 'express';
import { FaqService } from '../services/faq.service.js';
import { FaqRepository } from '../repositories/faq.repository.js';
import { Faq } from '../models/faq.model.js';
import { CreateFaqDto, UpdateFaqDto, QueryFaqDto } from '../dtos/faq.dto.js';
import {
  sendSuccess,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const faqRepository = new FaqRepository(Faq);
const faqService = new FaqService(faqRepository);

export const getAllFaqs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryFaqDto = req.query as unknown as QueryFaqDto;
    const result = await faqService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getFaqById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const faq = await faqService.findById(id);

    sendSuccess(res, faq, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getActiveFaqs = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const faqs = await faqService.findActive();

    sendSuccess(res, faqs, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreateFaqDto = req.body;
    const faq = await faqService.create(dto);

    sendCreated(res, faq, ResponseMessages.CREATED);
  } catch (error) {
    next(error);
  }
};

export const updateFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdateFaqDto = req.body;
    const faq = await faqService.update(id, dto);

    sendUpdated(res, faq, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await faqService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};