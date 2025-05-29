import { Module } from '@nestjs/common';

import { WireguardModule } from '../wireguard';

import { PeerController } from './peer.controller';
import { PeerRepository } from './peer.repository';
import { PeerService } from './peer.service';

@Module({
  imports: [WireguardModule],
  controllers: [PeerController],
  providers: [PeerService, PeerRepository],
})
export class PeerModule {}
