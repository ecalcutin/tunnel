import { type Role } from '../entities';

export abstract class RoleRepositoryPort {
  abstract find(): Promise<Role[]>;
  abstract create(role: Omit<Role, 'id'>): Promise<Role>;
}
