import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountModule } from '../account';
import { AppConfigModule } from '../config';
import { PeerModule } from '../peer';

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

    AccountModule,
    PeerModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
