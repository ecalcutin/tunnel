import { execSync } from 'node:child_process';
import fs from 'node:fs';

abstract class WireguardAbstract {
  abstract apply(config: string): void;
}

export class Wireguard extends WireguardAbstract {
  private readonly PATH: string;

  constructor() {
    super();
    this.PATH = '/etc/wireguard/wg0.conf';
  }

  apply(config: string): void {
    this.write(config);
    this.down();
    this.up();
  }

  public up(): void {
    execSync('wg-quick up wg0', { stdio: 'inherit' });
  }

  public down(): void {
    execSync('wg-quick down wg0 || true', { stdio: 'inherit' });
  }

  private write(config: string): void {
    fs.writeFileSync(this.PATH, config, { encoding: 'utf-8' });
  }
}
