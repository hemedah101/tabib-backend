import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards';
import { JWTPayload } from './jwt-payload.interface';
import { LoginVm } from 'src/user/view-models/login-vm.model';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginVm)
  async refreshToken(@Context() ctx: any): Promise<LoginVm> {
    const { token, user } = await this.authService.refreshToken(ctx);
    return new LoginVm({ token, user });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logoutAll(@CurrentUser() currentUser: JWTPayload): Promise<boolean> {
    await this.authService.forceLogOut(currentUser.userId);
    return true;
  }
}
