import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/user/user.service';
import { FacebookSub } from '../interfaces/facebook.payload';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: config.facebookClient,
      clientSecret: config.facebookSecret,
      callbackURL: config.facebookCallback,
      profileFields: ['id', 'email', 'displayName', 'photos', 'gender'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: FacebookSub,
    done: Function,
  ) {
    return await this.userService.findOrCreateFacebookUser(profile);
  }
}
