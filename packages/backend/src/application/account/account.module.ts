import { Module } from '@nestjs/common';

import { AccountCoreModule } from 'core/account';

import { AccountController } from './account.controller';
import { RolesController } from './roles.controller';

@Module({
  imports: [AccountCoreModule],
  controllers: [AccountController, RolesController],
})
export class AccountApiModule {}
