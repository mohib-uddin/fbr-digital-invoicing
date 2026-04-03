import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { InvoiceType, BuyerRegistrationType } from '../types';
import { ApiProperty } from '@nestjs/swagger';
import { InvoiceItem } from './invoice-item.entity';

@Entity('invoices')
export class Invoice extends BaseEntity {
  @ApiProperty({ example: '2026-04-03' })
  @Column({ type: 'date' })
  invoiceDate: Date;

  @ApiProperty({ enum: InvoiceType, example: InvoiceType.SALE_INVOICE })
  @Column({ type: 'varchar' })
  invoiceType: InvoiceType;

  @ApiProperty({ example: 'REF-12345' })
  @Column({ nullable: true })
  invoiceRefNo: string;

  @ApiProperty({ example: 'Thank you for your business' })
  @Column({ type: 'text', nullable: true })
  remarks: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ type: 'uuid' })
  customerId: string;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ type: 'uuid', nullable: true })
  companyId: string;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];
}
