import { Injectable } from '@nestjs/common';
import { type Peer } from '@packages/shared';

import { Wireguard } from './utils';

type WGRepository = {
  readonly serverPrivateKey: string;
  readonly serverPublicKey: string;
  readonly peers: Array<Peer>;
};

@Injectable()
export class WireguardRepository {
  private readonly wireguard = new Wireguard();
  private readonly storage: WGRepository;

  constructor() {
    const { privateKey, publicKey } = this.wireguard.generateKeyPair();

    this.storage = {
      serverPrivateKey: privateKey,
      serverPublicKey: publicKey,
      peers: [],
    };
  }

  async read(): Promise<Peer[]> {
    return this.storage.peers;
  }

  async create(peer: Peer): Promise<void> {
    this.storage.peers.push(peer);
  }
}
