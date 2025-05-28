import { execSync } from 'node:child_process';
import fs from 'node:fs';

const WG_CONFIG_PATH = '/etc/wireguard/wg0.conf';

class WireguardIPPool {
  /**
   * For simplicity, Ill use CIDR's last octet
   * Example CIDR 10.0.0.0/24
   * IP pool 10.0.0.2 - 10.0.0.254
   */
  private readonly min = 2;
  private readonly max = 254;
  private readonly allocated = new Set();

  protected getAllocatedIPs(): Array<string> {
    return Array.from(this.allocated).map(octet => `10.0.0.${octet}`);
  }

  public release(lastOctet: number): void {
    this.allocated.delete(lastOctet);
  }
  public allocate(): string {
    for (let i = this.min; i <= this.max; i++) {
      if (!this.allocated.has(i)) {
        this.allocated.add(i);
        return `10.0.0.${i}`;
      }
    }
    throw new Error('No more available IPs');
  }
}

/**
 * Wireguard basic utils with simple IP pool
 */
export class Wireguard extends WireguardIPPool {
  public apply(config: string): void {
    fs.writeFileSync(WG_CONFIG_PATH, config, { encoding: 'utf-8' });
    this.down();
    this.up();
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

  private up(): void {
    execSync('wg-quick up wg0', { stdio: 'inherit' });
  }

  private down(): void {
    execSync('wg-quick down wg0 || true', { stdio: 'inherit' });
  }
}
