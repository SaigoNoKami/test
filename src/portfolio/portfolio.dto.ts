/* eslint-disable prettier/prettier */
import { MinLength } from 'class-validator';

export class CreatePortfolioDto {
  readonly user_id: number;

  @MinLength(6, {message: 'password must be more then 6 symbols'})
  readonly description: string;

}
