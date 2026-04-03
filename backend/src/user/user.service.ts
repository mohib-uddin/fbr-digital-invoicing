import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiMessageData } from '@types';
import { Repository } from 'typeorm';
import { User, Company } from '@entities';
import { SuccessResponseMessages, UserErrorMessages } from '@messages';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  private readonly userFields = ['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.fbrToken', 'user.fbrEnv', 'user.cnic'];

  async getUser(userId: string): Promise<ApiMessageData<User>> {
    const fetchedUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.companies', 'companies')
      .select(this.userFields)
      .addSelect(['companies.id', 'companies.companyName', 'companies.ntn', 'companies.province', 'companies.address', 'companies.isDefault'])
      .where('user.id = :userId', { userId })
      .getOne();
    if (!fetchedUser) throw new NotFoundException(UserErrorMessages.userNotExists);
    return { message: SuccessResponseMessages.successGeneral, data: fetchedUser };
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<ApiMessageData<User>> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      relations: ['companies']
    });
    if (!user) throw new NotFoundException(UserErrorMessages.userNotExists);

    // Update user general info
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    // If fbrToken is provided in update, apply it to the default company
    if (updateUserDto.fbrToken && user.companies?.length > 0) {
      const defaultCompany = user.companies.find(c => c.isDefault) || user.companies[0];
      await this.companyRepository.update(defaultCompany.id, { fbrToken: updateUserDto.fbrToken });
    }

    const updatedUser = await this.userRepository.createQueryBuilder('user')
      .select(this.userFields)
      .where('user.id = :userId', { userId })
      .getOne();

    return { message: SuccessResponseMessages.successGeneral, data: updatedUser };
  }

  async toggleFbrEnv(userId: string): Promise<ApiMessageData<{ fbrEnv: string }>> {
    const user = await this.userRepository.createQueryBuilder('user').addSelect('user.fbrEnv').where('user.id = :userId', { userId }).getOne();
    if (!user) throw new NotFoundException(UserErrorMessages.userNotExists);
    user.fbrEnv = user.fbrEnv === 'sandbox' ? 'production' : 'sandbox';
    await this.userRepository.save(user);
    return { message: SuccessResponseMessages.successGeneral, data: { fbrEnv: user.fbrEnv } };
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(UserErrorMessages.userNotExists);
    return user;
  }
}
