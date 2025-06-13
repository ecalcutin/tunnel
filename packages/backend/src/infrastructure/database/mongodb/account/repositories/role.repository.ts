import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role, type RoleRepositoryPort } from 'core/account';

import { BaseRepository } from '../../shared';
import { RoleEntity } from '../entities';

@Injectable()
export class RoleMongoRepository
  extends BaseRepository<Role, RoleEntity>
  implements RoleRepositoryPort
{
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly model: Model<RoleEntity>,
  ) {
    super(model);
  }
}
