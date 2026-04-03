import { User, Company } from '@entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  user: User;
  
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT authentication token' })
  access_token: string;

  @ApiPropertyOptional({ type: Company })
  company?: Company;
}
