export interface Peer {
  readonly privateKey: string;
  readonly address: string;
  readonly listenPort: number;
  readonly peers: Array<{
    readonly publicKey: string;
    readonly allowedIPs: string;
  }>;
}
