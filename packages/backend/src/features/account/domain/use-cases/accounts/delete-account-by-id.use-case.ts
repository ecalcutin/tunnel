import { Inject, Injectable } from '@nestjs/common';

import { Account } from '../../models';
import { AccountRepositoryPort } from '../../ports/repositories';

@Injectable()
export class DeleteAccountByIdUseCase {
  constructor(
    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,
  ) {}

  public async execute(id: string): Promise<Account> {
    return this.accountRepository.deleteById(id);
  }
}
