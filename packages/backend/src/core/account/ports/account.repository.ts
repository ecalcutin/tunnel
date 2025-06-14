import { type Account } from '../models';
import { AccountQuery } from '../queries';

export abstract class AccountRepositoryPort {
  abstract find(query?: AccountQuery): Promise<Account[]>;
  abstract findOne(query?: AccountQuery): Promise<Account | null>;
  abstract create(account: Partial<Account>): Promise<Account>;
  abstract deleteById(id: string): Promise<Account>;
  abstract toDomainModel(entity: unknown): Account;
}
