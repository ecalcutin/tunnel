import { Controller, Get, Inject, Post } from '@nestjs/common';

import { WireguardService } from './wireguard.service';

@Controller('/wireguard')
export class WireguardController {
  constructor(
    @Inject(WireguardService)
    private readonly wireguardService: WireguardService,
  ) {}

  @Get('/interfaces')
  async readInterfaces() {
    return this.wireguardService.readInterfaces();
  }

  @Post('/interfaces')
  async createInterface() {
    return this.wireguardService.createInterface();
  }
}
