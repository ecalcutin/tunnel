import { Role } from 'features/account/domain/models';

import { RoleDocument } from '../entities';

export class RoleDomainMapper {
  static toDomainModel(entity: RoleDocument): Role {
    return new Role(entity._id.toString(), entity.code, entity.description);
  }
}
