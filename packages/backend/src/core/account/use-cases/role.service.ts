import { Inject, Injectable } from '@nestjs/common';

import { Role } from '../models';
import { RoleRepositoryPort } from '../ports';

@Injectable()
export class RoleService {
  constructor(
    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  public async create(role: Omit<Role, 'id'>): Promise<Role> {
    return this.roleRepository.create(role);
  }

  public async find(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
