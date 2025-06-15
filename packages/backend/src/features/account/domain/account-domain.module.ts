import { Module } from '@nestjs/common';

import { AppConfigModule } from 'infrastructure/config';

import { InfrastructureModule } from '../infrastructure';

import {
  SeedRootAccountUseCase,
  CreateAccountUseCase,
  FindAccountsUseCase,
  DeleteAccountByIdUseCase,
  CreateRoleUseCase,
  FindRolesUseCase,
  DeleteRoleByIdUseCase,
} from './use-cases';

@Module({
  imports: [AppConfigModule, InfrastructureModule],
  providers: [
    // Seed
    SeedRootAccountUseCase,
    // Accounts
    CreateAccountUseCase,
    FindAccountsUseCase,
    DeleteAccountByIdUseCase,
    // Roles
    CreateRoleUseCase,
    FindRolesUseCase,
    DeleteRoleByIdUseCase,
  ],
  exports: [
    CreateAccountUseCase,
    FindAccountsUseCase,
    DeleteAccountByIdUseCase,
    CreateRoleUseCase,
    FindRolesUseCase,
    DeleteRoleByIdUseCase,
  ],
})
export class AccountDomainModule {}
