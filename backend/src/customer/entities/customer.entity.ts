import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Company } from '../../company/entities/company.entity';
import { User } from '../../user/entities/user.entity';
import { CustomerRegistrationStatus } from '../types';
import { ApiProperty } from '@nestjs/swagger';

@Entity('customers')
export class Customer extends BaseEntity {
  @ApiProperty({ example: 'ABC Business' })
  @Column()
  name: string;

  @ApiProperty({ enum: CustomerRegistrationStatus, example: CustomerRegistrationStatus.REGISTERED })
  @Column({ type: 'varchar', default: CustomerRegistrationStatus.UNREGISTERED })
  registrationStatus: string;

  @ApiProperty({ example: '7391617' })
  @Column({ nullable: true })
  ntn: string;

  @ApiProperty({ example: '42101-1234567-1' })
  @Column({ nullable: true })
  cnic: string;

  @ApiProperty({ example: 'Retail' })
  @Column({ nullable: true })
  businessType: string;

  @ApiProperty({ example: 'John Doe' })
  @Column({ nullable: true })
  contactPerson: string;

  @ApiProperty({ example: '+923001234567' })
  @Column({ nullable: true })
  contactNo: string;

  @ApiProperty({ example: '123 Street Office 1' })
  @Column()
  address: string;

  @ApiProperty({ example: 'SINDH' })
  @Column()
  province: string;

  @ApiProperty({ example: 'Karachi' })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({ example: 'Pakistan' })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ example: 'Wholesale customer' })
  @Column({ type: 'text', nullable: true })
  remarks: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ type: 'uuid', nullable: true })
  companyId: string;
}
