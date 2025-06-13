import { Module } from '@nestjs/common';

import { AccountApiModule } from 'application/account';
import { AppConfigModule } from 'infrastructure/config';
import { DatabaseModule } from 'infrastructure/database';

@Module({
  imports: [AppConfigModule, DatabaseModule, AccountApiModule],
})
export class MainModule {}
