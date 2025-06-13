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
}
