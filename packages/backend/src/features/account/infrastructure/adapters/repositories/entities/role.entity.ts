import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Role } from 'features/account/domain/models';

export type RoleDocument = HydratedDocument<RoleEntity>;

@Schema()
export class RoleEntity implements Omit<Role, 'id'> {
  readonly _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly code: string;

  @Prop({
    type: String,
    required: true,
  })
  public description: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
