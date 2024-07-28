import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
// import { HttpService } from '@nestjs/axios';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RabbitmqService } from '../config/rabbitmq/rabbitmq.service';

export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    private rabbitmq: RabbitmqService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    // private readonly httpService: HttpService,
  ) {}
  create(createPhotoDto: CreatePhotoDto) {
    return this.photoRepository.save(createPhotoDto);
  }

  async buyPhoto(data: any) {
    const createPhotoDto = new CreatePhotoDto();
    createPhotoDto.userid = '1';
    createPhotoDto.description = 'fffffsrrrff';
    const key = 'token1';
    await this.cacheManager.set(key, createPhotoDto, {
      ttl: 10000,
    } as any);
    this.rabbitmq.publish(`api.sendLoginTaskID`, 2);
    await this.photoRepository.save(createPhotoDto);
  }
}
