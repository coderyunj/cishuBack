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
    console.log(111);
    console.log(222);
    return this.photoRepository.save(createPhotoDto);
  }
}
