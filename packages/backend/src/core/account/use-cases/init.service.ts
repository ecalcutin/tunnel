import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { AppConfigService } from 'infrastructure/config';

import { AccountRepositoryPort, RoleRepositoryPort } from '../ports';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    @Inject(AppConfigService) private readonly appConfig: AppConfigService,

    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,

    @Inject(RoleRepositoryPort)
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  async onModuleInit() {
    let role = await this.roleRepository.findOne({ code: 'SUPER_ADMIN' });
    if (!role) {
      role = await this.roleRepository.create({
        code: 'SUPER_ADMIN',
        description: 'Super admin',
      });
    }

    let account = await this.accountRepository.findOne({
      email: this.appConfig.ADMIN_EMAIL,
    });
    if (!account) {
      account = await this.accountRepository.create({
        email: this.appConfig.ADMIN_EMAIL,
        password: this.appConfig.ADMIN_PASSWORD,
        role: role,
      });
    }
  }
}
