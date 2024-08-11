import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('商品')
@Controller('category') // 前缀
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '创建商品' })
  @Post('/create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto, '111');
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: '查询单个商品详情' })
  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    console.log(id, 'id');
    return this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: '查询所有分类' })
  @Get('/getList')
  getList() {
    return this.categoryService.getList();
  }

  @ApiOperation({ summary: '更新用户' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateProductDto) {
    return this.categoryService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
