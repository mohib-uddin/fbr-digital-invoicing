import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEnum, IsArray, ValidateNested, IsNumber, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { Trim } from '@decorators';
import { InvoiceType, BuyerRegistrationType } from '../types';

export class CreateInvoiceItemDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ description: 'ID of the product' })
  productId: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: 'Goods at standard rate (default)' })
  saleType: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 18 })
  taxRate: number;

  @IsNumber()
  @Min(0.001)
  @ApiProperty({ example: 2 })
  qty: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 260 })
  unitPrice: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 520 })
  amountExclTax: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 0 })
  fixedNotifiedValue?: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 93.6 })
  salesTaxApplicable: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 0 })
  salesTaxWithheldAtSource?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 0 })
  extraTax?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 0 })
  furtherTax?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 0 })
  fedPayable?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 0 })
  discount?: number;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: '--SELECT--' })
  sroScheduleNo?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: '--SELECT--' })
  sroItemSerialNo?: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 613.6 })
  totalAmount: number;
}

export class CreateInvoiceDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2026-04-03' })
  invoiceDate: string;

  @IsEnum(InvoiceType)
  @IsNotEmpty()
  @ApiProperty({ enum: InvoiceType, example: InvoiceType.SALE_INVOICE })
  invoiceType: InvoiceType;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: 'REF-12345' })
  invoiceRefNo?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: 'Wholesale sale' })
  remarks?: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ description: 'ID of the associated customer' })
  customerId: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ description: 'ID of the associated company (optional, defaults to user default company)' })
  companyId?: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  @ApiProperty({ type: CreateInvoiceItemDto, isArray: true })
  items: CreateInvoiceItemDto[];
}
