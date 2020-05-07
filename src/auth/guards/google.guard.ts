import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  constructor(readonly config: ConfigService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    // added to be able to extend the authentication logic if need be
    const result = (await super.canActivate(context)) as boolean;
    const request = this.getRequest(context);
    const response = this.getResponse(context);

    const maxAge = this.config.cookieMaxAge;
    const refreshToken = request.user.user.refreshToken;
    response.cookie('jid', refreshToken, {
      maxAge,
      httpOnly: true,
    });
    return result;
  }

  getResponse(context: ExecutionContext) {
    return context.switchToHttp().getResponse();
  }
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
