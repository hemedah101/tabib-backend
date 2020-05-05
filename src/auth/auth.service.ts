import { Injectable } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { ConfigService } from 'src/config/config.service';
import { UnauthorizedError } from 'src/core/errors';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  createAccessToken(user: DocumentType<User>): string {
    const { _id, verified, review } = user;
    const userId = (_id as Types.ObjectId).toHexString();
    const payload = { userId, verified, review } as JWTPayload;
    const secret = this.configService.jwtSecret;
    const expiresIn = this.configService.jwtExpiresIn;

    return sign(payload, secret, { expiresIn });
  }

  createRefreshToken(user: DocumentType<User>): string {
    const { _id, tokenVersion } = user;
    const userId = (_id as Types.ObjectId).toHexString();
    const payload = { userId, version: tokenVersion } as JWTPayload;
    const secret = this.configService.jwtSecret;

    return sign(payload, secret);
  }

  validateToken(token: string): JWTPayload {
    try {
      const secret = this.configService.jwtSecret;
      return verify(token, secret) as JWTPayload;
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  async refreshToken(ctx: any) {
    const { req, res } = ctx;
    const refreshToken = req.cookies.jid;
    const decoded = this.validateToken(refreshToken);
    const { userId, version } = decoded;

    const user = await this.userService.findById(userId);
    if (user.tokenVersion !== version) {
      throw new UnauthorizedError();
    }

    const newRefreshToken = this.createRefreshToken(user);
    res.cookie('jid', newRefreshToken, {
      maxAge: this.configService.cookieMaxAge,
      httpOnly: true,
    });

    const token = this.createAccessToken(user);
    return token;
  }
}
