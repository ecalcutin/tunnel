import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Account } from 'core/account/entities';

@Schema()
export class AccountEntity implements Account {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly email!: string;

  @Prop({
    type: String,
    required: true,
  })
  public password!: string;
}

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
