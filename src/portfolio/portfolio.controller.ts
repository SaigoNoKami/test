import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './portfolio.dto';

@Controller('/portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('/post')
  async create(@Body() dto: CreatePortfolioDto) {
    return this.portfolioService.create(dto);
  }

  @Delete('/delete')
  delete(@Body() access: string) {
    return this.portfolioService.delete(access);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.portfolioService.getOne(id);
  }
}
