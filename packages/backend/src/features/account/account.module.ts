import { Module } from '@nestjs/common';

import { AccountApplicationModule } from './application';

@Module({
  imports: [AccountApplicationModule],
})
export class AccountFeatureModule {}
