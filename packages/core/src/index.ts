import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}

bootstrap()
  .catch(error => {
    console.error(error);
  })
  .then(() => {
    console.log('App started');
  });
