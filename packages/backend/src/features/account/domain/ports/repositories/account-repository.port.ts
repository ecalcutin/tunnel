import { Account } from '../../models';
import { AccountQuery } from '../../queries';

export abstract class AccountRepositoryPort {
  abstract create(account: Omit<Account, 'id'>): Promise<Account>;
  abstract getById(id: string): Promise<Account>;
  abstract deleteById(id: string): Promise<Account>;
  abstract find(query?: AccountQuery): Promise<Account[]>;
  abstract findOne(query?: AccountQuery): Promise<Account | null>;

  abstract toDomainModel(entity: unknown): Account;
}
