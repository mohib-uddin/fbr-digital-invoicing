import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Invoice } from './invoice.entity';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('invoice_items')
export class InvoiceItem extends BaseEntity {
  @ManyToOne(() => Product, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ApiProperty({ example: '3c6e9f5e-1871-4e41-a070-b62eaf5f5e5e' })
  @Column({ type: 'uuid' })
  productId: string;

  @ApiProperty({ example: 'Goods at standard rate (default)' })
  @Column({ type: 'varchar' })
  saleType: string;

  @ApiProperty({ example: 18 })
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taxRate: number;

  @ApiProperty({ example: 2 })
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  qty: number;

  @ApiProperty({ example: 260 })
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;

  @ApiProperty({ example: 520 })
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amountExclTax: number;

  @ApiProperty({ example: 0 })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  fixedNotifiedValue: number;

  @ApiProperty({ example: 93.6 })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  salesTaxApplicable: number;

  @ApiProperty({ example: 0 })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  salesTaxWithheldAtSource: number;

  @ApiProperty({ example: 0 })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  extraTax: number;

  @ApiProperty({ example: 0 })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  furtherTax: number;

  @ApiProperty({ example: 0 })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  fedPayable: number;

  @ApiProperty({ example: 0 })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discount: number;

  @ApiProperty({ example: '--SELECT--' })
  @Column({ type: 'varchar', nullable: true })
  sroScheduleNo: string;

  @ApiProperty({ example: '--SELECT--' })
  @Column({ type: 'varchar', nullable: true })
  sroItemSerialNo: string;

  @ApiProperty({ example: 613.6 })
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @Column({ type: 'uuid' })
  invoiceId: string;
}
