import { Module } from '@nestjs/common';

import { AppConfigModule } from 'infrastructure/config';

import { AccountService, RoleService } from './use-cases';
import { InitService } from './use-cases/init.service';

@Module({
  imports: [AppConfigModule],
  providers: [InitService, AccountService, RoleService],
  exports: [AccountService, RoleService],
})
export class AccountCoreModule {}
