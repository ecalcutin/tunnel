import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { AppConfigService } from '../config';

import { IPAllocator, Wireguard } from './helpers';
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
    const ip = this.ipAllocator.allocateIP();
    const keyPair = this.wireguard.generateKeyPair();
    const tunnel = await this.tunnelRepository.create({
      ip,
      clientPrivateKey: keyPair.privateKey,
      clientPublicKey: keyPair.publicKey,
    });
    return tunnel;
  }

  public read() {
    return this.tunnelRepository.read();
  }

  public async deleteById(id: string) {
    const tunnel = await this.tunnelRepository.deleteById(id);
    this.ipAllocator.releaseIP(tunnel.ip);
    return tunnel;
  }

  private async initialize() {
    const tunnels = await this.tunnelRepository.read();
    const ips = tunnels.map(tunnel => tunnel.ip);
    this.ipAllocator.allocateIPs(ips);
  }
}
