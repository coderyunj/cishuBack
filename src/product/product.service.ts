import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { generateUUID, getMd5Str } from '../utils/utils';
import { categoryType } from "./dto/select-product.dto";
// import { CreatePhotoDto } from '../photo/dto/create-photo.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // 注入User实体类的Repository
    private readonly httpService: HttpService, // 注入httpService发送请求
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  findOne(id: string) {
    return this.productRepository
      .createQueryBuilder('product')
      .where('product.product_id = :id', { id })
      .getOne();
  }

  update(number: number, updateUserDto: UpdateProductDto) {}

  remove(number: number) {}

  getList() {
    console.log('11113');
    return this.productRepository.createQueryBuilder('product').getMany();
  }

  findByCategoryType(category: categoryType) {
    console.log(category, 'cate');
    return this.productRepository
      .createQueryBuilder('product')
      .select()
      .where('product.category_type = :categoryType', {
        categoryType: category.categoryType,
      })
      .getMany();
  }
}
