import { Inject, Injectable } from '@nestjs/common';

import { Account } from '../entities/account.entity';
import { type AccountRepositoryPort } from '../ports/account.repository';

@Injectable()
export class AccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accontRepository: AccountRepositoryPort,
  ) {}

  public async read(): Promise<Account[]> {
    return this.accontRepository.find();
  }
}
