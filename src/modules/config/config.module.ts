import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './config.service';
import configuration from './configuration';
import { ENV_VALIDATION } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: ENV_VALIDATION,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
