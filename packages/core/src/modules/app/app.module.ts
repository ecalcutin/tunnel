import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config';
import { PeerModule } from '../peer';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, PeerModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
