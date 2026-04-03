import { Controller, Get, Body, Param, HttpCode, HttpStatus, Req, Put, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetCompaniesFilterDto } from './dto/get-companies-filter.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '@decorators';
import { ApiMessageData, ApiMessageDataPagination } from '@types';
import { Request } from 'express';
import { Company } from '@entities';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Get all companies for current user', type: Company, isArray: true })
  async getAllCompanies(@Query() filter: GetCompaniesFilterDto, @Req() req: Request): Promise<ApiMessageDataPagination<Company>> {
    return await this.companyService.getAllCompanies(filter, req.user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Get company details', type: Company })
  async getCompany(@Param('id') id: string): Promise<ApiMessageData<Company>> {
    return await this.companyService.getCompany(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ description: 'Update company details', type: Company })
  async updateCompany(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto): Promise<ApiMessageData<Company>> {
    return await this.companyService.updateCompany(id, updateCompanyDto);
  }
}
