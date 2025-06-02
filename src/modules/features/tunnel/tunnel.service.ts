import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { IPAllocatorService } from '../ip-allocator';
import { TemplateService, WireguardService } from '../wireguard';

import { TunnelRepository } from './tunnel.repository';
import { Tunnel } from './tunnel.schema';

@Injectable()
export class TunnelService implements OnApplicationBootstrap {
  constructor(
    @Inject(WireguardService)
    private readonly wireguardService: WireguardService,

    @Inject(TemplateService) private readonly templateService: TemplateService,

    @Inject(IPAllocatorService)
    private readonly ipAllocatorService: IPAllocatorService,

    @Inject(TunnelRepository)
    private readonly tunnelRepository: TunnelRepository,
  ) {}

  async onApplicationBootstrap() {
    const tunnels = await this.tunnelRepository.read();
    const ips = tunnels.map(tunnel => tunnel.clientIP);
    this.ipAllocatorService.allocateIPs(ips);
    const config = await this.templateService.generateServerConfig(tunnels);
    console.log(tunnels);
    console.log(config);
  }

  public async read(): Promise<Tunnel[]> {
    const tunnels = await this.tunnelRepository.read();
    return tunnels;
  }

  public async readWireguardConfigById(id: string): Promise<string> {
    const tunnel = await this.tunnelRepository.readById(id);
    const config = await this.templateService.generateClientConfig(tunnel);
    return config;
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
