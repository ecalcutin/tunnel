export interface Peer {
  readonly id: string;
  readonly title: string;
  readonly config: {
    readonly address: string;
    readonly privateKey: string;
    readonly publicKey: string;
  };
}
