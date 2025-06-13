import { Module } from '@nestjs/common';

import { DatabaseModule } from 'infrastructure/database';

import { AccountService, RoleService } from './use-cases';

@Module({
  imports: [DatabaseModule],
  providers: [AccountService, RoleService],
  exports: [AccountService, RoleService],
})
export class AccountCoreModule {}
