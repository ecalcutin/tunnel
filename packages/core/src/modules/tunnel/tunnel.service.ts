import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { AppConfigService } from '../config';

import { IPAllocator, Wireguard } from './helpers';
import { jsonToClientConfig } from './templates/client-template';
import { jsonToServerConfig } from './templates/server-template';
import { TunnelRepository } from './tunnel.repository';
import { Tunnel } from './tunnel.schema';

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
    const tunnel = await this.tunnelRepository.create({
      clientIP,
      clientPrivateKey: keyPair.privateKey,
      clientPublicKey: keyPair.publicKey,
    });
    await this.hydrate();
    const clientConfig = this.buildClientConfig(tunnel);
    return clientConfig;
  }

  public read() {
    return this.tunnelRepository.read();
  }

  public async readById(id: string) {
    const tunnel = await this.tunnelRepository.readById(id);
    return this.buildClientConfig(tunnel);
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
    const conf = jsonToServerConfig({
      peers: tunnels.map(({ clientIP, clientPublicKey }) => ({
        clientIP,
        clientPublicKey,
      })),
      serverIP: this.ipAllocator.first,
      serverPrivateKey: this.appConfigService.WIREGUARD.privateKey,
    });
    this.wireguard.apply(conf);
  }

  private buildClientConfig(tunnel: Tunnel): string {
    const clientWireguardConfig = jsonToClientConfig({
      clientIP: tunnel.clientIP,
      clientPrivateKey: tunnel.clientPrivateKey,
      serverPublicKey: this.appConfigService.WIREGUARD.publicKey,
      serverIP: this.ipAllocator.first,
    });
    return clientWireguardConfig;
  }
}
