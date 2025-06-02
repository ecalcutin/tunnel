import { AppConfig } from './interfaces';

export default (): AppConfig => {
  return {
    wireguard: {
      privateKey: process.env.WIREGUARD_PRIVATE_KEY!,
      publicKey: process.env.WIREGUARD_PUBLIC_KEY!,
      configPath: process.env.WIREGUARD_CONFIG_PATH!,
      WIREGUARD_SERVER: process.env.WIREGUARD_SERVER!,
    },

    mongodb: {
      MONGO_USERNAME: process.env.MONGO_USERNAME!,
      MONGO_PASSWORD: process.env.MONGO_PASSWORD!,
      MONGO_HOST: process.env.MONGO_HOST!,
      MONGO_PORT: process.env.MONGO_PORT!,
    },
  };
};
