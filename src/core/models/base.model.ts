import { prop } from '@typegoose/typegoose';
import { SchemaOptions } from 'mongoose';

export abstract class BaseModel implements IBaseModel {
  @prop()
  id?: string;
  @prop()
  createdAt?: Date;
  @prop()
  updatedAt?: Date;
}

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
};

export interface IBaseModel {
  readonly id?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
