import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument } from 'mongoose';

export type TunnelDocuument = HydratedDocument<Tunnel>;

@Schema()
export class Tunnel {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly clientIP!: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly clientPrivateKey!: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly clientPublicKey!: string;
}

export const TunnelSchema = SchemaFactory.createForClass(Tunnel);
