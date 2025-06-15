import { Module } from '@nestjs/common';

import { AccountDomainModule } from 'features/account/domain';

import { AccountController } from './controllers/account.controller';
import { RolesController } from './controllers/roles.controller';

@Module({
  imports: [AccountDomainModule],
  controllers: [AccountController, RolesController],
})
export class AccountApplicationModule {}
