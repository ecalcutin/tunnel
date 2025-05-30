import { execSync } from 'node:child_process';
import fs from 'node:fs';

export class Wireguard {
  private readonly WG_CONFIG_PATH = '/etc/wireguard/wg0.conf';

  constructor() {}

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

  public apply(config: string) {
    fs.writeFileSync(this.WG_CONFIG_PATH, config, { encoding: 'utf-8' });
    execSync('wg-quick up wg0', { stdio: 'inherit' });
    execSync('wg-quick down wg0 || true', { stdio: 'inherit' });
  }
}
