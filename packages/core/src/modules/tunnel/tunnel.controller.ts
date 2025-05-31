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

  @Get('/')
  async read() {
    return this.tunnelService.read();
  }

  @Get('/:id')
  async readById(@Param('id') id: string) {
    return this.tunnelService.readById(id);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    return this.tunnelService.deleteById(id);
  }
}
