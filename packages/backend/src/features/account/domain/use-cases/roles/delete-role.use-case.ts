import { Inject, Injectable } from '@nestjs/common';

import { Role } from '../../models';
import { RoleRepositoryPort } from '../../ports/repositories';

@Injectable()
export class DeleteRoleByIdUseCase {
  constructor(
    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  public async execute(id: string): Promise<Role> {
    return this.roleRepository.deleteById(id);
  }
}
