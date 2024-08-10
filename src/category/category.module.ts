import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { HttpModule } from '@nestjs/axios';
import { CategoryController } from './category.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Category]), HttpModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
