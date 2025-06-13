import { type BaseRepositoryPort } from 'core/shared';

import { type Account } from '../entities';

export interface AccountRepositoryPort extends BaseRepositoryPort<Account> {
  findByEmail(email: string): Promise<Account | null>;
}
