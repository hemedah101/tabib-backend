import { INestApplication, ValidationPipe } from '@nestjs/common';
import { OgmaService } from '@ogma/nestjs-module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
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
    cookieParser(),
    rateLimiter({
      windowMs: 10 * 60 * 1000,
      max: config.rateLimit,
      message: 'Too many requests, please try again later.',
    }),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ credentials: true });
  app.setGlobalPrefix(config.globalPrefix);
  logger.log('Application Configuration complete', 'ApplicationConfig');
}
