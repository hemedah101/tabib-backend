import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards';
import { NotFoundError } from 'src/core/errors/graphql.error';
import { PaginationInput } from 'src/core/shared';
import { LoginInput } from './dto/login-user.input';
import { NewUserInput } from './dto/new-user.input';
import { UserService } from './user.service';
import { LoginVm } from './view-models/login-vm.model';
import { UserVm } from './view-models/user-vm.model';
import { UsersVm } from './view-models/users-vm.model';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserVm)
  async signup(@Args('input') input: NewUserInput): Promise<UserVm> {
    const user = await this.userService.createUser(input);
    return new UserVm(user);
  }

  @Mutation(() => LoginVm)
  async login(@Args('input') input: LoginInput) {
    const user = await this.userService.loginUser(input);
    return new LoginVm({ ...user });
  }

  // @Mutation(() => UserVm)
  // async updateProfile(@Args('input') input: UpdateUserInput) {
  //   const user = await this.userService.updateById()
  // }

  @Query(() => UserVm)
  @UseGuards(GqlAuthGuard)
  async user(
    @Args('id') id: string,
    // @User() users: JWTPayload,
  ): Promise<UserVm> {
    // console.log({ users });
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }
    return new UserVm(user);
  }

  @Query(() => UsersVm)
  async users(
    @Args('input', { nullable: true }) input?: PaginationInput,
  ): Promise<UsersVm> {
    const users = await this.userService.findMany(input);
    return new UsersVm({ ...users });
  }
}
