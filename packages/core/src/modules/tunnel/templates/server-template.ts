const SERVER_TEMPLATE = `[Interface]
PrivateKey = <SERVER_PRIVATE_KEY>
Address = <SERVER_IP>
ListenPort = 51820
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
`;

const PEER_TEMPLATE = `
[Peer]
PublicKey = <CLIENT_PUBLIC_KEY>
AllowedIPs = <CLIENT_IP>
`;

export { SERVER_TEMPLATE, PEER_TEMPLATE };
