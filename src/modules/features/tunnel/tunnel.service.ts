import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { IPAllocatorService } from '../ip-allocator';
import { WireguardService } from '../wireguard';

import { TunnelRepository } from './tunnel.repository';
import { Tunnel } from './tunnel.schema';

@Injectable()
export class TunnelService implements OnApplicationBootstrap {
  constructor(
    @Inject(WireguardService)
    private readonly wireguardService: WireguardService,

    @Inject(IPAllocatorService)
    private readonly ipAllocatorService: IPAllocatorService,

    @Inject(TunnelRepository)
    private readonly tunnelRepository: TunnelRepository,
  ) {}

  async onApplicationBootstrap() {
    const tunnels = await this.tunnelRepository.read();
    const ips = tunnels.map(tunnel => tunnel.clientIP);
    this.ipAllocatorService.allocateIPs(ips);
  }

  public async read(): Promise<Tunnel[]> {
    const tunnels = await this.tunnelRepository.read();
    return tunnels;
  }

  public async create(): Promise<Tunnel> {
    const ip = this.ipAllocatorService.allocateIP();
    const keys = this.wireguardService.generateKeyPair();
    const tunnel = await this.tunnelRepository.create({
      clientIP: ip,
      clientPrivateKey: keys.privateKey,
      clientPublicKey: keys.publicKey,
    });
    return tunnel;
  }

  public async deleteById(id: string): Promise<void> {
    const tunnel = await this.tunnelRepository.deleteById(id);
    this.ipAllocatorService.releaseIP(tunnel.clientIP);
  }
}
