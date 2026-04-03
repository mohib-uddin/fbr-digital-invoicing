import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetCompaniesFilterDto } from './dto/get-companies-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '@entities';
import { Repository } from 'typeorm';
import { SuccessResponseMessages } from '@messages';
import { ApiMessageData, ApiMessage, ApiMessageDataPagination, SortEnum } from '@types';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getAllCompanies(filter: GetCompaniesFilterDto, userId: string): Promise<ApiMessageDataPagination<Company>> {
    const { page = 1, limit = 10, query, isDefault, sort = SortEnum.DESC } = filter;
    
    const queryBuilder = this.companyRepository.createQueryBuilder('company')
      .where('company.userId = :userId', { userId });

    if (query) {
      queryBuilder.andWhere('(company.companyName ILIKE :query OR company.ntn ILIKE :query)', { query: `%${query}%` });
    }

    if (isDefault !== undefined) {
      queryBuilder.andWhere('company.isDefault = :isDefault', { isDefault });
    }

    queryBuilder.orderBy('company.createdAt', sort);

    const [companies, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      message: SuccessResponseMessages.successGeneral,
      data: companies,
      page,
      lastPage: Math.ceil(total / limit),
      total,
    };
  }

  async getCompany(id: string): Promise<ApiMessageData<Company>> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
    return {
      message: SuccessResponseMessages.successGeneral,
      data: company,
    };
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto): Promise<ApiMessageData<Company>> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
    
    await this.companyRepository.update(id, updateCompanyDto);
    const updatedCompany = await this.companyRepository.findOne({ where: { id } });
    
    return {
      message: SuccessResponseMessages.successGeneral,
      data: updatedCompany,
    };
  }
}
