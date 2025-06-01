import { AppConfig } from './interfaces';

export default (): AppConfig => {
  return {
    wireguard: {
      privateKey: process.env.WIREGUARD_PRIVATE_KEY!,
      publicKey: process.env.WIREGUARD_PUBLIC_KEY!,
      configPath: process.env.WIREGUARD_CONFIG_PATH!,
    },
  };
};
