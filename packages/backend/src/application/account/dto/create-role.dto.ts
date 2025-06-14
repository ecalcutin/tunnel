import { Role } from 'core/account/models';

export class CreateRoleDto implements Omit<Role, 'id'> {
  public readonly code: string;
  public readonly description: string;
}
