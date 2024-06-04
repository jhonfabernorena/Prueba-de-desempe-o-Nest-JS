

import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsEmail()
  readonly email: string;

}
