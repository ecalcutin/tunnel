import { Module } from '@nestjs/common';

import { AccountService, RoleService } from './use-cases';

@Module({
  providers: [AccountService, RoleService],
  exports: [AccountService, RoleService],
})
export class AccountCoreModule {}
