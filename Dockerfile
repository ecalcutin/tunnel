FROM amneziavpn/amnezia-wg:latest
HEALTHCHECK CMD /usr/bin/timeout 5s /bin/sh -c "/usr/bin/wg show | /bin/grep -q interface || exit 1" --interval=1m --timeout=5s --retries=3

RUN apk add --no-cache \
    dpkg \
    dumb-init \
    iptables

RUN mkdir -p /etc/wireguard && \
    chown -R 1000:1000 /etc/wireguard

# Define environment variable for WG config
ENV WG_INITIAL_CONFIG=""

RUN echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf

# Use dumb-init as the entry point to properly handle signals
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["sh", "-c", "\
    if [ -f /etc/wireguard/wg0.conf ]; then \
    wg-quick down wg0 || true; \
    rm -f /etc/wireguard/wg0.conf; \
    fi; \
    echo \"$WG_INITIAL_CONFIG\" > /etc/wireguard/wg0.conf && \
    chmod 600 /etc/wireguard/wg0.conf && \
    wg-quick up wg0 && \
    trap 'wg-quick down wg0' TERM; \
    tail -f /dev/null \
    "]