import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { BaseModelVm } from 'src/core/models';
import { Gender } from '../enums/gender.enum';
import { ReviewStatus } from '../enums/review.enum';

@ObjectType()
export class UserVm extends BaseModelVm {
  @Field()
  @Transform((val: Types.ObjectId) => val.toHexString())
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Gender)
  gender: Gender;

  @Field()
  dateOfBirth: string;

  @Field()
  verified: boolean;

  @Field(() => ReviewStatus)
  review: ReviewStatus;

  @Field()
  avatar?: string;

  @HideField()
  hash;
  @HideField()
  refreshToken;
  @HideField()
  tokenVersion;
}
