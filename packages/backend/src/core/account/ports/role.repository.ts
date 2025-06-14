import { type Role } from '../models';
import { RoleQuery } from '../queries';

export abstract class RoleRepositoryPort {
  abstract create(role: Omit<Role, 'id'>): Promise<Role>;
  abstract getById(id: string): Promise<Role>;
  abstract deleteById(id: string): Promise<Role>;
  abstract find(query?: RoleQuery): Promise<Role[]>;
  abstract findOne(query?: RoleQuery): Promise<Role | null>;
}
