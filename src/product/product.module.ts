import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { HttpModule } from '@nestjs/axios';
import { ProductController } from './product.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Product]), HttpModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
