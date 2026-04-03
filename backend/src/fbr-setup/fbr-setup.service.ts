import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { SuccessResponseMessages } from '@messages';
import { ApiMessageData } from '@types';
import { FbrProvinceResponseDto, FbrDocTypeResponseDto, FbrItemCodeResponseDto, FbrUomResponseDto, FbrRateResponseDto, FbrScenarioResponseDto } from './dto/fbr-responses.dto';

@Injectable()
export class FbrSetupService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  private getBaseUrl() {
    return this.configService.get<string>('FBR_BASE_URL') || 'https://gw.fbr.gov.pk';
  }

  private getHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  private async getCompanyToken(companyId: string): Promise<string> {
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');
    if (!company.fbrToken) throw new BadRequestException('FBR token not configured for this company');
    return company.fbrToken;
  }

  private handleFbrResponse(data: any) {
    if (data?.validationResponse && data.validationResponse.status?.toLowerCase() === 'invalid') {
      throw new BadRequestException(data.validationResponse);
    }
    return data;
  }

  private handleFbrError(error: any, fallbackMessage: string) {
    if (error instanceof BadRequestException) throw error;
    if (error.response?.data) {
      this.handleFbrResponse(error.response.data);
      throw new BadRequestException(error.response.data);
    }
    throw new InternalServerErrorException(fallbackMessage);
  }

  async getProvinces(companyId: string): Promise<ApiMessageData<FbrProvinceResponseDto[]>> {
    const token = await this.getCompanyToken(companyId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.getBaseUrl()}/pdi/v1/provinces`, {
          headers: this.getHeaders(token),
        }),
      );
      return { message: SuccessResponseMessages.successGeneral, data: this.handleFbrResponse(response.data) };
    } catch (error) {
      this.handleFbrError(error, 'Failed to fetch provinces');
    }
  }

  async getDocTypes(companyId: string): Promise<ApiMessageData<FbrDocTypeResponseDto[]>> {
    const token = await this.getCompanyToken(companyId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.getBaseUrl()}/pdi/v1/doctypecode`, {
          headers: this.getHeaders(token),
        }),
      );
      return { message: SuccessResponseMessages.successGeneral, data: this.handleFbrResponse(response.data) };
    } catch (error) {
      this.handleFbrError(error, 'Failed to fetch document types');
    }
  }

  async getItemCodes(companyId: string): Promise<ApiMessageData<FbrItemCodeResponseDto[]>> {
    const token = await this.getCompanyToken(companyId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.getBaseUrl()}/pdi/v1/itemcode`, {
          headers: this.getHeaders(token),
        }),
      );
      return { message: SuccessResponseMessages.successGeneral, data: this.handleFbrResponse(response.data) };
    } catch (error) {
      this.handleFbrError(error, 'Failed to fetch item codes');
    }
  }

  async getUomIds(companyId: string): Promise<ApiMessageData<FbrUomResponseDto[]>> {
    const token = await this.getCompanyToken(companyId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.getBaseUrl()}/pdi/v1/uom`, {
          headers: this.getHeaders(token),
        }),
      );
      return { message: SuccessResponseMessages.successGeneral, data: this.handleFbrResponse(response.data) };
    } catch (error) {
      this.handleFbrError(error, 'Failed to fetch UOM IDs');
    }
  }

  async getRates(companyId: string): Promise<ApiMessageData<FbrRateResponseDto[]>> {
    const token = await this.getCompanyToken(companyId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.getBaseUrl()}/pdi/v1/rates`, {
          headers: this.getHeaders(token),
        }),
      );
      return { message: SuccessResponseMessages.successGeneral, data: this.handleFbrResponse(response.data) };
    } catch (error) {
      this.handleFbrError(error, 'Failed to fetch rates');
    }
  }

  async getTransactionTypes(companyId: string): Promise<ApiMessageData<FbrDocTypeResponseDto[]>> {
    const token = await this.getCompanyToken(companyId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.getBaseUrl()}/pdi/v1/transactiontype`, {
          headers: this.getHeaders(token),
        }),
      );
      return { message: SuccessResponseMessages.successGeneral, data: this.handleFbrResponse(response.data) };
    } catch (error) {
      this.handleFbrError(error, 'Failed to fetch transaction types');
    }
  }

  async getScenarios(): Promise<ApiMessageData<FbrScenarioResponseDto[]>> {
    const scenarios = [
      { id: 'SN001', description: 'Goods at standard rate to registered buyers', saleType: 'Goods at Standard Rate (default)' },
      { id: 'SN002', description: 'Goods at standard rate to unregistered buyers', saleType: 'Goods at Standard Rate (default)' },
      { id: 'SN003', description: 'Sale of Steel (Melted and Re-Rolled)', saleType: 'Steel Melting and re-rolling' },
      { id: 'SN004', description: 'Sale by Ship Breakers', saleType: 'Ship breaking' },
      { id: 'SN005', description: 'Reduced rate sale', saleType: 'Goods at Reduced Rate' },
      { id: 'SN006', description: 'Exempt goods sale', saleType: 'Exempt Goods' },
      { id: 'SN007', description: 'Zero rated sale', saleType: 'Goods at zero-rate' },
      { id: 'SN008', description: 'Sale of 3rd schedule goods', saleType: '3rd Schedule Goods' },
    ];
    return { message: SuccessResponseMessages.successGeneral, data: scenarios };
  }
}
