import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config';

import { WireguardService } from './wireguard.service';

@Module({
  imports: [AppConfigModule],

  providers: [WireguardService],
  exports: [WireguardService],
})
export class WireguardModule {}
