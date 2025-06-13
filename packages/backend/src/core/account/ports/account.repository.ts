import { type BaseRepositoryPort } from '../../shared';
import { Account } from '../entities/account.entity';

export interface AccountRepositoryPort extends BaseRepositoryPort<Account> {
  findByEmail(email: string): Promise<Account>;
}
