import crypto from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';
import { type Peer } from '@packages/shared';

import { AppConfigService } from '../config';

import { CreatePeerDto } from './dto';
import { Wireguard } from './utils';
import { generateWireguardConfig } from './utils/generate-wg-config';
import { WireguardRepository } from './wireguard.repository';

@Injectable()
export class WireguardService {
  private readonly wireguard: Wireguard = new Wireguard();

  constructor(
    @Inject(AppConfigService)
    private readonly appConfigService: AppConfigService,

    @Inject(WireguardRepository)
    private readonly repository: WireguardRepository,
  ) {}

  public async read() {
    return this.repository.read();
  }

  private buildServerConfig(): string {
    const { privateKey, publicKey } = this.appConfigService.WIREGUARD!;
    const serverConfig = generateWireguardConfig({
      privateKey: privateKey,
      publicKey: publicKey,
      address: '10.0.0.1/24',
      listenPort: 51820,
      peers: [
        {
          publicKey: publicKey,
          allowedIPs: '10.0.0.2/32',
        },
      ],
    });
    return serverConfig;
  }

  public async create(peer: CreatePeerDto): Promise<Peer> {
    const id = crypto.randomUUID();
    const title = peer.title;
    const clientKeys = this.wireguard.generateKeyPair();
    const clientIP = this.wireguard.allocate();

    const newPeer: Peer = {
      id,
      title,
      config: {
        privateKey: clientKeys.privateKey,
        publicKey: clientKeys.publicKey,
        address: clientIP,
      },
    };

    await this.repository.create(newPeer);

    return newPeer;
  }
}
