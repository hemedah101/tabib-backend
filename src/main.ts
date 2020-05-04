import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { AppModule } from './app.module';
import { configure } from './config.main';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const logger = app.get<OgmaService>(OgmaService);
  app.useLogger(logger);
  const config = app.get(ConfigService);
  const port = config.port;
  configure(app, config, logger);
  await app.listen(port);

  logger.log(
    `Listening at http://localhost:${port}/graphql`,
    'NestApplication',
  );
}
bootstrap();
