import { Module } from '@nestjs/common';

import { AccountApplicationModule } from './application/account-application.module';

@Module({
  imports: [AccountApplicationModule],
})
export class AccountFeatureModule {}
