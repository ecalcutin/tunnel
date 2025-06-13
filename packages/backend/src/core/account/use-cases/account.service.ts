import { Inject, Injectable } from '@nestjs/common';

import { Account } from '../entities/account.entity';
import { type AccountRepositoryPort } from '../ports/account.repository';

@Injectable()
export class AccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accontRepository: AccountRepositoryPort,
  ) {}

  public async create(account: Account): Promise<Account> {
    return this.accontRepository.create(account);
  }

  public async find(): Promise<Account[]> {
    return this.accontRepository.find();
  }

  public async getById(id: string): Promise<Account> {
    return this.accontRepository.getById(id);
  }

  public async deleteById(id: string): Promise<Account> {
    return this.accontRepository.deleteById(id);
  }
}
