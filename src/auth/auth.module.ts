import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'src/config/config.module';
import { PassportModuleConfig } from 'src/config/options';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    ConfigModule.Deferred,
    PassportModule.registerAsync({
      useClass: PassportModuleConfig,
    }),
  ],
  providers: [AuthService, AuthResolver, GoogleStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
