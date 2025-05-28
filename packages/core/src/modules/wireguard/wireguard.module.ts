import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config';

import { WireguardController } from './wireguard.controller';
import { WireguardRepository } from './wireguard.repository';
import { WireguardService } from './wireguard.service';

@Module({
  imports: [AppConfigModule],
  controllers: [WireguardController],
  providers: [WireguardService, WireguardRepository],
})
export class WireguardModule {}
