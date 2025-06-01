import { Module } from '@nestjs/common';

import { AppConfigModule } from '../config';


import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,
    
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
