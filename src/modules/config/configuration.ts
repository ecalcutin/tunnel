import { AppConfig } from './interfaces';

export default (): AppConfig => {
  return {
    wireguard: {
      WIREGUARD_PRIVATE_KEY: process.env.WIREGUARD_PRIVATE_KEY!,
      WIREGUARD_PUBLIC_KEY: process.env.WIREGUARD_PUBLIC_KEY!,
      WIREGUARD_CONFIG_PATH: process.env.WIREGUARD_CONFIG_PATH!,
      WIREGUARD_SERVER: process.env.WIREGUARD_SERVER!,
    },

    mongodb: {
      MONGO_USERNAME: process.env.MONGO_USERNAME!,
      MONGO_PASSWORD: process.env.MONGO_PASSWORD!,
      MONGO_HOST: process.env.MONGO_HOST!,
      MONGO_PORT: process.env.MONGO_PORT!,
      MONGO_DB: process.env.MONGO_DB!,
      MONGO_AUTH_DB: process.env.MONGO_AUTH_DB!,
    },
  };
};
