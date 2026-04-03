import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductConversion } from './product-conversion.entity';

@Entity('products')
export class Product extends BaseEntity {
  @ApiProperty({ example: 'Leather Jacket' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Clothing' })
  @Column({ nullable: true })
  category: string;

  @ApiProperty({ example: '4201.0000' })
  @Column()
  hsCode: string;

  @ApiProperty({ example: 'PCS' })
  @Column()
  uom: string;

  @ApiProperty({ example: 1500 })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  salePrice: number;

  @ApiProperty({ example: 1000 })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  purchasePrice: number;

  @ApiProperty({ example: 'Genuine leather jacket' })
  @Column({ type: 'text', nullable: true })
  remarks: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ type: 'uuid' })
  customerId: string;

  @OneToMany(() => ProductConversion, (conversion) => conversion.product, { cascade: true })
  conversions: ProductConversion[];
}
