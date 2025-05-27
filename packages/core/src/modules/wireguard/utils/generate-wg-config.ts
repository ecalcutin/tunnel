import { type WireguardConfig } from '../interfaces';

export const generateWireguardConfig = (config: WireguardConfig): string => {
  return `
    [Interface]
    PrivateKey = ${config.privateKey}
    Address = ${config.address}
    ListenPort = ${config.listenPort}
    PostUp = ${postUpCommand()}
    PostDown = ${postDownCommand()}

    ${renderClientPeerFromTemplate(config.peers)}
    `.trim();
};

const renderClientPeerFromTemplate = (
  peers: WireguardConfig['peers'],
): string => {
  return peers
    .map(peer => {
      return `
        [Peer]
        PublicKey = ${peer.publicKey}
        AllowedIPs = ${peer.allowedIPs}
        `.trim();
    })
    .join('\n\n');
};

const postUpCommand = () => {
  return `iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE`;
};

const postDownCommand = () => {
  return `iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE`;
};
