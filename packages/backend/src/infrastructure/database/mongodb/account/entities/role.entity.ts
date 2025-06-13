import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Role } from 'core/account/entities';

@Schema()
export class RoleEntity implements Role {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly title!: string;

  @Prop({
    type: String,
    required: true,
  })
  public description!: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
