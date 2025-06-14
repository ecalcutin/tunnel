import { Role } from './role.model';

export class Account {
  public readonly id: string;
  public readonly email: string;
  public readonly password: string;
  public readonly role: Role;

  constructor(partial: Partial<Account>) {
    Object.assign(this, partial);
  }
}
