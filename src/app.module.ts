import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { OgmaModule } from '@ogma/nestjs-module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import {
  ConfigModuleConfig,
  GqlModuleConfig,
  MongooseModuleConfig,
  OgmaModuleConfig,
} from './config/options';
import { CoreModule } from './core/core.module';
import { HealthController } from './health.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRootAsync(ConfigModule, {
      useClass: ConfigModuleConfig,
    }),
    OgmaModule.forRootAsync({
      useClass: OgmaModuleConfig,
      imports: [ConfigModule.Deferred],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseModuleConfig,
      imports: [ConfigModule.Deferred],
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlModuleConfig,
    }),
    TerminusModule,
    AuthModule,
    UserModule,
    CoreModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
