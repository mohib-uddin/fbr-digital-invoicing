import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto';
import { ApiMessageData, ApiMessage, ApiMessageDataPagination, SortEnum } from '@types';
import { SuccessResponseMessages } from '@messages';
import { PaginationQueryDto } from '@dtos';
import { User, Company, Customer, Product } from '@entities';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async CreateInvoice(createInvoiceDto: CreateInvoiceDto, userId: string): Promise<ApiMessageData<Invoice>> {
    const { customerId, items } = createInvoiceDto;
    let { companyId } = createInvoiceDto;

    // 1. Get User with Companies to find default or validate selected
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['companies'],
    });

    if (!user) throw new NotFoundException('User not found');

    // 2. Handle Default Company if not provided
    if (!companyId) {
      const defaultComp = user.companies.find((c) => c.isDefault);
      if (!defaultComp) throw new BadRequestException('No default company found for user. Please provide companyId.');
      companyId = defaultComp.id;
    } else {
      // Validate selected company belongs to user
      const hasCompany = user.companies.some((c) => c.id === companyId);
      if (!hasCompany) throw new BadRequestException('Selected company does not belong to your account');
    }

    // 3. Validate Customer belongs to the selected Company
    const customer = await this.customerRepository.findOne({
      where: { id: customerId, companyId },
    });
    if (!customer) throw new BadRequestException('Selected customer does not belong to the selected company');

    // 4. Validate Products belong to the selected Customer
    const productIds = items.map((item) => item.productId);
    const productsCount = await this.productRepository.count({
      where: { id: In(productIds), customerId },
    });

    if (productsCount !== productIds.length) {
      throw new BadRequestException('One or more products do not belong to the selected customer');
    }

    const invoice = this.invoiceRepository.create({
      ...createInvoiceDto,
      userId,
      companyId,
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);
    return {
      message: SuccessResponseMessages.successGeneral,
      data: savedInvoice,
    };
  }

  async getAllInvoices(paginationQuery: PaginationQueryDto, userId: string): Promise<ApiMessageDataPagination<Invoice>> {
    const { page = 1, limit = 10, query, sort = SortEnum.DESC } = paginationQuery;
    const queryBuilder = this.invoiceRepository
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.customer', 'customer')
      .leftJoinAndSelect('invoice.company', 'company')
      .where('invoice.userId = :userId', { userId });

    if (query) {
      queryBuilder.andWhere('(invoice.invoiceRefNo ILIKE :query OR customer.name ILIKE :query)', { query: `%${query}%` });
    }

    queryBuilder.orderBy('invoice.createdAt', sort);

    const [invoices, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      message: SuccessResponseMessages.successGeneral,
      data: invoices,
      page,
      lastPage: Math.ceil(total / limit),
      total,
    };
  }

  async getOneInvoice(id: string, userId: string): Promise<ApiMessageData<Invoice>> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id, userId },
      relations: ['items', 'customer', 'company'],
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return {
      message: SuccessResponseMessages.successGeneral,
      data: invoice,
    };
  }

  async UpdateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto, userId: string): Promise<ApiMessageData<Invoice>> {
    const invoice = await this.invoiceRepository.findOne({ where: { id, userId } });
    if (!invoice) throw new NotFoundException('Invoice not found');

    // Note: Complex updates to customer or items would require re-validation similar to CreateInvoice
    Object.assign(invoice, updateInvoiceDto);
    const savedInvoice = await this.invoiceRepository.save(invoice);

    return {
      message: SuccessResponseMessages.successGeneral,
      data: savedInvoice,
    };
  }

  async DeleteInvoice(id: string, userId: string): Promise<ApiMessage> {
    const result = await this.invoiceRepository.delete({ id, userId });
    if (result.affected === 0) throw new NotFoundException('Invoice not found');
    return {
      message: SuccessResponseMessages.successGeneral,
    };
  }
}
