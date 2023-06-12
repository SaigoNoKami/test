/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { FileService, FileType } from './file.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './images.dto';
import { Image } from 'src/entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    private fileService: FileService,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(dto: CreateImageDto, picture) {
    const imagePath = this.fileService.createFile(FileType.IMAGE, picture);
    const image = await this.imageRepository.save({
        description: dto.description,
        file:imagePath
      });
    return image;
  }
  async delete(id: number): Promise<number> {
    this.imageRepository.delete({ id });
    return HttpStatus.OK;
  }
}
