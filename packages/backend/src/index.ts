import { NestFactory } from '@nestjs/core';

import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  await app.listen(3000);
}

bootstrap()
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error(error);
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('App started');
  });
