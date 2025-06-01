import { Module } from '@nestjs/common';

import { WireguardModule } from '../features/wireguard';

@Module({
  imports: [WireguardModule],
})
export class CoreModule {}
