const CLIENT_TEMPLATE = `[Interface]
PrivateKey = <CLIENT_PRIVATE_KEY>
Address = <CLIENT_IP>
DNS = 8.8.8.8

[Peer]
PublicKey = <SERVER_PUBLIC_KEY>
Endpoint = <SERVER_PUBLIC_IP>:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25`;

export { CLIENT_TEMPLATE };
