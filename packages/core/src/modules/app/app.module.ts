import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountModule } from '../account';
import { AppConfigModule } from '../config';
import { TunnelModule } from '../tunnel';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: 'mongodb://database/tunnel',
        };
      },
    }),
    TunnelModule,
    AccountModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
