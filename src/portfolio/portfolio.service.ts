import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './portfolio.dto';
import { Portfolio } from 'src/entities/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    private configService: ConfigService,
  ) {}

  async create(dto: CreatePortfolioDto) {
    const existPortfolio = await this.portfolioRepository.findOne({
      where: {
        desctiption: dto.description,
        user: dto.user_id,
      },
    });
    if (existPortfolio) {
      throw new BadRequestException('you already have a portfolio');
    }
    const portfolio = await this.portfolioRepository.save({
      description: dto.description,
      user: dto.user_id,
    });
    return { portfolio };
  }

  async delete(accesstoken: string) {
    jwt.verify(
      accesstoken,
      this.configService.get('JWT_SECRET'),
      (err, decoded) => {
        if (err) console.error(err);
        this.portfolioRepository.delete({ user: decoded.payload.id });
      },
    );
    return HttpStatus.OK;
  }

  async getOne(id: number) {
    const existPortfolio = await this.portfolioRepository.findOne({
      where: {
        id,
      },
    });
    return existPortfolio;
  }
}
