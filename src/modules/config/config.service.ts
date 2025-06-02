import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig } from './interfaces';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService<AppConfig>,
  ) {}

  get WIREGUARD() {
    return this.configService.get('wireguard', { infer: true })!;
  }

  get MONGODB() {
    return this.configService.get('mongodb', { infer: true });
  }
}
