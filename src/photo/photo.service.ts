import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
// import { HttpService } from '@nestjs/axios';
import { CreatePhotoDto } from './dto/create-photo.dto';

export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    // private readonly httpService: HttpService,
  ) {}
  create(createPhotoDto: CreatePhotoDto) {
    return this.photoRepository.save(createPhotoDto);
  }

  buyPhoto(data: any) {
    const createPhotoDto = new CreatePhotoDto();
    createPhotoDto.userid = '5';
    createPhotoDto.description = 'ffff';
    this.photoRepository.save(createPhotoDto);
  }
}
