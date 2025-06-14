import { type Role } from '../models';
import { RoleQuery } from '../queries';

export abstract class RoleRepositoryPort {
  abstract find(): Promise<Role[]>;
  abstract findOne(query?: RoleQuery): Promise<Role | null>;
  abstract create(role: Omit<Role, 'id'>): Promise<Role>;
}
