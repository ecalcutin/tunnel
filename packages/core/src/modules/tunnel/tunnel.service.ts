import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { AppConfigService } from '../config';

import { IPAllocator, Wireguard } from './helpers';
import { buildClientConfig } from './templates/client-template';
import { buildServerConfig } from './templates/server-template';
import { TunnelRepository } from './tunnel.repository';

@Injectable()
export class TunnelService implements OnApplicationBootstrap {
  private readonly ipAllocator: IPAllocator;
  private readonly wireguard: Wireguard;

  constructor(
    @Inject(AppConfigService)
    private readonly appConfigService: AppConfigService,

    @Inject(TunnelRepository)
    private readonly tunnelRepository: TunnelRepository,
  ) {
    this.ipAllocator = new IPAllocator('10.0.0.0/24');
    this.wireguard = new Wireguard();
  }

  async onApplicationBootstrap() {
    await this.initialize();
  }

  public async create() {
    const clientIP = this.ipAllocator.allocateIP();
    const keyPair = this.wireguard.generateKeyPair();
    await this.tunnelRepository.create({
      clientIP,
      clientPrivateKey: keyPair.privateKey,
      clientPublicKey: keyPair.publicKey,
    });
    const clientConfig = buildClientConfig({
      clientIP,
      clientPrivateKey: keyPair.privateKey,
      serverIP: this.ipAllocator.first,
      serverPublicKey: this.appConfigService.WIREGUARD.publicKey,
    });
    await this.hydrate();
    return clientConfig;
  }

  public read() {
    return this.tunnelRepository.read();
  }

  public async deleteById(id: string): Promise<void> {
    const tunnel = await this.tunnelRepository.deleteById(id);
    this.ipAllocator.releaseIP(tunnel.clientIP);
    await this.hydrate();
  }

  private async initialize() {
    const tunnels = await this.tunnelRepository.read();
    const ips = tunnels.map(tunnel => tunnel.clientIP);
    this.ipAllocator.allocateIPs(ips);
  }

  private async hydrate(): Promise<void> {
    const tunnels = await this.tunnelRepository.read();
    const conf = buildServerConfig({
      peers: tunnels.map(({ clientIP, clientPublicKey }) => ({
        clientIP,
        clientPublicKey,
      })),
      serverIP: this.ipAllocator.first,
      serverPrivateKey: this.appConfigService.WIREGUARD.privateKey,
    });
    this.wireguard.apply(conf);
  }
}
