/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';
import { ImageController } from './images.controller';
import { ImageService } from './images.service';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, FileService],
})
export class ImageModule {}
