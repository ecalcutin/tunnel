import { Module } from '@nestjs/common';

import { AccountRepositoryPort, RoleRepositoryPort } from 'core/account/ports';

import { PostgresDBModule } from '../postgres.module';

import {
  AccountRepositoryPostgresAdapter,
  RoleRepositoryPostgresAdapter,
} from './repositories';

@Module({
  imports: [PostgresDBModule],
  providers: [
    {
      provide: AccountRepositoryPort,
      useClass: AccountRepositoryPostgresAdapter,
    },
    {
      provide: RoleRepositoryPort,
      useClass: RoleRepositoryPostgresAdapter,
    },
  ],
  exports: [AccountRepositoryPort, RoleRepositoryPort],
})
export class AccountPostgresDBModule {}
