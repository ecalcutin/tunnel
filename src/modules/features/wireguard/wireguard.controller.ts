import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { WriteConfigDto } from './dto';
import { WireguardService } from './wireguard.service';

@Controller('/wireguard')
export class WireguardController {
  constructor(
    @Inject(WireguardService)
    private readonly wireguardService: WireguardService,
  ) {}

  @Get('/keypair')
  async generateKeyPair() {
    return this.wireguardService.generateKeyPair();
  }

  @Get('/config')
  async readConfig() {
    return this.wireguardService.readConfig();
  }

  @Post('/config')
  async writeConfig(@Body() input: WriteConfigDto) {
    return this.wireguardService.writeConfig(input.config);
  }
}
