import { Module } from '@nestjs/common';

import { AppConfigModule } from 'infrastructure/config';

import {
  SeedRootAccountUseCase,
  AccountService,
  RoleService,
  CreateAccountUseCase,
} from './use-cases';

@Module({
  imports: [AppConfigModule],
  providers: [
    SeedRootAccountUseCase,
    CreateAccountUseCase,
    AccountService,
    RoleService,
  ],
  exports: [CreateAccountUseCase, AccountService, RoleService],
})
export class AccountCoreModule {}
