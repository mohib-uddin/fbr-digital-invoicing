import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity, Company } from '@entities';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @Column({ type: 'varchar' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @Column({ type: 'varchar' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Unique email address' })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @ApiHideProperty()
  @Column({ type: 'varchar', nullable: true, select: false })
  password: string;

  @ApiProperty({ example: true, description: 'True if email is verified' })
  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Exclude()
  @ApiHideProperty()
  @Column({ type: 'varchar', default: '', select: false })
  verificationCode: string;

  @Exclude()
  @ApiHideProperty()
  @Column({ type: 'boolean', default: false, select: false })
  isPassCodeValid: boolean;

  @ApiProperty({ example: 'XXXXXXXXXXXXXX', description: 'FBR Registration Token' })
  @Column({ type: 'varchar', nullable: false })
  fbrToken: string;

  @ApiProperty({ example: 'sandbox', description: 'FBR Environment', enum: ['sandbox', 'production'] })
  @Column({ type: 'varchar', default: 'sandbox' })
  fbrEnv: string;

  @ApiProperty({ example: true, description: 'True if account is active' })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({ example: 'https://example.com/profiles/john.jpg', description: 'URL to the user avatar', required: false })
  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @ApiProperty({ example: '42101-1234567-1', description: 'CNIC Number' })
  @Column({ nullable: true })
  cnic: string;

  @ApiProperty({ type: () => Company, isArray: true })
  @OneToMany(() => Company, (company) => company.user, { cascade: true })
  companies: Company[];
}
