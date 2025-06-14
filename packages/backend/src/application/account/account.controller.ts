import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { AccountQuery } from 'core/account/queries';
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
  async find(@Query() query: AccountQuery) {
    return this.accountService.find(query);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    return this.accountService.deleteById(id);
  }
}
