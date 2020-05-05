import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthService } from 'src/auth/auth.service';
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
    const isMatch = await validPassword(password, user.hash);
    if (!isMatch) {
      throw new BadRequestError('Invalid Email or Password');
    }

    // Create new refresh token
    const refreshToken = this.authService.createRefreshToken(user);
    const maxAge = this.configService.cookieMaxAge;
    res.cookie('jid', refreshToken, { maxAge, httpOnly: true });

    const token = this.authService.createAccessToken(user);
    return { token, user };
  }
}
