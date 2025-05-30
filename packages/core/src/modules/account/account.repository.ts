import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../repository';

import { Account } from './account.schema';

@Injectable()
export class AccountRepository extends BaseRepository<Account> {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {
    super(accountModel);
  }
}
