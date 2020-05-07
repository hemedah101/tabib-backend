import { HideField, ObjectType } from '@nestjs/graphql';
import { IBaseModel } from './base.model';

@ObjectType()
export abstract class BaseModelVm implements IBaseModel {
  @HideField()
  id?;
  @HideField()
  createdAt?;
  @HideField()
  updatedAt?;
  @HideField()
  __v?;

  constructor(partial: Partial<any>) {
    if (partial.toJSON) {
      Object.assign(this, partial.toObject());
    } else {
      Object.assign(this, partial);
    }
  }
}
