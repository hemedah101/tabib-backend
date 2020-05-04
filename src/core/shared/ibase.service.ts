import { DocumentType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { PaginationInput } from '.';

export interface IBaseService<T> {
  create(model: any): Promise<DocumentType<T>>;

  findById(id: string): Promise<DocumentType<T>>;
  findOne(filter: any): Promise<DocumentType<T>>;
  findMany(input: PaginationInput): Promise<IPagination<T>>;

  updateById(id: string, updates: any): Promise<DocumentType<T>>;
  updateOne(filter: any, updates: any): Promise<DocumentType<T>>;

  delete(id: string): Promise<DocumentType<T>>;

  count(filter: any): Promise<Number>;
  toObjectId(id: string): Types.ObjectId;
}

export interface IPagination<T> {
  items: T[];
  total?: number;
}
