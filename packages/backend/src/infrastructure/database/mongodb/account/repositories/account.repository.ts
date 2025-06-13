import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account, type AccountRepositoryPort } from 'core/account';

import { BaseRepository } from '../../shared';
import { AccountEntity } from '../entities';

@Injectable()
export class AccountMongoRepository
  extends BaseRepository<Account, AccountEntity>
  implements AccountRepositoryPort
{
  constructor(
    @InjectModel(AccountEntity.name)
    private readonly model: Model<AccountEntity>,
  ) {
    super(model);
  }

  async findByEmail(email: string): Promise<Account | null> {
    return this.model.findOne({ email }).exec();
  }
}
