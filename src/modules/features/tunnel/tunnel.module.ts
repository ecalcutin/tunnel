import { Module } from '@nestjs/common';

import { WireguardModule } from '../wireguard';

import { TunnelController } from './tunnel.controller';
import { TunnelService } from './tunnel.service';

@Module({
  imports: [WireguardModule],
  controllers: [TunnelController],
  providers: [TunnelService],
})
export class TunnelModule {}
