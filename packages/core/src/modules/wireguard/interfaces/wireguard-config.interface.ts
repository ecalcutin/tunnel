export interface WireguardConfig {
  readonly privateKey: string;
  readonly publicKey: string;
  readonly address: string;
  readonly listenPort: number;
  readonly peers: Array<PeerConfig>;
}

export interface PeerConfig {
  readonly publicKey: string;
  readonly allowedIPs: string;
}
