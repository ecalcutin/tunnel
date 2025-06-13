import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role, RoleRepositoryPort } from 'core/account';

import { RoleEntity } from '../entities';

@Injectable()
export class RoleRepositoryMongoAdapter implements RoleRepositoryPort {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly model: Model<RoleEntity>,
  ) {}

  public async create(role: Role): Promise<Role> {
    const item = await new this.model(role).save();
    return item.toDomainModel();
  }

  public async find(): Promise<Role[]> {
    const items = await this.model.find().exec();
    return items.map(item => item.toDomainModel());
  }
}
