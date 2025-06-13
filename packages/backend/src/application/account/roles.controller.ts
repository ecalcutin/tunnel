import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';

import { RoleService } from 'core/account/use-cases';

import { CreateRoleDto } from './dto';

@Controller('/roles')
export class RolesController {
  constructor(@Inject(RoleService) private readonly roleService: RoleService) {}

  @Post('/')
  async create(@Body() role: CreateRoleDto) {
    return this.roleService.create(role);
  }

  @Get('/')
  async find() {
    return this.roleService.find();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.roleService.getById(id);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string) {
    return this.roleService.deleteById(id);
  }
}
