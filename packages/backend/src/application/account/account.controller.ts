import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { AccountService } from 'core/account/use-cases';

import { CreateAccountDto } from './dto';

@Controller('/accounts')
export class AccountController {
  constructor(
    @Inject(AccountService) private readonly accountService: AccountService,
  ) {}

  @Post('/')
  async create(@Body() account: CreateAccountDto) {
    return this.accountService.create(account);
  }

  @Get('/')
  async find() {
    return this.accountService.find();
  }
}
