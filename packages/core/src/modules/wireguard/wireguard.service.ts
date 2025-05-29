import { execSync } from 'node:child_process';
import fs from 'node:fs';

import { Inject, Injectable } from '@nestjs/common';
import { type Peer } from '@packages/shared';

import { AppConfigService } from '../config';

@Injectable()
export class WireguardService {
  /**
   * For simplicity, Ill use CIDR's last octet
   * Example CIDR 10.0.0.0/24
   * IP pool 10.0.0.2 - 10.0.0.254
   */
  private readonly min = 2;
  private readonly max = 254;
  private readonly allocated = new Set();
  private readonly WG_CONFIG_PATH = '/etc/wireguard/wg0.conf';

  constructor(
    @Inject(AppConfigService)
    private readonly appConfigService: AppConfigService,
  ) {}

  public async buildServerConfig(peers: Peer[]) {
    const { privateKey: serverPrivateKey, publicKey: serverPublicKey } =
      this.appConfigService.WIREGUARD!;

    const json_config = {
      serverPrivateKey,
      serverPublicKey,
      peers,
    };

    return json_config;
  }

  public async generateClientConfig() {
    const clientKeys = this.generateKeyPair();
    const adress = this.allocateIP();

    const peerConfig: Peer['config'] = {
      privateKey: clientKeys.privateKey,
      publicKey: clientKeys.publicKey,
      address: adress,
    };

    return peerConfig;
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

  private allocateIP(): string {
    for (let i = this.min; i <= this.max; i++) {
      if (!this.allocated.has(i)) {
        this.allocated.add(i);
        return `10.0.0.${i}`;
      }
    }
    throw new Error('No more available IPs');
  }

  private releaseIP(lastOctet: number): void {
    this.allocated.delete(lastOctet);
  }

  private apply(config: string) {
    fs.writeFileSync(this.WG_CONFIG_PATH, config, { encoding: 'utf-8' });
    execSync('wg-quick up wg0', { stdio: 'inherit' });
    execSync('wg-quick down wg0 || true', { stdio: 'inherit' });
  }
}
