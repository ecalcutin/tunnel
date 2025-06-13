import { Model } from 'mongoose';

import { BaseRepositoryPort } from '../../../../../core/shared';

export abstract class BaseRepository<DomainEntity, TEntity>
  implements BaseRepositoryPort<DomainEntity>
{
  constructor(private readonly entityModel: Model<TEntity>) {}

  public async create(entity: DomainEntity): Promise<DomainEntity> {
    const newEntity = await new this.entityModel(entity).save();
    return newEntity as DomainEntity;
  }

  public async find(): Promise<DomainEntity[]> {
    const entities = await this.entityModel.find().exec();
    return entities as DomainEntity[];
  }

  public async getById(id: string): Promise<DomainEntity> {
    const entity = await this.entityModel.findById(id).exec();
    if (entity) {
      return entity as DomainEntity;
    }
    throw new Error('Entity not found');
  }

  public async deleteById(id: string): Promise<DomainEntity> {
    const entity = await this.entityModel.findByIdAndDelete(id).exec();
    if (entity) {
      return entity as DomainEntity;
    }
    throw new Error('Entity not found');
  }
}
