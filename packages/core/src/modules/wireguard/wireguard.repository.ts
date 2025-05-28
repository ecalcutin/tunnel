import { Injectable } from '@nestjs/common';

import { RepositoryService } from '../repository';

import { PeerConfig } from './interfaces';

type WGRepository = {
  readonly peers: Array<PeerConfig>;
};

@Injectable()
export class WireguardRepository extends RepositoryService<WGRepository> {
  storage: WGRepository = {
    peers: [],
  };
}
