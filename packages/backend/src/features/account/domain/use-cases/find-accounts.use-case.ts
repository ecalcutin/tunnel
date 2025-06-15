import { Inject, Injectable } from '@nestjs/common';

import { Account } from '../models';
import { AccountRepositoryPort } from '../ports/repositories';
import { AccountQuery } from '../queries';

@Injectable()
export class FindAccountsUseCase {
  constructor(
    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  public async execute(query?: AccountQuery): Promise<Account[]> {
    return this.accountRepository.find({ ...query });
  }
}
