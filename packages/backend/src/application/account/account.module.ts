import { Module } from '@nestjs/common';

import { AccountCoreModule } from '../../core/account/account.module';
import { AccountMongoDBModule } from '../../infrastructure/database/mongodb/account/account.module';

import { AccountController } from './account.controller';

@Module({
  imports: [AccountCoreModule, AccountMongoDBModule],
  controllers: [AccountController],
})
export class AccountApiModule {}
