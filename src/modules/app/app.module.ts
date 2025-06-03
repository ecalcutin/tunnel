import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppConfigModule, AppConfigService } from '../config';
import { TunnelModule } from '../features/tunnel';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) => {
        const mongoConfig = configService.MONGODB!;
        const {
          MONGO_USERNAME,
          MONGO_PASSWORD,
          MONGO_HOST,
          MONGO_PORT,
          MONGO_DB,
          MONGO_AUTH_DB,
        } = mongoConfig;
        const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTH_DB}`;
        return {
          uri,
        };
      },
    }),
    AppConfigModule,
    TunnelModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
