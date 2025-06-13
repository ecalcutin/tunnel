import { Module } from '@nestjs/common';

import { AccountApiModule } from 'application/account';

@Module({
  imports: [AccountApiModule],
})
export class MainModule {}
