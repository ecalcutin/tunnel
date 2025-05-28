import { Injectable } from '@nestjs/common';

import { PeerConfig } from './interfaces';

type WGRepository = {
  readonly peers: Array<PeerConfig>;
};

@Injectable()
export class WireguardRepository {
  private storage: WGRepository = {
    peers: [],
  };

  async update(data: WGRepository): Promise<void> {
    this.storage = data;
  }

  async read(): Promise<WGRepository> {
    return this.storage;
  }
}
