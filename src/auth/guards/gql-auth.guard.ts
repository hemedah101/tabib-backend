import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedError } from 'src/core/errors';
import { AuthService } from '../auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = this.extractToken(ctx);
    if (!token) {
      throw new UnauthorizedError();
    }

    const decoded = this.authService.validateToken(token);
    console.log({ decoded });
    ctx.meta.user = decoded;
    return true;
  }

  private extractToken(ctx: any): string {
    const { req } = ctx;
    if (req && req.headers && req.headers.authorization) {
      return req.headers.authorization.replace('Bearer ', '');
    } else if (req.query) {
      return req.query.token;
    } else {
      return undefined;
    }
  }
}
