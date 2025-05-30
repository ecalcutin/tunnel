import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WireguardModule } from '../wireguard';

import { PeerController } from './peer.controller';
import { PeerRepository } from './peer.repository';
import { Peer, PeerSchema } from './peer.schema';
import { PeerService } from './peer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Peer.name, schema: PeerSchema }]),
    WireguardModule,
  ],
  controllers: [PeerController],
  providers: [PeerService, PeerRepository],
})
export class PeerModule {}
