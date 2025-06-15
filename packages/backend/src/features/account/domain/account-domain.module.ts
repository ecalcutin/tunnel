import { Module } from '@nestjs/common';

import { AppConfigModule } from 'infrastructure/config';

import { InfrastructureModule } from '../infrastructure';

import {
  SeedRootAccountUseCase,
  CreateAccountUseCase,
  FindAccountsUseCase,
  DeleteAccountByIdUseCase,
  RoleService,
} from './use-cases';

@Module({
  imports: [AppConfigModule, InfrastructureModule],
  providers: [
    SeedRootAccountUseCase,
    CreateAccountUseCase,
    FindAccountsUseCase,
    DeleteAccountByIdUseCase,
    RoleService,
  ],
  exports: [
    CreateAccountUseCase,
    FindAccountsUseCase,
    DeleteAccountByIdUseCase,
    RoleService,
  ],
})
export class AccountDomainModule {}
