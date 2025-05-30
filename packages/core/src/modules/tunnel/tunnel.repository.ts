import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../repository';

import { Tunnel } from './tunnel.schema';

@Injectable()
export class TunnelRepository extends BaseRepository<Tunnel> {
  constructor(
    @InjectModel(Tunnel.name) private readonly peerModel: Model<Tunnel>,
  ) {
    super(peerModel);
  }
}
