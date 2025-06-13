import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
      provide: 'IAccountRepository',
      useClass: AccountMongoRepository,
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleMongoRepository,
    },
  ],
  exports: ['IAccountRepository', 'IRoleRepository'],
})
export class AccountMongoDBModule {}
