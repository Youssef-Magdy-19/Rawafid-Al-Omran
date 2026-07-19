import { Request, Response, NextFunction } from 'express';
import { BlogService } from '../services/blog.service.js';
import { BlogRepository } from '../repositories/blog.repository.js';
import { Blog } from '../models/blog.model.js';
import { CreateBlogDto, UpdateBlogDto, QueryBlogDto } from '../dtos/blog.dto.js';
import {
  sendSuccess,
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const blogRepository = new BlogRepository(Blog);
const blogService = new BlogService(blogRepository);

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryBlogDto = req.query as unknown as QueryBlogDto;
    const result = await blogService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;
    const blog = await blogService.findBySlug(slug);

    sendSuccess(res, blog, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreateBlogDto = req.body;
    const blog = await blogService.create(dto);

    sendCreated(res, blog, ResponseMessages.CREATED);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdateBlogDto = req.body;
    const blog = await blogService.update(id, dto);

    sendUpdated(res, blog, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await blogService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};