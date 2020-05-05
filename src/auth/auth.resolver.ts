import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards';
import { JWTPayload } from './jwt-payload.interface';
import { TokenVm } from './view-models/token-vm.model';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenVm)
  async refreshToken(@Context() ctx: any): Promise<TokenVm> {
    const token = await this.authService.refreshToken(ctx);
    return new TokenVm({ token });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logoutAll(@CurrentUser() currentUser: JWTPayload): Promise<boolean> {
    await this.authService.forceLogOut(currentUser.userId);
    return true;
  }
}
