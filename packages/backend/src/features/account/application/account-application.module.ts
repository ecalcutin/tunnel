import { Module } from '@nestjs/common';

import { AccountDomainModule } from 'features/account/domain';

import { AccountController } from './account.controller';
import { RolesController } from './roles.controller';

@Module({
  imports: [AccountDomainModule],
  controllers: [AccountController, RolesController],
})
export class AccountApplicationModule {}
