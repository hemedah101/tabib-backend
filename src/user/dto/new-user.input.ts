import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { GenderEnum } from '../enums/gender.enum';
import { Transform } from 'class-transformer';

@InputType()
export class NewUserInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @Transform((val: string) => val.trim().toLowerCase())
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsDateString()
  dateOfBirth: string;

  @Field(() => GenderEnum)
  @IsEnum(GenderEnum)
  gender: GenderEnum;
}
