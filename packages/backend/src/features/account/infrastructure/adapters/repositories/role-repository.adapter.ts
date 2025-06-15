import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role } from 'features/account/domain/models';
import { RoleRepositoryPort } from 'features/account/domain/ports/repositories';
import { RoleQuery } from 'features/account/domain/queries';

import { RoleDocument, RoleEntity } from './entities';
import { RoleDomainMapper } from './mappers';

@Injectable()
export class RoleRepositoryAdapter implements RoleRepositoryPort {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly model: Model<RoleEntity>,
  ) {}

  public async create(role: Omit<Role, 'id'>): Promise<Role> {
    const item = await new this.model(role).save();
    return this.toDomainModel(item);
  }

  async getById(id: string): Promise<Role> {
    const item = await this.model.findById(id).exec();
    if (item) return this.toDomainModel(item);
    throw new Error('Entity not found');
  }

  async deleteById(id: string): Promise<Role> {
    const item = await this.model.findByIdAndDelete(id);
    if (item) return this.toDomainModel(item);
    throw new Error('Entity not found');
  }

  public async find(query?: RoleQuery): Promise<Role[]> {
    const items = await this.model
      .find({
        ...query,
      })
      .exec();
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
    return RoleDomainMapper.toDomainModel(entity);
  }
}
