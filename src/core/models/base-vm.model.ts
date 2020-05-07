import { HideField, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IBaseModel } from './base.model';

@ObjectType()
export abstract class BaseModelVm implements IBaseModel {
  @HideField()
  @Exclude()
  id?;
  @HideField()
  @Exclude()
  createdAt?;
  @HideField()
  @Exclude()
  updatedAt?;
  @HideField()
  @Exclude()
  __v?;

  constructor(partial: Partial<any>) {
    if (partial.toJSON) {
      Object.assign(this, partial.toObject());
    } else {
      Object.assign(this, partial);
    }
  }
}
