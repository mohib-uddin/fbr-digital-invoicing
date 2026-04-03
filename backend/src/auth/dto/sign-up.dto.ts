import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, Matches, Min } from 'class-validator';
import { RegexConstants } from '@constants';
import { ErrorResponseMessages, ErrorValidationMessage } from '@messages';
import { Trim } from '@decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SignupDto {
  @IsString()
  @Trim()
  @IsNotEmpty()
  @ApiProperty({ description: 'First name of the user' })
  firstName: string;

  @IsString()
  @Trim()
  @IsNotEmpty()
  @ApiProperty({ description: 'Last name of the user' })
  lastName: string;

  @IsString()
  @Trim()
  @IsEmail()
  @ApiProperty({ description: 'Email of the user' })
  email: string;

  @IsString()
  @Trim()
  @IsNotEmpty()
  @Matches(RegexConstants.PASSWORD, { message: ErrorResponseMessages.passwordFormat })
  @ApiProperty({ description: 'Minimum 8 characters password of the user' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ description: 'Company Name' })
  companyName: string;

  @IsString()
  @Trim()
  @IsNotEmpty()
  @ApiProperty({ description: 'FBR Token' })
  fbrToken: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiProperty({ description: 'FBR Environment', enum: ['sandbox', 'production'], default: 'sandbox', required: false })
  fbrEnv?: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @ApiProperty({ description: 'NTN Number' })
  ntn: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiProperty({ description: 'CNIC Number', required: false })
  cnic?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiProperty({ description: 'Province', required: false })
  province?: string;

  @IsString()
  @IsOptional()
  @Trim()
  @ApiProperty({ description: 'Address', required: false })
  address?: string;
}
