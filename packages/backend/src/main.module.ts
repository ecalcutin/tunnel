import { Module } from '@nestjs/common';

import { AccountFeatureModule } from 'features/account';
import { AppConfigModule } from 'infrastructure/config';
import { DatabaseModule } from 'infrastructure/database';

@Module({
  imports: [AppConfigModule, DatabaseModule, AccountFeatureModule],
})
export class MainModule {}
