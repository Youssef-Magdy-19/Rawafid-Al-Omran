import { Request, Response, NextFunction } from 'express';
import { TestimonialService } from '../services/testimonial.service.js';
import { TestimonialRepository } from '../repositories/testimonial.repository.js';
import { Testimonial } from '../models/testimonial.model.js';
import { CreateTestimonialDto, UpdateTestimonialDto, QueryTestimonialDto } from '../dtos/testimonial.dto.js';
import {
  sendSuccess,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const testimonialRepository = new TestimonialRepository(Testimonial);
const testimonialService = new TestimonialService(testimonialRepository);

export const getAllTestimonials = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryTestimonialDto = req.query as unknown as QueryTestimonialDto;
    const result = await testimonialService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getTestimonialById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const testimonial = await testimonialService.findById(id);

    sendSuccess(res, testimonial, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreateTestimonialDto = req.body;
    const testimonial = await testimonialService.create(dto);

    sendCreated(res, testimonial, ResponseMessages.CREATED);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdateTestimonialDto = req.body;
    const testimonial = await testimonialService.update(id, dto);

    sendUpdated(res, testimonial, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await testimonialService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};