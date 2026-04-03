import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('product_conversions')
export class ProductConversion extends BaseEntity {
  @ApiProperty({ example: 'PKT' })
  @Column()
  uom: string;

  @ApiProperty({ example: 10 })
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  qty: number;

  @ManyToOne(() => Product, (product) => product.conversions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'uuid' })
  productId: string;
}
