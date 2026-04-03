import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Req, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '@decorators';
import { Product } from './entities/product.entity';
import { Request } from 'express';
import { ApiMessageData, ApiMessage, ApiMessageDataPagination } from '@types';
import { PaginationQueryDto } from '@dtos';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Create a new product', type: Product })
  async CreateProduct(@Body() createProductDto: CreateProductDto, @Req() req: Request): Promise<ApiMessageData<Product>> {
    return await this.productService.CreateProduct(createProductDto, req.user.id);
  }

  @Get(':customerId')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'List all products for customer', type: Product, isArray: true })
  async getAllProducts(@Param('customerId') customerId: string, @Query() paginationQuery: PaginationQueryDto, @Req() req: Request): Promise<ApiMessageDataPagination<Product>> {
    return await this.productService.getAllProducts(paginationQuery, req.user.id, customerId);
  }

  @Get('one/:id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Get product by ID', type: Product })
  async getOneProduct(@Param('id') id: string, @Req() req: Request): Promise<ApiMessageData<Product>> {
    return await this.productService.getProduct(id, req.user.id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Update product', type: Product })
  async UpdateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req: Request): Promise<ApiMessageData<Product>> {
    return await this.productService.UpdateProduct(id, updateProductDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Delete product' })
  async DeleteProduct(@Param('id') id: string, @Req() req: Request): Promise<ApiMessage> {
    return await this.productService.DeleteProduct(id, req.user.id);
  }
}
