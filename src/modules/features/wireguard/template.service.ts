import { Inject, Injectable } from '@nestjs/common';

import { AppConfigService } from '../../config';
import { Tunnel } from '../tunnel/tunnel.schema';

import { CLIENT_TEMPLATE } from './templates/wg-client.template';
import { SERVER_TEMPLATE } from './templates/wg-server.template';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(AppConfigService)
    private readonly appConfigService: AppConfigService,
  ) {}

  public async generateServerConfig(tunnels: Tunnel[]): Promise<string> {
    const { WIREGUARD_PRIVATE_KEY } = this.appConfigService.WIREGUARD;

    const peersTemplate = tunnels
      .map(tunnel => {
        return `[Peer]
PublicKey = ${tunnel.clientPublicKey}
AllowedIPs = ${tunnel.clientIP}/32
PersistentKeepalive = 25`;
      })
      .join('\n');

    return SERVER_TEMPLATE.replace(
      '<SERVER_PRIVATE_KEY>',
      WIREGUARD_PRIVATE_KEY,
    ).replace('#<PEERS>', peersTemplate);
  }
  public async generateClientConfig(tunnel: Tunnel): Promise<string> {
    const { WIREGUARD_PUBLIC_KEY, WIREGUARD_SERVER } =
      this.appConfigService.WIREGUARD;

    return CLIENT_TEMPLATE.replace(
      '<CLIENT_PRIVATE_KEY>',
      tunnel.clientPrivateKey,
    )
      .replace('<SERVER_PUBLIC_KEY>', WIREGUARD_PUBLIC_KEY)
      .replace('<SERVER_IP>', WIREGUARD_SERVER);
  }
}
