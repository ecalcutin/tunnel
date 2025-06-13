import { Inject, Injectable } from '@nestjs/common';

import { Account } from '../entities';
import { AccountRepositoryPort } from '../ports';

@Injectable()
export class AccountService {
  constructor(
    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  public async create(account: Partial<Account>): Promise<Account> {
    return this.accountRepository.create(account);
  }

  public async find(): Promise<Account[]> {
    return this.accountRepository.find();
  }
}
