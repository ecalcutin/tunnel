import { Account } from '../../../core/account/entities/account.entity';

export class CreateAccountDto implements Account {
  public readonly email!: string;
  public readonly password!: string;
}
