import { getModelForClass, prop } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseModel, schemaOptions } from 'src/core/models';
import { GenderEnum } from '../enums/gender.enum';
import { ReviewStatus } from '../enums/review.enum';
import { RolesEnum } from '../enums/roles.enum';

export class User extends BaseModel {
  @prop()
  name: string;
  @prop({ index: true })
  email: string;
  @prop()
  hash: string;
  @prop()
  dateOfBirth: string;
  @prop({
    default:
      'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  })
  avatar: string;
  @prop({ enum: GenderEnum, default: '' })
  gender: GenderEnum;
  @prop({ enum: RolesEnum, default: RolesEnum.USER })
  role: RolesEnum;
  @prop({ default: false })
  verified: boolean;
  @prop({ enum: ReviewStatus, default: ReviewStatus.PENDING })
  review: ReviewStatus;
  @prop()
  refreshToken: string;
  @prop()
  thirdPartyId: string[];

  static get model(): ModelType<User> {
    return getModelForClass(User, { schemaOptions });
  }
  static get modelName(): string {
    return this.model.modelName;
  }
}
