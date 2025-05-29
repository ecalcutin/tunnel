import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { type Peer } from '@packages/shared';

import { CreatePeerDto } from './dto';
import { PeerService } from './peer.service';

@Controller('/peers')
export class PeerController {
  constructor(
    @Inject(PeerService)
    private readonly peerService: PeerService,
  ) {}

  @Get('/')
  async read(): Promise<Peer[]> {
    return this.peerService.read();
  }

  @Post('/')
  async create(@Body() peer: CreatePeerDto) {
    return this.peerService.create(peer);
  }
}
