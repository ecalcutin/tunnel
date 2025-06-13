import { Inject, Injectable } from '@nestjs/common';

import { BaseService } from 'core/shared';

import { Role } from '../entities';
import { RoleRepositoryPort } from '../ports';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,
  ) {
    super(roleRepository);
  }
}
