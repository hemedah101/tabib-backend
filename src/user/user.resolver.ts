import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards';
import { JWTPayload } from 'src/auth/jwt-payload.interface';
import { NotFoundError } from 'src/core/errors/graphql.error';
import { PaginationInput } from 'src/core/shared';
import { CurrentUser } from './decorators/user.decorator';
import { LoginInput } from './dto/login-user.input';
import { NewUserInput } from './dto/new-user.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UpdateUserInput } from './dto/update-user.input';
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
  async login(
    @Args('input') input: LoginInput,
    @Context() ctx: any,
  ): Promise<LoginVm> {
    const { res } = ctx;
    const user = await this.userService.loginUser(input, res);
    return new LoginVm({ ...user });
  }

  @Mutation(() => UserVm)
  @UseGuards(GqlAuthGuard)
  async updateProfile(
    @CurrentUser() currentUser: JWTPayload,
    @Args('input') input: UpdateProfileInput,
  ) {
    const id = currentUser.userId;
    const user = await this.userService.updateById(id, input);
    return new UserVm(user);
  }

  @Mutation(() => UserVm)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('input') input: UpdateUserInput) {
    const { id, ...updates } = input;
    const user = await this.userService.updateById(id, updates);
    return new UserVm(user);
  }

  @Query(() => UserVm)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() currentUser: JWTPayload): Promise<UserVm> {
    const id = currentUser.userId;
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }
    return new UserVm(user);
  }

  @Query(() => UserVm)
  async user(@Args('id') id: string): Promise<UserVm> {
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
