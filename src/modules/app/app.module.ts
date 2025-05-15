import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config';
import { WireguardModule } from '../wireguard';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, WireguardModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
