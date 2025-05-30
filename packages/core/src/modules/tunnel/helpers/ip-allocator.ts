import { ip2long, long2ip, Netmask } from 'netmask';

export class IPAllocator {
  private readonly block: Netmask;
  private readonly allocated: Set<string>;

  constructor(net: string, alreadyAllocated: Array<string> = []) {
    this.block = new Netmask(net);
    this.allocated = new Set(alreadyAllocated);
    this.allocated.add(this.block.first);
    this.allocated.add(this.block.base);
    this.allocated.add(this.block.broadcast);
  }

  public allocateIP(): string {
    console.log(this.allocated);
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
}
