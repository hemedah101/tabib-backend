import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModelVm } from 'src/core/models';

@ObjectType()
export class TokenVm extends BaseModelVm {
  @Field()
  token: string;
}
