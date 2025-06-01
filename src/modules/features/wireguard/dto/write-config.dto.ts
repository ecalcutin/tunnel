import { IsString } from 'class-validator';

export class WriteConfigDto {
  @IsString()
  config!: string;
}
