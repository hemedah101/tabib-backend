import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { ValidationError } from '../errors';
import { BaseModel } from '../models';
import { IBaseService } from './ibase.service';

export class BaseService<T extends BaseModel> implements IBaseService<T> {
  constructor(protected model: ModelType<T>) {}

  toObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new ValidationError('Invalid ObjectID');
    }
    return Types.ObjectId(id);
  }

  async create(model: any): Promise<DocumentType<T>> {
    return await this.model.create(model);
  }

  async findById(id: string): Promise<DocumentType<T>> {
    return await this.model.findById(this.toObjectId(id)).exec();
  }

  async findOne(filter: any): Promise<DocumentType<T>> {
    return await this.model.findOne(filter).exec();
  }

  // async findMany(
  //   filter: any,
  //   page?: number,
  //   size?: number,
  // ): Promise<IPagination<T>> {
  //   // No pagination
  //   if (!page && !size) {
  //     const items = await this.model.find(filter);
  //     return { items };
  //   }

  //   // Pagination
  //   const defaultSize = size ? size : 10;
  //   const total = await this.count(filter);
  //   const items = await this.model
  //     .find(filter)
  //     .limit(defaultSize)
  //     .skip(Math.abs(page - 1) * defaultSize)
  //     .exec();

  //   return { items, total: Math.ceil(total / defaultSize) };
  // }

  async count(filter: any): Promise<number> {
    return await this.model.countDocuments(filter).exec();
  }

  async updateById(id: string, updates: any): Promise<DocumentType<T>> {
    return await this.model
      .findByIdAndUpdate(this.toObjectId(id), updates, { new: true })
      .exec();
  }

  async updateOne(filter: any, updates: any): Promise<DocumentType<T>> {
    return await this.model
      .findOneAndUpdate(filter, updates, { new: true })
      .exec();
  }

  async delete(id: string): Promise<DocumentType<T>> {
    return await this.model.findByIdAndDelete(this.toObjectId(id)).exec();
  }
}
