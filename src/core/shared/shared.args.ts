import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class KeyValuePairInput {
  @Field()
  key: string;

  @Field({ nullable: true })
  value?: string;
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  limit?: number = 10;

  @Field(() => [KeyValuePairInput], { nullable: true })
  @IsOptional()
  filter?: KeyValuePairInput[] = [];
}
