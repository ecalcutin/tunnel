import { Module } from '@nestjs/common';

import { WireguardModule } from '../wireguard';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [WireguardModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
