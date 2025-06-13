import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account, AccountRepositoryPort } from 'core/account';

import { AccountEntity, RoleEntity } from '../entities';

@Injectable()
export class AccountRepositoryMongoAdapter implements AccountRepositoryPort {
  constructor(
    @InjectModel(AccountEntity.name)
    private readonly model: Model<AccountEntity>,

    @InjectModel(RoleEntity.name)
    private readonly roleModel: Model<RoleEntity>,
  ) {}

  async create(account: Partial<Account>): Promise<Account> {
    const role = await this.roleModel.findOne({ title: 'admin' }).exec();
    const entity = await new this.model({
      email: account.email,
      password: account.password,
      role: role!._id,
    }).save();

    await entity.populate(['role']);
    return entity.toDomainModel();
  }

  async find(): Promise<Account[]> {
    const entities = await this.model.find().populate(['role']).exec();
    return entities.map(entity => entity.toDomainModel());
  }
}
