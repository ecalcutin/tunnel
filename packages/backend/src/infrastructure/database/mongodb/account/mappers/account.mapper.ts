import { Account, Role } from 'core/account';

import { AccountDocument, RoleDocument } from '../entities';

export class AccountDomainMapper {
  static toDomainModel(entity: AccountDocument): Account {
    const account = entity.toJSON();

    return new Account({
      id: account._id.toString(),
      email: account.email,
      password: account.password,
      role: this.mapRole(account.role),
    });
  }

  private static mapRole(role: unknown): Role {
    const isRole = (role: unknown): role is RoleDocument => {
      if (role && typeof role === 'object' && 'code' in role) return true;
      return false;
    };

    if (isRole(role)) {
      return new Role({
        id: role._id.toString(),
        code: role.code,
        description: role.description,
      });
    } else {
      throw new Error('Role must be populated.');
    }
  }
}
