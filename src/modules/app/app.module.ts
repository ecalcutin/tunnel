import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config';
import { TunnelModule } from '../features/tunnel';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, TunnelModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
