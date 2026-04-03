import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CustomerRegistrationStatus } from '../types';
import { Trim } from '@decorators';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: 'ABC Business' })
  name: string;

  @IsEnum(CustomerRegistrationStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: CustomerRegistrationStatus })
  registrationStatus: CustomerRegistrationStatus;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: '7391617' })
  ntn?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: '42101-1234567-1' })
  cnic?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: 'Retail' })
  businessType?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: 'John Doe' })
  contactPerson?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: '+923001234567' })
  contactNo?: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: '123 Street Office 1' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ example: 'SINDH' })
  province: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: 'Karachi' })
  city?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: 'Pakistan' })
  country?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiPropertyOptional({ example: 'Wholesale customer' })
  remarks?: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: '00000000-0000-0000-0000-000000000000' })
  companyId?: string;
}
