import { Request, Response, NextFunction } from 'express';
import { QuoteService } from '../services/quote.service.js';
import { QuoteRepository } from '../repositories/quote.repository.js';
import { Quote } from '../models/quote.model.js';
import { CreateQuoteDto, UpdateQuoteDto, QueryQuoteDto } from '../dtos/quote.dto.js';
import {
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const quoteRepository = new QuoteRepository(Quote);
const quoteService = new QuoteService(quoteRepository);

export const getAllQuotes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryQuoteDto = req.query as unknown as QueryQuoteDto;
    const result = await quoteService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreateQuoteDto = req.body;
    const quote = await quoteService.create(dto);

    sendCreated(res, quote, ResponseMessages.CREATED);
  } catch (error) {
    next(error);
  }
};

export const updateQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdateQuoteDto = req.body;
    const quote = await quoteService.update(id, dto);

    sendUpdated(res, quote, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await quoteService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};