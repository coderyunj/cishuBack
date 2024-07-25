import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { HttpModule } from '@nestjs/axios';
import { PhotoController } from './photo.contoller';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), HttpModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
