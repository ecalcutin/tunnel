import { Account } from 'core/account';

import { AccountDocument, RoleDocument } from '../entities';

import { RoleDomainMapper } from './role.mapper';

export class AccountDomainMapper {
  static toDomainModel(entity: AccountDocument): Account {
    const account = entity.toJSON();

    return new Account(
      account._id.toString(),
      entity.email,
      entity.password,
      RoleDomainMapper.toDomainModel(entity.role as RoleDocument),
    );
  }
}
