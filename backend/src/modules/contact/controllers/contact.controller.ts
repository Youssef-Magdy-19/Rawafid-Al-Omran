import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contact.service.js';
import { ContactRepository } from '../repositories/contact.repository.js';
import { Contact } from '../models/contact.model.js';
import { CreateContactDto, UpdateContactDto, QueryContactDto } from '../dtos/contact.dto.js';
import {
  sendCreated,
  sendUpdated,
  sendDeleted,
  sendPaginated,
  buildPaginationMeta,
  ResponseMessages
} from '../../../utils/apiResponse.js';

const contactRepository = new ContactRepository(Contact);
const contactService = new ContactService(contactRepository);

export const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: QueryContactDto = req.query as unknown as QueryContactDto;
    const result = await contactService.findAll(query);

    const page = query.page || 1;
    const limit = query.limit || 10;
    const pagination = buildPaginationMeta(page, limit, result.total);

    sendPaginated(res, result.data, pagination, ResponseMessages.FETCHED);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto: CreateContactDto = req.body;
    const contact = await contactService.create(dto);

    sendCreated(res, contact, ResponseMessages.CREATED);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdateContactDto = req.body;
    const contact = await contactService.update(id, dto);

    sendUpdated(res, contact, ResponseMessages.UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await contactService.delete(id);

    sendDeleted(res, ResponseMessages.DELETED);
  } catch (error) {
    next(error);
  }
};