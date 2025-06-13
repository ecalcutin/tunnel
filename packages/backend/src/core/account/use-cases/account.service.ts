import { Inject, Injectable } from '@nestjs/common';

import { Account } from '../entities';
import { type AccountRepositoryPort } from '../ports';

@Injectable()
export class AccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  public async create(account: Account): Promise<Account> {
    return this.accountRepository.create(account);
  }

  public async find(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  public async getById(id: string): Promise<Account> {
    return this.accountRepository.getById(id);
  }

  public async deleteById(id: string): Promise<Account> {
    return this.accountRepository.deleteById(id);
  }
}
