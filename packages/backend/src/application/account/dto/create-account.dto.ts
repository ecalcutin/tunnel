import { Account } from 'core/account/entities';

export class CreateAccountDto implements Account {
  public readonly email!: string;
  public readonly password!: string;
}
