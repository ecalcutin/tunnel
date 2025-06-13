import { Module } from '@nestjs/common';

import { InfrastructureModule } from '../../infrastructure/infrastructure.module';

import { AccountService } from './use-cases/account.service';

@Module({
  imports: [InfrastructureModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountCoreModule {}
