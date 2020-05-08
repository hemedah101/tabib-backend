import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthService } from 'src/auth/auth.service';
import { FacebookSub } from 'src/auth/interfaces/facebook.payload';
import { GoogleSub } from 'src/auth/interfaces/google.payload';
import { ConfigService } from 'src/config/config.service';
import { BadRequestError, ConflictError, NotFoundError } from 'src/core/errors';
import { BaseService } from 'src/core/shared';
import { generateHashedPassword, validPassword } from 'src/core/utils';
import { LoginInput } from './dto/login-user.input';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) readonly userModel: ModelType<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super(userModel);
  }

  async createUser(input: NewUserInput): Promise<DocumentType<User>> {
    const { email, password, ...rest } = input;
    const exist = await this.model.exists({ email });
    if (exist) {
      throw new ConflictError('User with this email already exists');
    }

    const hash = await generateHashedPassword(password);
    const user = await this.model.create({ email, hash, ...rest });

    return user;
  }

  async loginUser(
    input: LoginInput,
    res: any,
  ): Promise<{ token: string; user: DocumentType<User> }> {
    // Validate email
    const { email, password } = input;
    const user = await this.model.findOne({ email });
    if (!user) {
      throw new NotFoundError('User');
    }

    // Validate password
    if (!(await validPassword(password, user.hash))) {
      throw new BadRequestError('Invalid Email or Password');
    }

    // Create new refresh token
    const refreshToken = this.authService.createRefreshToken(user);
    const maxAge = this.configService.cookieMaxAge;
    res.cookie('jid', refreshToken, { maxAge, httpOnly: true });
    user.refreshToken = refreshToken;
    await user.save();

    const token = this.authService.createAccessToken(user);
    return { token, user };
  }

  async findOrCreateGoogleUser(
    profile: GoogleSub,
  ): Promise<{ token: string; user: DocumentType<User> }> {
    const {
      id,
      displayName,
      _json: { email, email_verified, picture },
    } = profile;

    let user: DocumentType<User> = null;
    const exist = await this.model.findOne({
      $or: [{ email }, { thirdPartyId: id }],
    });

    if (exist) {
      user = exist;
      if (user.email === email && !user.thirdPartyId.includes(id)) {
        user.thirdPartyId.push(id);
      }
    } else {
      user = await this.create({
        email,
        verified: email_verified,
        name: displayName,
        thirdPartyId: [id],
        avatar: picture,
      });
    }

    const token = this.authService.createAccessToken(user);
    const refreshToken = this.authService.createRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    return { token, user };
  }

  async findOrCreateFacebookUser(
    profile: FacebookSub,
  ): Promise<{ token: string; user: DocumentType<User> }> {
    const { id, displayName, photos } = profile;
    const avatar = photos[0].value;
    const email = `${id}@facebook.com`;

    let user: DocumentType<User> = null;
    const exist = await this.model.findOne({ thirdPartyId: id });

    if (exist) {
      user = exist;
    } else {
      user = await this.create({
        email,
        verified: true,
        name: displayName,
        thirdPartyId: [id],
        avatar,
      });
    }

    const token = this.authService.createAccessToken(user);
    const refreshToken = this.authService.createRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    return { token, user };
  }
}
