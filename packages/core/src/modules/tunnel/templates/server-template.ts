const SERVER_TEMPLATE = `[Interface]
PrivateKey = <SERVER_PRIVATE_KEY>
Address = <SERVER_IP>
ListenPort = 51820
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

<Peers>
`;

const PEER_TEMPLATE = `
[Peer]
PublicKey = <CLIENT_PUBLIC_KEY>
AllowedIPs = <CLIENT_IP>
`;
type PeerConfigOptions = {
  readonly clientPublicKey: string;
  readonly clientIP: string;
};

type ServerConfigOptions = {
  readonly serverPrivateKey: string;
  readonly serverIP: string;
  readonly peers: Array<PeerConfigOptions>;
};

const buildPeerConfig = (options: PeerConfigOptions) => {
  return PEER_TEMPLATE.replace(
    '<CLIENT_PUBLIC_KEY>',
    options.clientPublicKey,
  ).replace('<CLIENT_IP>', options.clientIP);
};

export const jsonToServerConfig = (options: ServerConfigOptions): string => {
  return SERVER_TEMPLATE.replace(
    '<SERVER_PRIVATE_KEY>',
    options.serverPrivateKey,
  )
    .replace('<SERVER_IP>', options.serverIP)
    .replace(
      '<Peers>',
      options.peers.map(peer => buildPeerConfig(peer)).join('\n'),
    );
};
