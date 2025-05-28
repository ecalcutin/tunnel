import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config';
import { RepositoryModule } from '../repository';

import { WireguardController } from './wireguard.controller';
import { WireguardRepository } from './wireguard.repository';
import { WireguardService } from './wireguard.service';

@Module({
  imports: [AppConfigModule, RepositoryModule],
  controllers: [WireguardController],
  providers: [WireguardService, WireguardRepository],
})
export class WireguardModule {}
