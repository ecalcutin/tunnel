import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { type AppConfig } from './interfaces';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService<AppConfig>,
  ) {}

  get DATABASE() {
    return this.configService.get('database', { infer: true })!;
  }

  get ADMIN_EMAIL() {
    return this.configService.get('ADMIN_EMAIL');
  }

  get ADMIN_PASSWORD() {
    return this.configService.get('ADMIN_PASSWORD');
  }
}
