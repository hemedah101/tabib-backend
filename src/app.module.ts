import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { OgmaModule } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import { ApiConfigService } from './config/config.service';
import expressConfig from './config/express.config';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [expressConfig], isGlobal: true }),
    OgmaModule.forRoot({
      service: {
        logLevel: 'ALL',
        color: true,
        json: false,
        application: 'Tabib',
      },
      interceptor: {
        http: ExpressParser,
        ws: false,
        gql: false,
        rpc: false,
      },
    }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [ApiConfigService],
})
export class AppModule {}
