import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: false })
  @IsOptional()
  @IsString()
  name?: string;

  // @Field({ nullable: false })
  // @IsOptional()
  // @IsDateString()
  // dateOfBirth?: string;

  // @Field(() => Gender, { nullable: false })
  // @IsOptional()
  // @IsEnum(Gender)
  // gender?: Gender;

  // @Field({ nullable: false })
  // @IsOptional()
  // @IsNotEmpty()
  // @IsString()
  // avatar?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @IsBoolean()
  // verified?: boolean;

  // @Field(() => ReviewStatus, { nullable: false })
  // @IsOptional()
  // @IsEnum(ReviewStatus)
  // review?: ReviewStatus;
}
