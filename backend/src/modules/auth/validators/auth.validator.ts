import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ValidationError } from '../../../errors/AppError.js';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate = (schema: Joi.ObjectSchema, target: ValidationTarget = 'body') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const dataToValidate = req[target];
    
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      next(new ValidationError('Validation failed', details));
      return;
    }

    // Replace with validated and sanitized data
    req[target] = value;
    next();
  };
};

export const validateBody = (schema: Joi.ObjectSchema) => validate(schema, 'body');
export const validateQuery = (schema: Joi.ObjectSchema) => validate(schema, 'query');
export const validateParams = (schema: Joi.ObjectSchema) => validate(schema, 'params');