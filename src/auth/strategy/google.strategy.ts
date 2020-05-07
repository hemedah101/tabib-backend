import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/user/user.service';
import { GoogleSub } from '../interfaces/google.payload';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.googleClient,
      clientSecret: configService.googleSecret,
      callbackURL: configService.googleCallback,
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: GoogleSub,
  ) {
    return await this.userService.validateOrCreateUser(profile);
  }
}
