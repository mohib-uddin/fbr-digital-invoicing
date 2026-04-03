import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Trim } from '@decorators';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: 'Leather Jacket' })
  name: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: 'Clothing' })
  category?: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: '4201.0000' })
  hsCode: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: 'PCS' })
  uom: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 1500 })
  salePrice?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 1000 })
  purchasePrice?: number;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: 'Genuine leather jacket' })
  remarks?: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ description: 'ID of the associated customer' })
  customerId: string;
}
