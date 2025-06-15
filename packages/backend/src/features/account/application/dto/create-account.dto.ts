import { Account } from 'features/account/domain/models';

export class CreateAccountDto implements Omit<Account, 'id' | 'role'> {
  public readonly email: string;
  public readonly password: string;
  public readonly roleId: string;
}
