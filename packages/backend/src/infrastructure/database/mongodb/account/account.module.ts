import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountRepositoryPort, RoleRepositoryPort } from 'core/account/ports';

import {
  AccountEntity,
  AccountSchema,
  RoleEntity,
  RoleSchema,
} from './entities';
import {
  AccountRepositoryMongoAdapter,
  RoleRepositoryMongoAdapter,
} from './repositories';

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
      useClass: AccountRepositoryMongoAdapter,
    },
    {
      provide: RoleRepositoryPort,
      useClass: RoleRepositoryMongoAdapter,
    },
  ],
  exports: [AccountRepositoryPort, RoleRepositoryPort],
})
export class AccountMongoDBModule {}
