import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';

import {
  CreateRoleUseCase,
  FindRolesUseCase,
  DeleteRoleByIdUseCase,
} from 'features/account/domain/use-cases';

import { CreateRoleDto } from '../dto';

@Controller('/roles')
export class RolesController {
  constructor(
    @Inject(CreateRoleUseCase) private readonly createRole: CreateRoleUseCase,
    @Inject(FindRolesUseCase) private readonly findRoles: FindRolesUseCase,
    @Inject(DeleteRoleByIdUseCase)
    private readonly deleteRoleById: DeleteRoleByIdUseCase,
  ) {}

  @Post('/')
  async create(@Body() role: CreateRoleDto) {
    return this.createRole.execute(role);
  }

  @Get('/')
  async find() {
    return this.findRoles.execute();
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    return this.deleteRoleById.execute(id);
  }
}
