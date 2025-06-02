import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { Inject, Injectable } from '@nestjs/common';

import { AppConfigService } from '../../config';
import { Tunnel } from '../tunnel/tunnel.schema';

@Injectable()
export class TemplateService {
  private readonly WG_SERVER_TEMPLATE = resolve(
    __dirname,
    './templates/wg-server.conf',
  );
  private readonly WG_CLIENT_TEMPLATE = resolve(
    __dirname,
    './templates/wg-client.conf',
  );

  constructor(
    @Inject(AppConfigService)
    private readonly appConfigService: AppConfigService,
  ) {}

  public async generateServerConfig(tunnels: Tunnel[]): Promise<string> {
    const { privateKey } = this.appConfigService.WIREGUARD;

    const template = readFileSync(this.WG_SERVER_TEMPLATE, {
      encoding: 'utf-8',
    });

    const peersTemplate = tunnels
      .map(tunnel => {
        return `[Peer]
PublicKey = ${tunnel.clientPublicKey}
AllowedIPs = ${tunnel.clientIP}/32
PersistentKeepalive = 25`;
      })
      .join('\n');

    return template
      .replace('<SERVER_PRIVATE_KEY>', privateKey)
      .replace('#<PEERS>', peersTemplate);
  }
  public async generateClientConfig(tunnel: Tunnel): Promise<string> {
    const { publicKey, WIREGUARD_SERVER } = this.appConfigService.WIREGUARD;

    const template = readFileSync(this.WG_CLIENT_TEMPLATE, {
      encoding: 'utf-8',
    });

    return template
      .replace('<CLIENT_PRIVATE_KEY>', tunnel.clientPrivateKey)
      .replace('<SERVER_PUBLIC_KEY>', publicKey)
      .replace('<SERVER_IP>', WIREGUARD_SERVER);
  }
}
