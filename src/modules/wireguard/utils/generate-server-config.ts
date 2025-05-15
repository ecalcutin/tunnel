import { type Peer } from '../interfaces';

export const generateServerConfig = (serverPeer: Peer) => {
  return `
    [Interface]
    PrivateKey = ${serverPeer.privateKey}
    Address = ${serverPeer.address}
    ListenPort = ${serverPeer.listenPort}
    PostUp = ${postUpCommand()}
    PostDown = ${postDownCommand()}

    ${renderClientPeerFromTemplate(serverPeer.peers)}
    `.trim();
};

const renderClientPeerFromTemplate = (peers: Peer['peers']): string => {
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

export const postUpCommand = () => {
  return `iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE`;
};

export const postDownCommand = () => {
  return `iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE`;
};
