import crypto from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { type Peer } from '@packages/shared';

type PeerRepositoryStorage = {
  peers: Peer[];
};

@Injectable()
export class PeerRepository {
  private readonly storage: PeerRepositoryStorage;

  constructor() {
    this.storage = {
      peers: [],
    };
  }

  async read(): Promise<Peer[]> {
    return this.storage.peers;
  }

  async create(peer: Omit<Peer, 'id'>): Promise<Peer> {
    const id = crypto.randomUUID();

    const _peer = {
      id,
      ...peer,
    };

    this.storage.peers.push(_peer);
    return _peer;
  }
}
