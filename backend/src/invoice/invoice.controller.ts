import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Req, Put, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '@decorators';
import { Invoice } from './entities/invoice.entity';
import { Request } from 'express';
import { ApiMessageData, ApiMessage, ApiMessageDataPagination } from '@types';
import { PaginationQueryDto } from '@dtos';

@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Create a new invoice', type: Invoice })
  async CreateInvoice(@Body() createInvoiceDto: CreateInvoiceDto, @Req() req: Request): Promise<ApiMessageData<Invoice>> {
    return await this.invoiceService.CreateInvoice(createInvoiceDto, req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'List all invoices', type: Invoice, isArray: true })
  async getAllInvoices(@Query() paginationQuery: PaginationQueryDto, @Req() req: Request): Promise<ApiMessageDataPagination<Invoice>> {
    return await this.invoiceService.getAllInvoices(paginationQuery, req.user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Get invoice by ID', type: Invoice })
  async getOneInvoice(@Param('id') id: string, @Req() req: Request): Promise<ApiMessageData<Invoice>> {
    return await this.invoiceService.getOneInvoice(id, req.user.id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Update invoice', type: Invoice })
  async UpdateInvoice(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto, @Req() req: Request): Promise<ApiMessageData<Invoice>> {
    return await this.invoiceService.UpdateInvoice(id, updateInvoiceDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Delete invoice' })
  async DeleteInvoice(@Param('id') id: string, @Req() req: Request): Promise<ApiMessage> {
    return await this.invoiceService.DeleteInvoice(id, req.user.id);
  }
}
