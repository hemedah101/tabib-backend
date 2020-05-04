import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ConflictError } from 'src/core/errors';
import { BaseService } from 'src/core/shared';
import { generateHashedPassword } from 'src/core/utils';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) readonly userModel: ModelType<User>,
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
}
