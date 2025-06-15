import { Inject, Injectable } from '@nestjs/common';

import { Role } from '../../models';
import { RoleRepositoryPort } from '../../ports/repositories';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  public async execute(role: Omit<Role, 'id'>): Promise<Role> {
    return this.roleRepository.create(role);
  }
}
