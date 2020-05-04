import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';

@InputType()
export class NewUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field()
  @IsDateString()
  dateOfBirth: string;

  @Field()
  @IsEnum(Gender)
  gender: Gender;
}
