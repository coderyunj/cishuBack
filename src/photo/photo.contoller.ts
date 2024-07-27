import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}
  @Post('/create')
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @ApiOperation({ summary: '用户购买' })
  @Get('/buyPhoto')
  buyPhoto(@Query() data: any) {
    console.log(data, 'photo');
    return this.photoService.buyPhoto(data);
  }
}
