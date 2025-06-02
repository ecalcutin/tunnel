import { Controller, Inject } from '@nestjs/common';

import { TunnelService } from './tunnel.service';

@Controller('/tunnel')
export class TunnelController {
  constructor(
    @Inject(TunnelService) private readonly tunnelService: TunnelService,
  ) {}
}
