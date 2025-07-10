import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { version } from '../package.json';
import { EnvDto } from './infra/config/env.dto';
import { MainModule } from './main.module';

async function main(): Promise<void> {
  const app = await NestFactory.create(MainModule);

  const configService = app.get<ConfigService<EnvDto, true>>(ConfigService);

  app.setGlobalPrefix(configService.get('API_URL'));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('My Finance Web - API')
    .setVersion(version)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(
    `${configService.get('API_URL')}/swagger`,
    app,
    swaggerDocument,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(configService.get('API_PORT'));
}

void main();
