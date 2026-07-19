import mongoose, { Schema, Document, Model } from 'mongoose';
import { LocalizedField } from '../types/index.js';

// Base document interface
export interface IBaseDocument extends Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  isActive: boolean;
}

// Localized string schema
export const localizedStringSchema = new Schema<LocalizedField<string>>(
  {
    en: { type: String, default: null },
    ar: { type: String, default: null }
  },
  { _id: false }
);

// Base schema with common fields
export const baseSchema = new Schema(
  {
    isDeleted: {
      type: Boolean,
      default: false,
      select: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { __v, isDeleted, ...rest } = ret;
        return rest;
      }
    }
  }
);

// Base model class
export abstract class BaseModel<T extends IBaseDocument> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id, isDeleted: false });
  }

  async findAll(query: Record<string, unknown> = {}): Promise<T[]> {
    return this.model.find({ ...query, isDeleted: false });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true, runValidators: true }
    );
  }

  async softDelete(id: string): Promise<T | null> {
    return this.model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
  }

  async hardDelete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ _id: id });
  }

  async count(query: Record<string, unknown> = {}): Promise<number> {
    return this.model.countDocuments({ ...query, isDeleted: false });
  }
}