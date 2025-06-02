import { Injectable } from '@nestjs/common';
import { ip2long, long2ip, Netmask } from 'netmask';

@Injectable()
export class IPAllocatorService {
  private readonly block: Netmask;
  private readonly allocated: Set<string>;
  public readonly first: string;

  constructor(net: string = '10.0.0.0/24') {
    this.block = new Netmask(net);
    this.allocated = new Set();
    this.first = this.block.first;
    this.allocated.add(this.block.first);
    this.allocated.add(this.block.base);
    this.allocated.add(this.block.broadcast);
  }

  public allocateIP(): string {
    let currentLong = ip2long(this.block.first);
    const lastLong = ip2long(this.block.last);

    while (currentLong <= lastLong) {
      const ip = long2ip(currentLong);

      if (!this.allocated.has(ip)) {
        this.allocated.add(ip);
        return ip;
      }

      currentLong++;
    }

    throw new Error('No available IP addresses in the block');
  }

  public releaseIP(ip: string) {
    if (this.allocated.has(ip)) {
      this.allocated.delete(ip);
    }
  }

  public allocateIPs(ips: string[]) {
    ips.forEach(ip => this.allocated.add(ip));
  }
}
