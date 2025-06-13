import { BaseRepositoryPort } from 'core/shared';

import { type Role } from '../entities';

export abstract class RoleRepositoryPort extends BaseRepositoryPort<Role> {}
