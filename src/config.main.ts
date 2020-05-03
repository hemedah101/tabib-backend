import { INestApplication, ValidationPipe } from '@nestjs/common';
import { OgmaService } from '@ogma/nestjs-module';
import * as compression from 'compression';
import * as rateLimiter from 'express-rate-limit';
import * as helmet from 'helmet';
import { ConfigService } from './config/config.service';

export function configure(
  app: INestApplication,
  config: ConfigService,
  logger: OgmaService,
): void {
  app.use(
    helmet(),
    compression(),
    rateLimiter({
      windowMs: 10 * 60 * 1000,
      max: config.rateLimit,
      message: 'Too many requests, please try again later.',
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
      transform: true,
    }),
  );
  app.enableCors({ credentials: true });
  app.setGlobalPrefix(config.globalPrefix);
  logger.log('Application Configuration complete', 'ApplicationConfig');
}
