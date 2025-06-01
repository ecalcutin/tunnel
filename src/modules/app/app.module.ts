import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config';
import { CoreModule } from '../core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, CoreModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
