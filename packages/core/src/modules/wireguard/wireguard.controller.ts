import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { CreatePeerDto } from './dto';
import { WireguardService } from './wireguard.service';

@Controller('/wireguard')
export class WireguardController {
  constructor(
    @Inject(WireguardService)
    private readonly wireguardService: WireguardService,
  ) {}

  @Get('/peers')
  async readInterfaces() {
    return this.wireguardService.readInterfaces();
  }

  @Post('/peers')
  async createInterface(@Body() peer: CreatePeerDto) {
    return this.wireguardService.createInterface(peer);
  }
}
