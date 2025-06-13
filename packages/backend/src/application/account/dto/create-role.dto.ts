import { Role } from 'core/account/entities';

export class CreateRoleDto implements Role {
  public readonly title!: string;
  public readonly description!: string;
}
