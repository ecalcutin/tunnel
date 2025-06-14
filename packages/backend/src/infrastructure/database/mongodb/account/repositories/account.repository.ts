import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Account, AccountRepositoryPort } from 'core/account';
import { AccountQuery } from 'core/account/queries';

import { AccountDocument, AccountEntity } from '../entities';
import { AccountDomainMapper } from '../mappers';

@Injectable()
export class AccountRepositoryMongoAdapter implements AccountRepositoryPort {
  constructor(
    @InjectModel(AccountEntity.name)
    private readonly model: Model<AccountEntity>,
  ) {}

  async create(account: Account): Promise<Account> {
    const entity = await new this.model({
      email: account.email,
      password: account.password,
      role: new Types.ObjectId(account.role.id),
    }).save();

    await entity.populate(['role']);
    return this.toDomainModel(entity);
  }

  async find(query?: AccountQuery): Promise<Account[]> {
    const entities = await this.model
      .find({
        ...query,
      })
      .populate(['role'])
      .exec();
    return entities.map(entity => this.toDomainModel(entity));
  }

  async findOne(query?: AccountQuery): Promise<Account | null> {
    const entity = await this.model
      .findOne({
        ...query,
      })
      .populate(['role'])
      .exec();
    if (entity) return this.toDomainModel(entity);
    return entity;
  }

  async deleteById(id: string): Promise<Account> {
    const entity = await this.model.findByIdAndDelete(id).exec();
    if (entity) {
      return AccountDomainMapper.toDomainModel(entity);
    } else {
      throw new Error('Entity not found');
    }
  }

  public toDomainModel(entity: AccountDocument): Account {
    return AccountDomainMapper.toDomainModel(entity);
  }
}
