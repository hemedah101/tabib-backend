import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { OgmaModule } from '@ogma/nestjs-module';
import * as mongoose from 'mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigModuleConfig, OgmaModuleConfig } from './config/options';
import { HealthController } from './health.controller';

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

@Module({
  imports: [
    ConfigModule.forRootAsync(ConfigModule, {
      useClass: ConfigModuleConfig,
    }),
    OgmaModule.forRootAsync({
      useClass: OgmaModuleConfig,
      imports: [ConfigModule.Deferred],
    }),
    TerminusModule,
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ApiConfigService],
    //   useClass: MongooseConfigService,
    //   useExisting: ApiConfigService,
    // }),
    // MongooseModule.forRoot(
    //   'mongodb+srv://admin:7HKR7CY4JUv5tAcG@cluster0-ldglu.mongodb.net/tabib?retryWrites=true&w=majority',
    // ),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (config: ApiConfigService) => ({
    //     uri: config.databaseURI,
    //   }),
    //   inject: [ApiConfigService],
    // }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
