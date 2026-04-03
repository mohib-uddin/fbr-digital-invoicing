import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '@dtos';
import { CustomerRegistrationStatus } from '../types';

export class GetCustomersFilterDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(CustomerRegistrationStatus)
  @ApiPropertyOptional({ enum: CustomerRegistrationStatus })
  registrationStatus?: CustomerRegistrationStatus;
}
