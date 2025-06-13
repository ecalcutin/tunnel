import { Inject, Injectable } from '@nestjs/common';

import { Role } from '../entities';
import { type RoleRepositoryPort } from '../ports';

@Injectable()
export class RoleService {
  constructor(
    @Inject('IRoleRepository')
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  public create(role: Role): Promise<Role> {
    return this.roleRepository.create(role);
  }
}
