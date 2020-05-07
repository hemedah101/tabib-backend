import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Exclude, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { BaseModelVm } from 'src/core/models';
import { GenderEnum } from '../enums/gender.enum';
import { ReviewStatus } from '../enums/review.enum';
import { RolesEnum } from '../enums/roles.enum';

@ObjectType()
export class UserVm extends BaseModelVm {
  @Field()
  @Transform((val: Types.ObjectId) => val.toHexString())
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  dateOfBirth: string;

  @Field()
  verified: boolean;

  @Field(() => ReviewStatus)
  review: ReviewStatus;

  @Field(() => GenderEnum)
  gender: GenderEnum;

  @Field(() => RolesEnum)
  role: RolesEnum;

  @Field()
  avatar?: string;

  @HideField()
  @Exclude()
  hash;
  @HideField()
  @Exclude()
  refreshToken;
  @HideField()
  @Exclude()
  thirdPartyId;
}
