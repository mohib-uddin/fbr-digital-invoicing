import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Customer } from '../customer/entities/customer.entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiMessageData, ApiMessage, ApiMessageDataPagination, SortEnum } from '@types';
import { SuccessResponseMessages } from '@messages';
import { PaginationQueryDto } from '@dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async CreateProduct(createProductDto: CreateProductDto, userId: string): Promise<ApiMessageData<Product>> {
    const { customerId } = createProductDto;

    // Validate that the customer is owned by the user
    const customer = await this.customerRepository.findOne({
      where: { id: customerId, userId },
    });

    if (!customer) {
      throw new BadRequestException('Selected customer not found or does not belong to your account');
    }

    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    
    return {
      message: SuccessResponseMessages.successGeneral,
      data: savedProduct,
    };
  }

  async getAllProducts(paginationQuery: PaginationQueryDto, userId: string, customerId: string): Promise<ApiMessageDataPagination<Product>> {
    // Validate customer ownership
    const customer = await this.customerRepository.findOne({ where: { id: customerId, userId } });
    if (!customer) throw new BadRequestException('Selected customer not found or does not belong to your account');

    const { page = 1, limit = 1000, query, sort = SortEnum.DESC } = paginationQuery;
    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .where('product.customerId = :customerId', { customerId });

    if (query) {
      queryBuilder.andWhere('(product.name ILIKE :query OR product.hsCode ILIKE :query)', { query: `%${query}%` });
    }

    queryBuilder.orderBy('product.createdAt', sort);

    const [products, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      message: SuccessResponseMessages.successGeneral,
      data: products,
      page,
      lastPage: Math.ceil(total / limit),
      total,
    };
  }

  async getProduct(id: string, userId: string): Promise<ApiMessageData<Product>> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.customer', 'customer')
      .where('product.id = :id', { id })
      .andWhere('customer.userId = :userId', { userId })
      .getOne();

    if (!product) throw new NotFoundException('Product not found');
    return {
      message: SuccessResponseMessages.successGeneral,
      data: product,
    };
  }

  async UpdateProduct(id: string, updateProductDto: UpdateProductDto, userId: string): Promise<ApiMessageData<Product>> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.customer', 'customer')
      .where('product.id = :id', { id })
      .andWhere('customer.userId = :userId', { userId })
      .getOne();

    if (!product) throw new NotFoundException('Product not found');
    
    Object.assign(product, updateProductDto);
    const savedProduct = await this.productRepository.save(product);
    
    return {
      message: SuccessResponseMessages.successGeneral,
      data: savedProduct,
    };
  }

  async DeleteProduct(id: string, userId: string): Promise<ApiMessage> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.customer', 'customer')
      .where('product.id = :id', { id })
      .andWhere('customer.userId = :userId', { userId })
      .getOne();

    if (!product) throw new NotFoundException('Product not found');

    await this.productRepository.delete({ id });
    return {
      message: SuccessResponseMessages.successGeneral,
    };
  }
}
