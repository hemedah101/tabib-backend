import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { ReviewStatus } from '../enums/review.enum';
import { UpdateProfileInput } from './update-profile.input';
import { GenderEnum } from '../enums/gender.enum';

@InputType()
export class UpdateUserInput extends PartialType(UpdateProfileInput) {
  @Field()
  @IsMongoId()
  id: string;

  @Field(() => ReviewStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ReviewStatus)
  review?: ReviewStatus;
}
