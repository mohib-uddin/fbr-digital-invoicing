import { Controller, Post, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto, EmailVerificationDto, ForgotPasswordDto, ForgotPassChangeDto, ValidateCodeDto, ResendCodeDto, UpdatePasswordDto, LoginResponseDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, SwaggerApiResponse } from '@decorators';
import { ApiMessageData, ApiMessage } from '@types';
import { Request } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Login', type: LoginResponseDto })
  async login(@Body() reqBody: LoginDto): Promise<ApiMessageData<LoginResponseDto>> {
    return await this.authService.login(reqBody);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Signup', type: LoginResponseDto })
  async signUp(@Body() reqBody: SignupDto): Promise<ApiMessageData<LoginResponseDto>> {
    return await this.authService.signUp(reqBody);
  }

  @Public()
  @Post('email-verification')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse('Email Verification')
  async verifyEmail(@Body() reqBody: EmailVerificationDto): Promise<ApiMessage> {
    return await this.authService.verifyEmail(reqBody);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse('Forgot Password')
  async forgotPassword(@Body() reqBody: ForgotPasswordDto): Promise<ApiMessage> {
    return await this.authService.forgotPassword(reqBody);
  }

  @Public()
  @Post('forgot-password/change-password')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse('Reset Password')
  async forgotPasswordChange(@Body() reqBody: ForgotPassChangeDto): Promise<ApiMessage> {
    return await this.authService.changePassword(reqBody);
  }

  @Public()
  @Post('forgot-password/validate-code')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse('Validate Reset Password Code')
  async validateCode(@Body() reqBody: ValidateCodeDto): Promise<ApiMessage> {
    return await this.authService.validateCode(reqBody);
  }

  @Public()
  @Post('verification-code')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse('Validate Reset Password Code')
  async resendCode(@Body() reqBody: ResendCodeDto): Promise<ApiMessage> {
    return await this.authService.resendCode(reqBody);
  }

  @Post('password/update')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse('Update Password')
  async updatePassword(@Req() req: Request, @Body() reqBody: UpdatePasswordDto): Promise<ApiMessage> {
    return await this.authService.updatePassword(req.user.id, reqBody);
  }

}
