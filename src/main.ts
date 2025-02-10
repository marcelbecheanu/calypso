import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const fastify: FastifyAdapter = new FastifyAdapter({ logger: true });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
