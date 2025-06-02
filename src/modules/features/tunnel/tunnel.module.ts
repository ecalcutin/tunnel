import { Module } from '@nestjs/common';

import { WireguardModule } from '../wireguard';

@Module({
  imports: [WireguardModule],
})
export class TunnelModule {}
