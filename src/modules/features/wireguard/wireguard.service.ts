import { Inject, Injectable } from '@nestjs/common';

import { AppConfigService } from '../../config';

@Injectable()
export class WireguardService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(
    @Inject(AppConfigService)
    private readonly appConfigService: AppConfigService,
  ) {
    const wireguardConfig = appConfigService.WIREGUARD;
    this.privateKey = wireguardConfig.privateKey;
    this.publicKey = wireguardConfig.publicKey;
  }
}
