import { Module } from '@nestjs/common';

import { AccountPostgresDBModule } from './postgres/account/account.module';

@Module({
  imports: [AccountPostgresDBModule],
  exports: [AccountPostgresDBModule],
})
export class DatabaseModule {}
