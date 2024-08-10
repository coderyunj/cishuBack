import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('商品')
@Controller('product') // 前缀
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: '创建商品' })
  @Post('/create')
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto, '111');
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: '查询单个商品详情' })
  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    console.log(id, 'id');
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: '查询所有商品' })
  @Get('/getList')
  getList() {
    return this.productService.getList();
  }

  @ApiOperation({ summary: '更新用户' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateProductDto) {
    return this.productService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
