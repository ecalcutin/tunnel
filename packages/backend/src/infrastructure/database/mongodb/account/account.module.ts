import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountEntity, AccountSchema } from './entities/account.entity';
import { AccountMongoRepository } from './repositories/account.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AccountEntity.name,
        schema: AccountSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: 'IAccountRepository',
      useClass: AccountMongoRepository,
    },
  ],
  exports: ['IAccountRepository'],
})
export class AccountMongoDBModule {}
