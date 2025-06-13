import { Module } from '@nestjs/common';

import { AccountCoreModule } from 'core/account';
import { DatabaseModule } from 'infrastructure/database';

import { AccountController } from './account.controller';

@Module({
  imports: [AccountCoreModule, DatabaseModule],
  controllers: [AccountController],
})
export class AccountApiModule {}
