import { Module } from '@nestjs/common';

import { AppConfigModule } from '../../config';

import { TemplateService } from './template.service';
import { WireguardController } from './wireguard.controller';
import { WireguardService } from './wireguard.service';

@Module({
  imports: [AppConfigModule],
  controllers: [WireguardController],
  providers: [WireguardService, TemplateService],
  exports: [WireguardService, TemplateService],
})
export class WireguardModule {}
