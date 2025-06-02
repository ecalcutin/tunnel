import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IPAllocatorModule } from '../ip-allocator';
import { WireguardModule } from '../wireguard';

import { TunnelController } from './tunnel.controller';
import { TunnelRepository } from './tunnel.repository';
import { Tunnel, TunnelSchema } from './tunnel.schema';
import { TunnelService } from './tunnel.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tunnel.name, schema: TunnelSchema }]),
    WireguardModule,
    IPAllocatorModule,
  ],
  controllers: [TunnelController],
  providers: [TunnelService, TunnelRepository],
})
export class TunnelModule {}
