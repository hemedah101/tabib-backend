import { Injectable } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { ConfigService } from 'src/config/config.service';
import { UnauthorizedError } from 'src/core/errors';
import { User } from 'src/user/models/user.model';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
  ) // private readonly userService: UserService,
  {}

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
    const payload = { userId, tokenVersion: tokenVersion + 1 } as JWTPayload;
    const secret = this.configService.jwtSecret;

    return sign(payload, secret);
  }

  validateToken(token: string): JWTPayload {
    try {
      const secret = this.configService.jwtSecret;
      return verify(token, secret) as JWTPayload;
    } catch (error) {
      if (error.message === 'jwt expired') {
        // token is valid but expired. should issue
        console.log('TODO: send a new token here');
      }
      throw new UnauthorizedError();
    }
  }
}
