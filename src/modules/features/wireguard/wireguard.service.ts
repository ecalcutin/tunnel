import { execSync } from 'node:child_process';
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

  public generateKeyPair() {
    const privateKey = execSync('wg genkey', {
      encoding: 'utf-8',
    });
    const publicKey = execSync(`echo "${privateKey}" | wg pubkey`, {
      encoding: 'utf-8',
    });
    return {
      privateKey: privateKey.trim(),
      publicKey: publicKey.trim(),
    };
  }

  public apply = (config: string) => {
    writeFileSync(this.WG_CONFIG_PATH, config, { encoding: 'utf-8' });
    this.down();
    this.up();
  };

  public down = (): void => {
    execSync('wg-quick down wg0 || true', { stdio: 'inherit' });
  };
  public up = (): void => {
    execSync('wg-quick up wg0', { stdio: 'inherit' });
  };

  public readConfig = (): string => {
    const config = readFileSync(this.WG_CONFIG_PATH, { encoding: 'utf-8' });
    return config;
  };

  public writeConfig = (config: string): void => {
    writeFileSync(this.WG_CONFIG_PATH, config, { encoding: 'utf-8' });
  };
}
