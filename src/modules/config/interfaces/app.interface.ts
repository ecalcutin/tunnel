import { type DatabaseConfig } from './database.interface';
import { type WireguardConfig } from './wireguard.interface';

export interface AppConfig {
  readonly wireguard: WireguardConfig;
  readonly mongodb: DatabaseConfig;
}
