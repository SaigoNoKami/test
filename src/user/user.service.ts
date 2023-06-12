/* eslint-disable prettier/prettier */
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { CryptoService } from './crypto.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private cryptoService: CryptoService,
   private configService: ConfigService
  ) {}

  async create(dto: CreateUserDto)  {
    const existUser = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (existUser) {
      throw new BadRequestException('This email already exist');
    }
    const user = await this.userRepository.save({
        email: dto.email,
        password: await this.cryptoService.hash(dto.password)
    })
    return{user}
  }

  async login(dto: CreateUserDto){
    const existUser = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if(!existUser){
      throw new BadRequestException('invalid email')
    }

    if (this.cryptoService.compare(dto.password, existUser.password)) {
      const payload = {
        id: existUser.id,
        name: existUser.username,
        email: existUser.email,
      }
      const accesstoken:string = jwt.sign(payload, this.configService.get('JWT_SECRET'), {
        expiresIn: 3600 * 24,
      })
      const refreshtoken:string = jwt.sign(payload, this.configService.get('JWT_SECRET'), {
        expiresIn: 3600 * 24,
      })
      return({
        accesstoken: `Access ${accesstoken}`,
        refreshtoken: `Refresh ${refreshtoken}`,
      })
  }
}

async delete(accesstoken:string){
  jwt.verify(accesstoken, this.configService.get('JWT_SECRET'), (err, decoded) => {
    if (err) console.error(err)
    this.userRepository.delete({id:decoded.payload.id})
  })
  return HttpStatus.OK
}
}