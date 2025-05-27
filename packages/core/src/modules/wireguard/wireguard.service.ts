import { Inject, Injectable } from '@nestjs/common';

import { AppConfigService } from '../config';

import { Wireguard } from './utils';
import { generateWireguardConfig } from './utils/generate-wg-config';
import { WireguardRepository } from './wireguard.repository';

@Injectable()
export class WireguardService {
  private readonly wireguard: Wireguard = new Wireguard();

  constructor(
    @Inject(AppConfigService)
    private readonly appConfigService: AppConfigService,

    @Inject(WireguardRepository)
    private readonly repository: WireguardRepository,
  ) {}

  public async readInterfaces() {
    return this.repository.read();
  }

  public async createInterface() {
    const config = this.buildServerConfig();
    this.wireguard.apply(config);

    this.repository.update({
      privateKey: 'privateKey',
      publicKey: 'publicKey',
      address: '10.0.0.1/24',
      listenPort: 51820,
      peers: [
        {
          publicKey: 'publicKey',
          allowedIPs: '10.0.0.2/32',
        },
      ],
    });

    return config;
  }

  private buildServerConfig(): string {
    const { privateKey, publicKey } = this.appConfigService.WIREGUARD!;
    const serverConfig = generateWireguardConfig({
      privateKey: privateKey,
      publicKey: publicKey,
      address: '10.0.0.1/24',
      listenPort: 51820,
      peers: [
        {
          publicKey: publicKey,
          allowedIPs: '10.0.0.2/32',
        },
      ],
    });
    return serverConfig;
  }
}
