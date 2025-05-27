import { Injectable } from '@nestjs/common';

import { SimpleRepositoryService } from '../repository';

import { PeerConfig } from './interfaces';

type WGRepository = {
  readonly peers: Array<PeerConfig>;
};

@Injectable()
export class WireguardRepository extends SimpleRepositoryService<WGRepository> {
  constructor() {
    super('wg-interfaces');
  }
}
