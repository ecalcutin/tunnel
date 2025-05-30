import { Inject, Injectable } from '@nestjs/common';

import { AccountRepository } from './account.repository';
import { Account } from './account.schema';
import { CreateAccountDto } from './dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject(AccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {}

  async read(): Promise<Account[]> {
    return this.accountRepository.read();
  }

  async create(account: CreateAccountDto): Promise<Account> {
    return this.accountRepository.create(account);
  }
}
