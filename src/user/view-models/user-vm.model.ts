import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { BaseModelVm } from 'src/core/models';

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
  gender: string;

  @Field()
  dateOfBirth: string;

  @Field()
  verified: boolean;

  @Field()
  reviewed: boolean;

  @Field({ nullable: true })
  avatar?: string;

  @Exclude()
  hash;
}
