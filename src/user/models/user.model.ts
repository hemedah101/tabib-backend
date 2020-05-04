import { getModelForClass, prop } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseModel, schemaOptions } from 'src/core/models';
import { Gender } from '../enums/gender.enum';

export class User extends BaseModel {
  @prop()
  name: string;
  @prop({ index: true })
  email: string;
  @prop()
  hash: string;
  @prop({ enum: Gender })
  gender: string;
  @prop()
  dateOfBirth: string;
  @prop()
  avatar?: string;
  @prop({ default: false })
  verified: boolean;
  @prop({ default: false })
  reviewed: boolean;

  static get model(): ModelType<User> {
    return getModelForClass(User, { schemaOptions });
  }
  static get modelName(): string {
    return this.model.modelName;
  }
}
