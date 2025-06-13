import { Module } from '@nestjs/common';

import { AccountApiModule } from 'application/account';
import { DatabaseModule } from 'infrastructure/database';

@Module({
  imports: [DatabaseModule, AccountApiModule],
})
export class MainModule {}
