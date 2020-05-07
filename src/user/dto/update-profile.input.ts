import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { GenderEnum } from '../enums/gender.enum';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @Field(() => GenderEnum, { nullable: true })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar?: string;
}
