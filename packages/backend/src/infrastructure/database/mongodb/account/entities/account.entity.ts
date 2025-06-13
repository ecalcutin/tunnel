import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Account } from 'core/account/entities';

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

  public toDomainModel(): Account {
    return new Account({
      id: this._id.toString(),
      email: this.email,
      password: this.password,
      role: this.role.toDomainModel(),
    });
  }
}

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
AccountSchema.loadClass(AccountEntity); // https://mongoosejs.com/docs/guide.html#es6-classes
