import { type AppConfig } from './interfaces';

export default (): AppConfig => {
  return {
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL!,
    database: {
      DB_HOST: process.env.DB_HOST!,
      DB_PORT: process.env.DB_PORT!,
      DB_NAME: process.env.DB_NAME!,
      DB_USERNAME: process.env.DB_USERNAME!,
      DB_PASSWORD: process.env.DB_PASSWORD!,
    },
  };
};
