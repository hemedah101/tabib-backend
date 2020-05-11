import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @Transform((val: string) => val.trim().toLowerCase())
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
