import { Controller, Get, Inject, Post } from '@nestjs/common';

import { PeerService } from './peer.service';

@Controller('/peers')
export class PeerController {
  constructor(
    @Inject(PeerService)
    private readonly peerService: PeerService,
  ) {}

  @Get('/')
  async read() {
    return this.peerService.read();
  }

  @Post('/')
  async create() {
    return this.peerService.create();
  }
}
