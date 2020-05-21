import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { ValidationError } from '../errors';
import { BaseModel } from '../models';
import { ExtractMongoFilter } from '../utils';
import { IBaseService, IPagination } from './ibase.service';
import { PaginationInput } from './shared.args';

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

  async findById(id: string, projection = {}): Promise<DocumentType<T>> {
    return await this.model.findById(this.toObjectId(id), projection).exec();
  }

  async findOne(filter: any): Promise<DocumentType<T>> {
    return await this.model.findOne(filter).exec();
  }

  async findMany(input?: PaginationInput): Promise<IPagination<T>> {
    const { filter, page, limit } = input;

    const mongoFilter = ExtractMongoFilter(filter);
    console.log({ mongoFilter });
    const total = await this.count(mongoFilter);
    const items = await this.model
      .find(mongoFilter)
      .skip(Math.abs(page - 1) * limit)
      .limit(limit)
      .exec();

    return { items, total: Math.ceil(total / limit) };
  }

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
