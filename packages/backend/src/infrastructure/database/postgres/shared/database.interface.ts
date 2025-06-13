import { AccountEntity, RoleEntity } from '../account/entities';

export interface Database {
  accounts: AccountEntity;
  roles: RoleEntity;
}
