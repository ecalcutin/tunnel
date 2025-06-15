import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { RoleService } from 'features/account/domain/use-cases';

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
}
