import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument } from 'mongoose';

export type AccountDocuument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly username!: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly password!: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
