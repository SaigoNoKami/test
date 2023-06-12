/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  register(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  
  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() dto: CreateUserDto) {
    return this.userService.login(dto);
  }

  @Delete('/delete')
  delete(@Body() access: string) {
    return this.userService.delete(access);
  }

}
