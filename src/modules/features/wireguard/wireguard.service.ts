import { readFileSync, writeFileSync } from 'node:fs';

import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { AppConfigService } from '../../config';

@Injectable()
export class WireguardService implements OnApplicationBootstrap {
  private readonly WG_CONFIG_PATH: string;
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(
    @Inject(AppConfigService)
    private readonly appConfigService: AppConfigService,
  ) {
    const wireguardConfig = appConfigService.WIREGUARD;
    this.privateKey = wireguardConfig.privateKey;
    this.publicKey = wireguardConfig.publicKey;
    this.WG_CONFIG_PATH = wireguardConfig.configPath;
  }

  onApplicationBootstrap() {
    this.writeConfig('');
  }

  public readConfig = (): string => {
    const config = readFileSync(this.WG_CONFIG_PATH, { encoding: 'utf-8' });
    return config;
  };

  public writeConfig = (config: string): void => {
    writeFileSync(this.WG_CONFIG_PATH, config, { encoding: 'utf-8' });
  };
}
