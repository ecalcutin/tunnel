import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppConfigModule, AppConfigService } from 'infrastructure/config';

import { AccountMongoDBModule } from './account/account.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfigService) => {
        const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } =
          appConfig.DATABASE;
        return {
          authSource: 'admin',
          uri: `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        };
      },
      inject: [AppConfigService],
    }),
    AccountMongoDBModule,
  ],
  exports: [AccountMongoDBModule],
})
export class MongoDBModule {}
