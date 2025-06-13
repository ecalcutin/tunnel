import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { RoleService } from 'core/account/use-cases';

import { CreateRoleDto } from './dto';

@Controller('/roles')
export class RolesController {
  constructor(@Inject(RoleService) private readonly roleService: RoleService) {}

  @Get('/')
  async find() {
    return this.roleService.find();
  }

  @Post('/')
  async create(@Body() role: CreateRoleDto) {
    return this.roleService.create(role);
  }
}
