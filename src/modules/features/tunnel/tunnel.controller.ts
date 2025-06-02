import { Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';

import { TunnelService } from './tunnel.service';

@Controller('/tunnel')
export class TunnelController {
  constructor(
    @Inject(TunnelService) private readonly tunnelService: TunnelService,
  ) {}

  @Post('/')
  async create() {
    return this.tunnelService.create();
  }

  @Get('/:id/wireguard-config')
  async readWireguardConfigById(@Param('id') id: string) {
    return this.tunnelService.readWireguardConfigById(id);
  }

  @Get('/')
  async read() {
    return this.tunnelService.read();
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    await this.tunnelService.deleteById(id);
  }
}
