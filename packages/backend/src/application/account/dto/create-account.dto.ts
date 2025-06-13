import { Account } from 'core/account';

export class CreateAccountDto implements Omit<Account, 'id' | 'role'> {
  public readonly email: string;
  public readonly password: string;
}
