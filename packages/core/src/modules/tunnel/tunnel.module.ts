import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppConfigModule } from '../config';

import { TunnelController } from './tunnel.controller';
import { TunnelRepository } from './tunnel.repository';
import { Tunnel, TunnelSchema } from './tunnel.schema';
import { TunnelService } from './tunnel.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tunnel.name, schema: TunnelSchema }]),
    AppConfigModule,
  ],
  controllers: [TunnelController],
  providers: [TunnelService, TunnelRepository],
  exports: [TunnelService],
})
export class TunnelModule {}
