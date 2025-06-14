import { DatabaseConfig } from './database-config.interface';

export interface AppConfig {
  readonly database: DatabaseConfig;
  readonly ADMIN_EMAIL: string;
  readonly ADMIN_PASSWORD: string;
}
