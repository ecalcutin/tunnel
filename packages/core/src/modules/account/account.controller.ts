import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';

import { AccountService } from './account.service';
import { CreateAccountDto } from './dto';

@Controller('/accounts')
export class AccountController {
  constructor(
    @Inject(AccountService) private readonly accountService: AccountService,
  ) {}

  @Get('/')
  async read() {
    return this.accountService.read();
  }

  @Post('/')
  async create(@Body() account: CreateAccountDto) {
    return this.accountService.create(account);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    return this.accountService.deleteById(id);
  }
}
