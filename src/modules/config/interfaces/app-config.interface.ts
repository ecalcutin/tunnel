import { type WireguardConfig } from './wireguard-config.interface';

export interface AppConfig {
  readonly wireguard: WireguardConfig;
}
