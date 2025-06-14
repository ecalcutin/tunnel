import { Inject, Injectable } from '@nestjs/common';

import { Account } from '../models';
import { AccountRepositoryPort, RoleRepositoryPort } from '../ports';
import { AccountQuery } from '../queries';

@Injectable()
export class AccountService {
  constructor(
    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,

    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  public async create(account: Account): Promise<Account> {
    return this.accountRepository.create(account);
  }

  public async find(query?: AccountQuery): Promise<Account[]> {
    return this.accountRepository.find(query);
  }

  public async deleteById(id: string): Promise<Account> {
    return this.accountRepository.deleteById(id);
  }
}
