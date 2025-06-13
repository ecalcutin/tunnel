import { BaseRepositoryPort } from 'core/shared';

import { type Account } from '../entities';

export abstract class AccountRepositoryPort extends BaseRepositoryPort<Account> {
  abstract findByEmail(email: string): Promise<Account | null>;
}
