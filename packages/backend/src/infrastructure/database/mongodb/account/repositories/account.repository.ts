import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account } from '../../../../../core/account/entities/account.entity';
import { AccountRepositoryPort } from '../../../../../core/account/ports/account.repository';
import { AccountEntity } from '../entities/account.entity';

import { BaseRepository } from './base.repository';

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
