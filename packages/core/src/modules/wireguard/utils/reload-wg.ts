import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const reloadWG = (conf: string) => {
  const savePath = path.resolve('/etc/wireguard/', 'wg0.conf');
  fs.writeFileSync(savePath, conf, { encoding: 'utf-8' });
  deleteInterface();
  execSync('wg-quick up wg0', { stdio: 'inherit' });
};

const deleteInterface = () => {
  try {
    execSync('wg show interfaces | grep -q wg0');
    execSync('wg-quick down wg0', { stdio: 'inherit' });
  } catch (error) {
    if (error.status === 1) {
      console.log('wg0 not active, skipping down');
    } else {
      throw error;
    }
  }
};
