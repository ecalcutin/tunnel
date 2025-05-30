import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account } from './account.schema';
import { CreateAccountDto } from './dto';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  public async read(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  public async create(account: CreateAccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(account);
    return createdAccount.save();
  }
}
