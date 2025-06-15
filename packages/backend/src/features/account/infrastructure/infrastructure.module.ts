import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AccountRepositoryPort,
  RoleRepositoryPort,
} from '../domain/ports/repositories';

import {
  AccountRepositoryAdapter,
  RoleRepositoryAdapter,
} from './adapters/repositories';
import {
  AccountEntity,
  AccountSchema,
  RoleEntity,
  RoleSchema,
} from './adapters/repositories/entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AccountEntity.name,
        schema: AccountSchema,
      },
      {
        name: RoleEntity.name,
        schema: RoleSchema,
      },
    ]),
  ],

  providers: [
    {
      provide: AccountRepositoryPort,
      useClass: AccountRepositoryAdapter,
    },
    {
      provide: RoleRepositoryPort,
      useClass: RoleRepositoryAdapter,
    },
  ],
  exports: [AccountRepositoryPort, RoleRepositoryPort],
})
export class InfrastructureModule {}
