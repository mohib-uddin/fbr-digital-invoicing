import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ description: 'FBR security token' })
  @IsOptional()
  @IsString()
  fbrToken?: string;

  @ApiPropertyOptional({ enum: ['sandbox', 'production'], default: 'sandbox' })
  @IsOptional()
  @IsEnum(['sandbox', 'production'])
  fbrEnv?: string;

  @ApiPropertyOptional({ example: '7391617' })
  @IsOptional()
  @IsString()
  ntn?: string;

  @ApiPropertyOptional({ example: '42101-1234567-1' })
  @IsOptional()
  @IsString()
  cnic?: string;

  @ApiPropertyOptional({ example: 'Emaq Leather' })
  @IsOptional()
  @IsString()
  businessName?: string;

  @ApiPropertyOptional({ example: 'SINDH' })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiPropertyOptional({ example: 'Plot# 356/1, Sector-7a, Korangi...' })
  @IsOptional()
  @IsString()
  address?: string;
}
