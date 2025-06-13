import { Inject, Injectable } from '@nestjs/common';

import { BaseService } from 'core/shared';

import { Account } from '../entities';
import { type AccountRepositoryPort } from '../ports';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: AccountRepositoryPort,
  ) {
    super(accountRepository);
  }
}
