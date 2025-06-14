import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role, RoleRepositoryPort } from 'core/account';
import { RoleQuery } from 'core/account/queries';

import { RoleDocument, RoleEntity } from '../entities';

@Injectable()
export class RoleRepositoryMongoAdapter implements RoleRepositoryPort {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly model: Model<RoleEntity>,
  ) {}

  public async create(role: Role): Promise<Role> {
    const item = await new this.model(role).save();
    return this.toDomainModel(item);
  }

  public async find(): Promise<Role[]> {
    const items = await this.model.find().exec();
    return items.map(item => this.toDomainModel(item));
  }

  async findOne(query?: RoleQuery): Promise<Role | null> {
    const item = await this.model.findOne({
      ...query,
    });
    if (item) return this.toDomainModel(item);
    return null;
  }

  private toDomainModel(entity: RoleDocument): Role {
    const { _id, ...rest } = entity.toJSON();
    return new Role({
      id: _id.toString(),
      code: rest.code,
      description: rest.description,
    });
  }
}
