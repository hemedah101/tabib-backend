import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'src/config/config.module';
import { PassportModuleConfig } from 'src/config/options';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule.Deferred,
    PassportModule.registerAsync({
      useClass: PassportModuleConfig,
    }),
  ],
  providers: [AuthService, AuthResolver, GoogleStrategy, FacebookStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
