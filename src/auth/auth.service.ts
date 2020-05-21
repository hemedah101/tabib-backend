import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { ConfigService } from 'src/config/config.service';
import { UnauthorizedError } from 'src/core/errors';
import { generateRandomAlphanumericString } from 'src/core/utils/code-generator.util';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  createAccessToken(user: DocumentType<User>): string {
    const { _id, verified, review, role, gender } = user;
    const userId = (_id as Types.ObjectId).toHexString();
    const payload = { userId, verified, review, role, gender } as JWTPayload;
    const secret = this.configService.jwtSecret;
    const expiresIn = this.configService.jwtExpiresIn;

    return sign(payload, secret, { expiresIn });
  }

  createRefreshToken(user: DocumentType<User>): string {
    const { _id } = user;
    const userId = (_id as Types.ObjectId).toHexString();
    const tokenLength = this.configService.tokenLength;
    const code = generateRandomAlphanumericString(tokenLength);
    return code + userId;
  }

  validateToken(token: string): JWTPayload {
    try {
      const secret = this.configService.jwtSecret;
      return verify(token, secret) as JWTPayload;
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  async refreshToken(
    ctx: any,
  ): Promise<{ token: string; user: DocumentType<User> }> {
    const { req } = ctx;
    const refreshToken = req.cookies.jid as string;
    if (!refreshToken) {
      throw new UnauthorizedError();
    }

    const tokenLength = this.configService.tokenLength;
    const id = refreshToken.slice(tokenLength);
    const user = await this.userService.findById(id, {
      refreshToken: 1,
      verified: 1,
      review: 1,
      role: 1,
      gender: 1,
      name: 1,
      avatar: 1,
      relationship: 1,
      job: 1,
    });
    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedError();
    }
    console.log(user);
    const token = this.createAccessToken(user);
    return { token, user };
  }

  async forceLogOut(id: string): Promise<void> {
    const user = await this.userService.findById(id);
    const refreshToken = this.createRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
  }
}
