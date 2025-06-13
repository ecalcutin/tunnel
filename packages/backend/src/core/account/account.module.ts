import { Module } from '@nestjs/common';

import { DatabaseModule } from 'infrastructure/database';

import { AccountService } from './use-cases/account.service';

@Module({
  imports: [DatabaseModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountCoreModule {}
