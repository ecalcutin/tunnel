import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config';

import { WireguardController } from './wireguard.controller';
import { WireguardService } from './wireguard.service';

@Module({
  imports: [AppConfigModule],
  controllers: [WireguardController],
  providers: [WireguardService],
})
export class WireguardModule {}
