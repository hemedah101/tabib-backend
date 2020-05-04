import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DocumentType } from '@typegoose/typegoose';
import { Transform } from 'class-transformer';
import { BaseModelVm } from 'src/core/models';
import { User } from '../models/user.model';
import { UserVm } from './user-vm.model';

@ObjectType()
export class UsersVm extends BaseModelVm {
  @Field(() => [UserVm])
  @Transform((val: DocumentType<User>[]) => val.map((user) => new UserVm(user)))
  items: UserVm[];

  @Field(() => Int)
  total: number;
}
