import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Role } from 'core/account/entities';

@Schema()
export class RoleEntity implements Omit<Role, 'id'> {
  readonly _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly title: string;

  @Prop({
    type: String,
    required: true,
  })
  public description: string;

  public toDomainModel() {
    const role = new Role({
      id: this._id.toString(),
      title: this.title,
      description: this.description,
    });
    return role;
  }
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
RoleSchema.loadClass(RoleEntity);
