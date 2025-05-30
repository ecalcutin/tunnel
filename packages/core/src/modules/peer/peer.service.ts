import { Inject, Injectable } from '@nestjs/common';

import { WireguardService } from '../wireguard/wireguard.service';

import { PeerRepository } from './peer.repository';
import { Peer } from './peer.schema';

@Injectable()
export class PeerService {
  constructor(
    @Inject(PeerRepository)
    private readonly peerRepository: PeerRepository,

    @Inject(WireguardService)
    private readonly wireguardService: WireguardService,
  ) {}

  async read(): Promise<Peer[]> {
    return this.peerRepository.read();
  }

  async create() {
    const config = await this.wireguardService.generateClientConfig();
    return this.peerRepository.create(config);
  }
}
