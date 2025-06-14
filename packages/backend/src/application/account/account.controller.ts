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
import {
  CreateAccountUseCase,
  FindAccountsUseCase,
  DeleteAccountByIdUseCase,
} from 'core/account/use-cases';

import { CreateAccountDto } from './dto';

@Controller('/accounts')
export class AccountController {
  constructor(
    @Inject(CreateAccountUseCase)
    private readonly createAccount: CreateAccountUseCase,

    @Inject(FindAccountsUseCase)
    private readonly findAccounts: FindAccountsUseCase,

    @Inject(DeleteAccountByIdUseCase)
    private readonly deleteAccountUseCase: DeleteAccountByIdUseCase,
  ) {}

  @Post('/')
  async create(@Body() account: CreateAccountDto) {
    return this.createAccount.execute(account);
  }

  @Get('/')
  async find(@Query() query: AccountQuery) {
    return this.findAccounts.execute(query);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    return this.deleteAccountUseCase.execute(id);
  }
}
