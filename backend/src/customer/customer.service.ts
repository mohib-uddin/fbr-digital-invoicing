import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { User } from '../user/entities/user.entity';
import { CreateCustomerDto, UpdateCustomerDto, GetCustomersFilterDto } from './dto';
import { ApiMessageData, ApiMessage, ApiMessageDataPagination, SortEnum } from '@types';
import { SuccessResponseMessages } from '@messages';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async CreateCustomer(createCustomerDto: CreateCustomerDto, userId: string): Promise<ApiMessageData<Customer>> {
    let companyId = createCustomerDto.companyId;

    if (!companyId) {
      const user = await this.userRepository.findOne({ 
        where: { id: userId }, 
        relations: ['companies'] 
      });
      const defaultCompany = user?.companies?.find((c) => c.isDefault);
      if (defaultCompany) companyId = defaultCompany.id;
    }

    const customer = this.customerRepository.create({ 
      ...createCustomerDto, 
      userId,
      companyId 
    });
    
    const savedCustomer = await this.customerRepository.save(customer);
    return {
      message: SuccessResponseMessages.successGeneral,
      data: savedCustomer,
    };
  }

  async getAllCustomers(paginationQuery: GetCustomersFilterDto, userId: string): Promise<ApiMessageDataPagination<Customer>> {
    const { page = 1, limit = 10, query, sort = SortEnum.DESC, registrationStatus } = paginationQuery;
    const queryBuilder = this.customerRepository.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.company', 'company')
      .where('customer.userId = :userId', { userId });

    if (query) {
      queryBuilder.andWhere('(customer.name ILIKE :query OR customer.ntn ILIKE :query OR customer.cnic ILIKE :query)', { query: `%${query}%` });
    }

    if (registrationStatus) {
      queryBuilder.andWhere('customer.registrationStatus = :registrationStatus', { registrationStatus });
    }

    queryBuilder.orderBy('customer.createdAt', sort);

    const [customers, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      message: SuccessResponseMessages.successGeneral,
      data: customers,
      page,
      lastPage: Math.ceil(total / limit),
      total,
    };
  }

  async getOneCustomer(id: string, userId: string): Promise<ApiMessageData<Customer>> {
    const customer = await this.customerRepository.findOne({ where: { id, userId }, relations: ['company'] });
    if (!customer) throw new NotFoundException('Customer not found');
    return {
      message: SuccessResponseMessages.successGeneral,
      data: customer,
    };
  }

  async UpdateCustomer(id: string, updateCustomerDto: UpdateCustomerDto, userId: string): Promise<ApiMessageData<Customer>> {
    const customer = await this.customerRepository.findOne({ where: { id, userId } });
    if (!customer) throw new NotFoundException('Customer not found');
    
    await this.customerRepository.update(id, updateCustomerDto);
    const updatedCustomer = await this.customerRepository.findOne({ where: { id, userId } });
    
    return {
      message: SuccessResponseMessages.successGeneral,
      data: updatedCustomer,
    };
  }

  async DeleteCustomer(id: string, userId: string): Promise<ApiMessage> {
    const result = await this.customerRepository.delete({ id, userId });
    if (result.affected === 0) throw new NotFoundException('Customer not found');
    return {
      message: SuccessResponseMessages.successGeneral,
    };
  }
}
