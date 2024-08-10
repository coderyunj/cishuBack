import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
// import { CreatePhotoDto } from '../photo/dto/create-photo.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>, // 注入User实体类的Repository
    private readonly httpService: HttpService, // 注入httpService发送请求
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    // return this.categoryRepository.save(createCategoryDto);
    return this.categoryRepository.save(createCategoryDto);
  }

  findOne(id: string) {
    return this.categoryRepository
      .createQueryBuilder('product')
      .where('product.product_id = :id', { id })
      .getOne();
  }

  update(number: number, updateUserDto: UpdateProductDto) {}

  remove(number: number) {}

  getList() {
    return this.categoryRepository.createQueryBuilder('category').getMany();
  }
}
