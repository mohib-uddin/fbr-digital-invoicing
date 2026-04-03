import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity, User } from '@entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'company' })
export class Company extends BaseEntity {
  @ApiProperty({ example: 'My Company', description: 'Company Name' })
  @Column({ type: 'varchar' })
  companyName: string;

  @ApiProperty({ example: '7391617', description: 'NTN Number' })
  @Column({ nullable: true })
  ntn: string;

  @ApiProperty({ example: 'SINDH', description: 'Province' })
  @Column({ nullable: true })
  province: string;

  @ApiProperty({ example: 'Plot# 356/1, Sector-7a, Korangi...', description: 'Address' })
  @Column({ type: 'text', nullable: true })
  address: string;

  @ApiPropertyOptional({ example: 'fbr_token_here', description: 'FBR Token for API authentication' })
  @Column({ type: 'text', nullable: true })
  fbrToken: string;

  @ApiProperty({ example: true, description: 'True if this is the default company' })
  @Column({ type: 'boolean', default: false })
  isDefault: boolean;

  @ManyToOne(() => User, (user) => user.companies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;
}
