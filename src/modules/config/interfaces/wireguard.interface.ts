export interface WireguardConfig {
  readonly privateKey: string;
  readonly publicKey: string;
  readonly configPath: string;
  readonly WIREGUARD_SERVER: string;
}
