import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';

import { Account, AccountRepositoryPort } from 'core/account';

import { Database } from '../../shared';
import { BaseRepository } from '../../shared/base.repository';

@Injectable()
export class AccountRepositoryPostgresAdapter
  extends BaseRepository<Account>
  implements AccountRepositoryPort
{
  constructor(@Inject('POSTGRES_DB') protected readonly db: Kysely<Database>) {
    super(db, 'accounts');
  }
}
