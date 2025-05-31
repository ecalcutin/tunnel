const CLIENT_TEMPLATE = `[Interface]
PrivateKey = <CLIENT_PRIVATE_KEY>
Address = <CLIENT_IP>
DNS = 8.8.8.8

[Peer]
PublicKey = <SERVER_PUBLIC_KEY>
Endpoint = <SERVER_PUBLIC_IP>:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25`;

type ClientConfigOptions = {
  readonly clientPrivateKey: string;
  readonly serverPublicKey: string;
  readonly serverIP: string;
  readonly clientIP: string;
};

export const jsonToClientConfig = (options: ClientConfigOptions) => {
  return CLIENT_TEMPLATE.replace(
    '<CLIENT_PRIVATE_KEY>',
    options.clientPrivateKey,
  )
    .replace('<CLIENT_IP>', options.clientIP)
    .replace('<SERVER_PUBLIC_KEY>', options.serverPublicKey)
    .replace('<SERVER_PUBLIC_IP>', options.serverIP);
};
