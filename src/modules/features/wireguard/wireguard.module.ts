import { Module } from '@nestjs/common';

import { WireguardService } from './wireguard.service';

@Module({
  providers: [WireguardService],
  exports: [WireguardService],
})
export class WireguardModule {}
