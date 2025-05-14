import { Controller, Get } from '@nestjs/common';

import { WireguardService } from './wireguard.service';

@Controller('/wireguard')
export class WireguardController {
  constructor(private readonly wireguardService: WireguardService) {}

  @Get('/interfaces')
  async readInterfaces() {
    return [];
  }
}
