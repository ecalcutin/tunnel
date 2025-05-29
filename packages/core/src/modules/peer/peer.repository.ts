import crypto from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';
import { type Peer } from '@packages/shared';

import { WireguardService } from '../wireguard/wireguard.service';

type PeerRepositoryStorage = {
  serverPrivateKey: string;
  serverPublicKey: string;
  peers: Peer[];
};

@Injectable()
export class PeerRepository {
  private readonly storage: PeerRepositoryStorage;

  constructor(
    @Inject(WireguardService)
    private readonly wireguardService: WireguardService,
  ) {
    const serverKeys = this.wireguardService.generateKeyPair();
    this.storage = {
      serverPublicKey: serverKeys.publicKey,
      serverPrivateKey: serverKeys.privateKey,
      peers: [],
    };
  }

  async read(): Promise<Peer[]> {
    return this.storage.peers;
  }

  async create(peer: Omit<Peer, 'id'>) {
    const id = crypto.randomUUID();

    const _peer = {
      id,
      ...peer,
    };

    this.storage.peers.push(_peer);
    return _peer;
  }
}
