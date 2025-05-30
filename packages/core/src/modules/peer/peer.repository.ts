import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../repository';

import { Peer } from './peer.schema';

@Injectable()
export class PeerRepository extends BaseRepository<Peer> {
  constructor(@InjectModel(Peer.name) private readonly peerModel: Model<Peer>) {
    super(peerModel);
  }
}
