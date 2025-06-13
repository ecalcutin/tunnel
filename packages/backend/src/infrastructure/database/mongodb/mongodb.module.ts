import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AccountMongoDBModule } from './account/account.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async () => {
        return {
          uri: 'mongodb://root:example@localhost:27017/tunnel?authSource=admin',
        } as MongooseModuleOptions;
      },
      inject: [],
    }),
    AccountMongoDBModule,
  ],
  exports: [AccountMongoDBModule],
})
export class MongoDBModule {}
