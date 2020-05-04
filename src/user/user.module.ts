import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.modelName, schema: User.model.schema },
    ]),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
