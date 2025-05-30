import { IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  readonly username!: string;

  @IsString()
  readonly password!: string;
}
