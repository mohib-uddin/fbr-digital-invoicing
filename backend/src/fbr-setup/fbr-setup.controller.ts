import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { FbrSetupService } from './fbr-setup.service';
import { Public, SwaggerApiResponse } from '@decorators';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { ApiMessageData } from '@types';
import { FbrProvinceResponseDto, FbrDocTypeResponseDto, FbrItemCodeResponseDto, FbrUomResponseDto, FbrRateResponseDto, FbrScenarioResponseDto } from './dto/fbr-responses.dto';

@ApiTags('fbr-setup')
@Controller('fbr-setup')
export class FbrSetupController {
  constructor(private readonly fbrSetupService: FbrSetupService) {}

  @Get('provinces')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'companyId', required: true })
  @SwaggerApiResponse({ description: 'Get province codes', type: FbrProvinceResponseDto, isArray: true })
  getProvinces(@Query('companyId') companyId: string): Promise<ApiMessageData<FbrProvinceResponseDto[]>> {
    return this.fbrSetupService.getProvinces(companyId);
  }

  @Get('doctype-codes')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'companyId', required: true })
  @SwaggerApiResponse({ description: 'Get document type codes', type: FbrDocTypeResponseDto, isArray: true })
  getDocTypes(@Query('companyId') companyId: string): Promise<ApiMessageData<FbrDocTypeResponseDto[]>> {
    return this.fbrSetupService.getDocTypes(companyId);
  }

  @Get('itemcode')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'companyId', required: true })
  @SwaggerApiResponse({ description: 'Get item codes', type: FbrItemCodeResponseDto, isArray: true })
  getItemCodes(@Query('companyId') companyId: string): Promise<ApiMessageData<FbrItemCodeResponseDto[]>> {
    return this.fbrSetupService.getItemCodes(companyId);
  }

  @Get('uom')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'companyId', required: true })
  @SwaggerApiResponse({ description: 'Get UOM IDs', type: FbrUomResponseDto, isArray: true })
  getUomIds(@Query('companyId') companyId: string): Promise<ApiMessageData<FbrUomResponseDto[]>> {
    return this.fbrSetupService.getUomIds(companyId);
  }

  @Get('rates')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'companyId', required: true })
  @SwaggerApiResponse({ description: 'Get rates', type: FbrRateResponseDto, isArray: true })
  getRates(@Query('companyId') companyId: string): Promise<ApiMessageData<FbrRateResponseDto[]>> {
    return this.fbrSetupService.getRates(companyId);
  }

  @Get('transaction-types')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'companyId', required: true })
  @SwaggerApiResponse({ description: 'Get transaction types', type: FbrDocTypeResponseDto, isArray: true })
  getTransactionTypes(@Query('companyId') companyId: string): Promise<ApiMessageData<FbrDocTypeResponseDto[]>> {
    return this.fbrSetupService.getTransactionTypes(companyId);
  }

  @Public()
  @Get('scenarios')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Get sandbox scenarios', type: FbrScenarioResponseDto, isArray: true })
  getScenarios(): Promise<ApiMessageData<FbrScenarioResponseDto[]>> {
    return this.fbrSetupService.getScenarios();
  }
}
