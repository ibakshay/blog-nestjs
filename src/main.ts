import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'dotenv/config'
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  await app.listen(3001)
  Logger.log(`Application successfuly started!!!`)
}
bootstrap();
