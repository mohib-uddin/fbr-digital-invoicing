import { Controller, Get, HttpCode, HttpStatus, Req, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SwaggerApiResponse } from '@decorators';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ApiMessageData } from '@types';
import { User } from '@entities';
import { UpdateUserDto } from './dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Get current user', type: User })
  async getCurrentUser(@Req() req: Request): Promise<ApiMessageData<User>> {
    return await this.userService.getUser(req.user.id);
  }

  @Put('/')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Update current user details', type: User })
  async updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUserDto): Promise<ApiMessageData<User>> {
    return await this.userService.updateUser(req.user.id, updateUserDto);
  }

  @Put('toggle-fbr-env')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Toggle FBR environment' })
  async toggleFbrEnv(@Req() req: Request): Promise<ApiMessageData<{ fbrEnv: string }>> {
    return await this.userService.toggleFbrEnv(req.user.id);
  }
}
