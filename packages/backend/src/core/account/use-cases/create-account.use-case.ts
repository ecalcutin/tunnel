import { Inject, Injectable } from '@nestjs/common';

import { CreateAccountDto } from 'application/account/dto';

import { Account } from '../models';
import { AccountRepositoryPort, RoleRepositoryPort } from '../ports';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,

    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  public async execute(input: CreateAccountDto): Promise<Account> {
    const role = await this.roleRepository.getById(input.roleId);

    const account = await this.accountRepository.create({
      email: input.email,
      password: input.password,
      role: role,
    });

    return account;
  }
}
