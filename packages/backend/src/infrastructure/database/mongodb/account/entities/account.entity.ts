import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Account } from 'core/account/models';

import { RoleEntity } from './role.entity';

export type AccountDocument = HydratedDocument<AccountEntity>;

@Schema()
export class AccountEntity implements Omit<Account, 'id' | 'role'> {
  public readonly _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly email: string;

  @Prop({
    type: String,
    required: true,
  })
  public password: string;

  @Prop({
    type: Types.ObjectId,
    ref: RoleEntity.name,
    required: false,
  })
  public role: RoleEntity;
}

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
