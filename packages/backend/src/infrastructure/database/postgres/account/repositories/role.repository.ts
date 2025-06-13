import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';

import { Role, RoleRepositoryPort } from 'core/account';

import { BaseRepository } from '../../shared/base.repository';

@Injectable()
export class RoleRepositoryPostgresAdapter
  extends BaseRepository<Role>
  implements RoleRepositoryPort
{
  constructor(@Inject('POSTGRES_DB') protected readonly db: Kysely<Role>) {
    super(db);
  }
}
