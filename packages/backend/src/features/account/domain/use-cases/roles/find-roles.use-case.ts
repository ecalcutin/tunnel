import { Inject, Injectable } from '@nestjs/common';

import { Role } from '../../models';
import { RoleRepositoryPort } from '../../ports/repositories';

@Injectable()
export class FindRolesUseCase {
  constructor(
    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  public async execute(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
