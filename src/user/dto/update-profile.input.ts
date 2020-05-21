import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { RelationshipEnum } from '../enums/relationship.enum';
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

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  job?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(RelationshipEnum)
  relationship?: RelationshipEnum;
}
