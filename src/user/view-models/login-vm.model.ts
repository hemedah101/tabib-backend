import { Field, ObjectType } from '@nestjs/graphql';
import { DocumentType } from '@typegoose/typegoose';
import { Transform } from 'class-transformer';
import { BaseModelVm } from 'src/core/models';
import { User } from '../models/user.model';
import { UserVm } from './user-vm.model';

@ObjectType()
export class LoginVm extends BaseModelVm {
  @Field()
  token: string;

  @Field(() => UserVm)
  @Transform((val: DocumentType<User>) => new UserVm(val))
  user: UserVm;
}
