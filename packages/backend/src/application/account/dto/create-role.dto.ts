import { Role } from 'core/account/entities';

export class CreateRoleDto implements Omit<Role, 'id'> {
  public readonly title: string;
  public readonly description: string;
}
