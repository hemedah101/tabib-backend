import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundError } from 'src/core/errors/graphql.error';
import { NewUserInput } from './dto/new-user.input';
import { UserService } from './user.service';
import { UserVm } from './view-models/user-vm.model';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => UserVm)
  async signup(@Args('input') input: NewUserInput): Promise<UserVm> {
    const user = await this.userService.createUser(input);
    return new UserVm(user);
  }

  @Query((returns) => UserVm)
  async user(@Args('id') id: string): Promise<UserVm> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }
    return new UserVm(user);
  }
}
