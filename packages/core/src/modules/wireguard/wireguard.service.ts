import { Inject, Injectable } from '@nestjs/common';

import { AppConfigService } from '../config';

import { generateServerConfig } from './utils/generate-server-config';
import writeWireguardConfig from './utils/write-wireguard-config';

@Injectable()
export class WireguardService {
  constructor(
    @Inject(AppConfigService)
    private readonly appConfigService: AppConfigService,
  ) {}

  public async readInterfaces() {
    return [];
  }

  public async createInterface() {
    const serverInterface = this.buildServerConfig();
    this.saveServerConfig(serverInterface);
    return serverInterface;
  }

  private saveServerConfig(config: string): void {
    writeWireguardConfig(config);
  }

  private buildServerConfig(): string {
    const { privateKey, publicKey } = this.appConfigService.WIREGUARD!;
    const serverConfig = generateServerConfig({
      privateKey: privateKey,
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
