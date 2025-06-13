import { type Account } from '../entities';

export abstract class AccountRepositoryPort {
  abstract find(): Promise<Account[]>;
  abstract create(account: Partial<Account>): Promise<Account>;
}
