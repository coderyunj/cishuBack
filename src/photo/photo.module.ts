import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { HttpModule } from '@nestjs/axios';
import { PhotoController } from './photo.contoller';
import { PhotoService } from './photo.service';
import { RabbitmqModule } from "../config/rabbitmq/rabbitmq.module";

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), HttpModule, RabbitmqModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
