import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Req, Put, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto, GetCustomersFilterDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '@decorators';
import { Customer } from './entities/customer.entity';
import { Request } from 'express';
import { ApiMessageData, ApiMessage, ApiMessageDataPagination } from '@types';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Create a new customer', type: Customer })
  async CreateCustomer(@Body() createCustomerDto: CreateCustomerDto, @Req() req: Request): Promise<ApiMessageData<Customer>> {
    return await this.customerService.CreateCustomer(createCustomerDto, req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'List all customers', type: Customer, isArray: true })
  async getAllCustomers(@Query() paginationQuery: GetCustomersFilterDto, @Req() req: Request): Promise<ApiMessageDataPagination<Customer>> {
    return await this.customerService.getAllCustomers(paginationQuery, req.user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Get customer by ID', type: Customer })
  async getOneCustomer(@Param('id') id: string, @Req() req: Request): Promise<ApiMessageData<Customer>> {
    return await this.customerService.getOneCustomer(id, req.user.id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Update customer', type: Customer })
  async UpdateCustomer(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @Req() req: Request): Promise<ApiMessageData<Customer>> {
    return await this.customerService.UpdateCustomer(id, updateCustomerDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Delete customer' })
  async DeleteCustomer(@Param('id') id: string, @Req() req: Request): Promise<ApiMessage> {
    return await this.customerService.DeleteCustomer(id, req.user.id);
  }
}
