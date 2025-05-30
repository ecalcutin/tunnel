import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument } from 'mongoose';

export type PeerDocuument = HydratedDocument<Peer>;

@Schema()
export class Peer {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly address!: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly privateKey!: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly publicKey!: string;
}

export const PeerSchema = SchemaFactory.createForClass(Peer);
