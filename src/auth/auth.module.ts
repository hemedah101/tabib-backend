import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule.Deferred, UserModule],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
