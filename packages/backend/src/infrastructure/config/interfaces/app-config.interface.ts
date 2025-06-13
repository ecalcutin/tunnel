import { DatabaseConfig } from './database-config.interface';

export interface AppConfig {
  readonly database: DatabaseConfig;
}
