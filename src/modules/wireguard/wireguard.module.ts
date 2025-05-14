import { Module } from '@nestjs/common';

import { WireguardController } from './wireguard.controller';
import { WireguardService } from './wireguard.service';

@Module({
  controllers: [WireguardController],
  providers: [WireguardService],
})
export class WireguardModule {}
