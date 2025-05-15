## Tunnel - Self-Hosted Undetectable VPN Solution

A Node.js backend for managing WireGuard VPN, providing a simple REST API for VPN management without the complexity of traditional VPN setups.

### Overview

Tunnel is a self-hosted VPN solution built with NestJS that lets you manage WireGuard interfaces, peers, and configurations through a simple REST API. It's designed to be undetectable by network censors, running as a lightweight service that can be deployed in any environment that supports Docker.

### Features

- WireGuard Management: Create and configure WireGuard interfaces
- Peer Management: Add, remove, and update peers
- Secure Key Management: Automatic private/public key generation and handling
- API-driven: Full REST API to manage your VPN programmatically
- Containerized: Ready to run in Docker with proper network capabilities

### Requirements

- Node.js v16+
- Docker (recommended for deployment)
- WireGuard kernel module on the host

### Installation

Using Docker (Recommended)

```sh
# Clone the repository
git clone https://github.com/ecalcutin/tunnel.git

# Start the development server
docker-compose -f docker-compose.dev.yml up
```

### Security Considerations

- The service requires `NET_ADMIN` and `SYS_MODULE` capabilities to manage network interfaces
- You should secure the API with proper authentication in production
- WireGuard keys are stored in the configuration and should be protected
