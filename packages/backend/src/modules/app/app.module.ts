import { Module } from '@nestjs/common';

import { AccountApiModule } from '../../application/account/account.module';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, AccountApiModule],
})
export class AppModule {}
