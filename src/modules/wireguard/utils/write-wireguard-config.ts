import fs from 'node:fs';

const DEFAULT_PATH = '/etc/wireguard/wg0.conf';

export default (config: string, pathToConfig: string = DEFAULT_PATH): void => {
  fs.writeFileSync(pathToConfig, config, { encoding: 'utf-8' });
};
