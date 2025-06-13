import { Controller, Get, Inject } from '@nestjs/common';

import { AccountService } from '../../core/account/use-cases/account.service';

@Controller('/accounts')
export class AccountController {
  constructor(
    @Inject(AccountService) private readonly accountService: AccountService,
  ) {}

  @Get('/')
  async read() {
    return this.accountService.read();
  }
}
