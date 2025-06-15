import { Role } from 'features/account/domain/models';

export class CreateRoleDto implements Omit<Role, 'id'> {
  public readonly code: string;
  public readonly description: string;
}
