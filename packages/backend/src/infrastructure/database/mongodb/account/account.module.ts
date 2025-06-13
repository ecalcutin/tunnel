import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountRepositoryPort, RoleRepositoryPort } from 'core/account/ports';

import {
  AccountEntity,
  AccountSchema,
  RoleEntity,
  RoleSchema,
} from './entities';
import { AccountMongoRepository, RoleMongoRepository } from './repositories';

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
      useClass: AccountMongoRepository,
    },
    {
      provide: RoleRepositoryPort,
      useClass: RoleMongoRepository,
    },
  ],
  exports: [AccountRepositoryPort, RoleRepositoryPort],
})
export class AccountMongoDBModule {}
