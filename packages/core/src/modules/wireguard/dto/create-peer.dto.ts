import { IsString } from 'class-validator';

export class CreatePeerDto {
  @IsString()
  readonly title!: string;
}
