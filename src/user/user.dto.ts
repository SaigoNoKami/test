/* eslint-disable prettier/prettier */
import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @MinLength(6, {message: 'password must be more then 6 symbols'})
  readonly password: string;
}
