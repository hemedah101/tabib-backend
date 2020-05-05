import { Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenVm } from './view-models/token-vm.model';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => TokenVm)
  async refreshToken(@Context() ctx: any) {
    const token = await this.authService.refreshToken(ctx);
    return new TokenVm({ token });
  }
}
