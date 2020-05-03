import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { AppModule } from './app.module';
import { ApiConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const logger = app.get<OgmaService>(OgmaService);
  app.useLogger(logger);

  const config = app.get(ApiConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  await app.listen(config.port);

  logger.silly(`http://localhost:${config.port}`);
}
bootstrap();
