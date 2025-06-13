import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { Role } from '../entities';
import { RoleRepositoryPort } from '../ports';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  public async create(role: Omit<Role, 'id'>): Promise<Role> {
    return this.roleRepository.create(role);
  }

  public async find(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  private async seed(): Promise<void> {
    const roles = await this.roleRepository.find();
    if (!roles.length) {
      await this.roleRepository.create({
        title: 'admin',
        description: 'Administrator',
      });
    }
  }
}
