import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Account } from 'features/account/domain/models';
import { AccountRepositoryPort } from 'features/account/domain/ports/repositories';
import { AccountQuery } from 'features/account/domain/queries';

import { AccountDocument, AccountEntity } from './entities';
import { AccountDomainMapper } from './mappers';

@Injectable()
export class AccountRepositoryAdapter implements AccountRepositoryPort {
  constructor(
    @InjectModel(AccountEntity.name)
    private readonly model: Model<AccountEntity>,
  ) {}

  async create(account: Omit<Account, 'id'>): Promise<Account> {
    const entity = await new this.model({
      email: account.email,
      password: account.password,
      role: new Types.ObjectId(account.role.id),
    }).save();

    await entity.populate(['role']);
    return this.toDomainModel(entity);
  }

  async getById(id: string): Promise<Account> {
    const item = await this.model.findById(id).exec();
    if (item) return this.toDomainModel(item);
    throw new Error('Entity not found');
  }

  async deleteById(id: string): Promise<Account> {
    const entity = await this.model.findByIdAndDelete(id).exec();
    if (entity) {
      return AccountDomainMapper.toDomainModel(entity);
    } else {
      throw new Error('Entity not found');
    }
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

  public toDomainModel(entity: AccountDocument): Account {
    return AccountDomainMapper.toDomainModel(entity);
  }
}
