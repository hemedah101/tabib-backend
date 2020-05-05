import { getModelForClass, prop } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseModel, schemaOptions } from 'src/core/models';
import { Gender } from '../enums/gender.enum';
import { ReviewStatus } from '../enums/review.enum';

export class User extends BaseModel {
  @prop()
  name: string;
  @prop({ index: true })
  email: string;
  @prop()
  hash: string;
  @prop({ enum: Gender })
  gender: Gender;
  @prop()
  dateOfBirth: string;
  @prop()
  avatar: string;
  @prop({ default: false })
  verified: boolean;
  @prop({ enum: ReviewStatus, default: ReviewStatus.PENDING })
  review: ReviewStatus;
  // @prop()
  // refreshToken: string;
  @prop({ default: 0 })
  tokenVersion: number;

  static get model(): ModelType<User> {
    return getModelForClass(User, { schemaOptions });
  }
  static get modelName(): string {
    return this.model.modelName;
  }
}
