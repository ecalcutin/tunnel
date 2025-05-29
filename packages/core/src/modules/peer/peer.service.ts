import { Inject, Injectable } from '@nestjs/common';
import { type Peer } from '@packages/shared';

import { WireguardService } from '../wireguard/wireguard.service';

import { CreatePeerDto } from './dto';
import { PeerRepository } from './peer.repository';

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

  async create(peer: CreatePeerDto) {
    await this.peerRepository.create({
      title: peer.title,
      config: await this.wireguardService.generateClientConfig(),
    });

    const peers = await this.peerRepository.read();

    const wgConf = await this.wireguardService.buildServerConfig(peers);
    return wgConf;
  }
}
