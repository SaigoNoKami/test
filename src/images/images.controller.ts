/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from './images.dto';
import { ImageService } from './images.service';

@Controller('/image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  create(@UploadedFiles() file, @Body() dto: CreateImageDto) {
    const image = file;
    return this.imageService.create(dto, image);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.imageService.delete(id);
  }
}
