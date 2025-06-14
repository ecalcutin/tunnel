import { Role } from './role.model';

export class Account {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: Role,
  ) {}
}
