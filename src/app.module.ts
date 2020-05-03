import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ApiConfigService } from './config/config.service';
import expressConfig from './config/express.config';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [expressConfig], isGlobal: true }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [ApiConfigService],
})
export class AppModule {}
