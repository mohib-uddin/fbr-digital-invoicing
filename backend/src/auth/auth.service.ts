import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignupDto, ResendCodeDto, EmailVerificationDto, LoginDto, ForgotPasswordDto, ValidateCodeDto, ForgotPassChangeDto, UpdatePasswordDto, LoginResponseDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Company } from '@entities';
import { AppHelper } from '@helpers/app.helper';
import { AuthErrorMessages, SuccessResponseMessages, UserErrorMessages } from '@messages';
import { ApiMessageData, ApiMessage } from '@types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    private appHelper: AppHelper,
  ) {}

  async signUp(signUpObj: SignupDto): Promise<ApiMessageData<LoginResponseDto>> {
    const { firstName, lastName, email, password, companyName, fbrToken, ntn, cnic, province, address } = signUpObj;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) throw new BadRequestException(AuthErrorMessages.emailExists);

    const verificationCode: string = await this.appHelper.generateCode();

    let company: Company = null;
    if (companyName) {
      company = await this.companyRepository.findOne({ where: { companyName } });
      if (!company) {
        company = await this.companyRepository.save({
          companyName,
          fbrToken,
          ntn,
          province,
          address,
          isDefault: true,
        });
      } else {
        company.ntn = ntn || company.ntn;
        company.province = province || company.province;
        company.address = address || company.address;
        company.isDefault = true;
        await this.companyRepository.save(company);
      }
    }

    const createdUser = await this.userRepository.save({
      firstName,
      lastName,
      email,
      password: await this.appHelper.hashData(password),
      verificationCode,
      fbrToken,
      fbrEnv: signUpObj.fbrEnv || 'sandbox',
      isVerified: false,
      companies: company ? [company] : [],
      cnic,
    });

    const mailSubject: string = 'Email Verification - FBR - Digital  Invoicing';
    const replacements = 'Your verification token is: ' + verificationCode;

    await this.appHelper.sendMail(createdUser.email, mailSubject, replacements);

    const { access_token } = await this.appHelper.getTokens(createdUser.id.toString());

    // Sanitization
    const user = { ...createdUser };
    delete user.password;
    delete user.verificationCode;
    delete user.isPassCodeValid;

    return { 
      message: SuccessResponseMessages.successGeneral, 
      data: { user: user as any, access_token, company } 
    };
  }

  async login(loginDto: LoginDto): Promise<ApiMessageData<LoginResponseDto>> {
    const { email, password } = loginDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.companies', 'companies')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) throw new BadRequestException(AuthErrorMessages.invalidEmail);

    const passwordMatches = await this.appHelper.compareData(password, user.password);
    if (!passwordMatches) throw new BadRequestException(AuthErrorMessages.invalidPassword);

    const { access_token } = await this.appHelper.getTokens(user.id.toString());

    // Find default company
    const defaultCompany = user.companies.find(c => c.isDefault) || (user.companies.length > 0 ? user.companies[0] : null);

    // Sanitization
    const responseUser = { ...user };
    delete responseUser.password;
    delete responseUser.companies;

    return {
      message: SuccessResponseMessages.successGeneral,
      data: { user: responseUser as any, access_token, company: defaultCompany },
    };
  }

  async resendCode(resendCodeBody: ResendCodeDto): Promise<ApiMessage> {
    const { email } = resendCodeBody;
    const userExists = await this.userRepository.createQueryBuilder('user').addSelect('user.verificationCode').where('user.email = :email', { email }).getOne();
    if (!userExists) throw new NotFoundException(UserErrorMessages.userNotExists);
    if (userExists.verificationCode === null || userExists.verificationCode === '') throw new BadRequestException(AuthErrorMessages.accessDenied);
    const verificationCode: string = await this.appHelper.generateCode();
    await this.userRepository.update(userExists.id, { verificationCode });
    const mailSubject: string = 'Resend Verification Code - FBR - Digital  Invoicing';
    const replacements = 'Your verification token is: ' + verificationCode;
    await this.appHelper.sendMail(userExists.email, mailSubject, replacements);
    return { message: SuccessResponseMessages.successGeneral };
  }

  async verifyEmail(emailVerificationBody: EmailVerificationDto): Promise<ApiMessage> {
    const { code, email } = emailVerificationBody;
    const user = await this.userRepository.createQueryBuilder('user').addSelect('user.verificationCode').where('user.email = :email', { email }).getOne();
    if (!user) throw new NotFoundException(UserErrorMessages.userNotExists);
    if (user.isVerified) throw new BadRequestException(AuthErrorMessages.emailVerified);
    if (code !== user.verificationCode) throw new BadRequestException(AuthErrorMessages.invalidCode);
    user.verificationCode = '';
    user.isVerified = true;
    await this.userRepository.save(user);
    return { message: SuccessResponseMessages.emailVerification };
  }

  async forgotPassword(forgotPasswordBody: ForgotPasswordDto): Promise<ApiMessage> {
    const { email } = forgotPasswordBody;
    const user = await this.userRepository.createQueryBuilder('user').addSelect('user.verificationCode').where('user.email = :email AND user.isActive = :isActive', { email, isActive: true }).getOne();
    if (!user) throw new BadRequestException(AuthErrorMessages.invalidEmail);
    if (!user.isVerified) throw new BadRequestException(AuthErrorMessages.accountNotVerified);
    const passwordChangeCode: string = await this.appHelper.generateCode();
    user.verificationCode = passwordChangeCode;
    const mailSubject: string = 'Forgot Password - FBR - Digital  Invoicing';
    const replacements = { text: `Your password reset token is ${passwordChangeCode}` };
    await this.appHelper.sendMail(user.email, mailSubject, replacements.text);
    await this.userRepository.save(user);
    return { message: SuccessResponseMessages.mailSent };
  }

  async validateCode(validateCodeBody: ValidateCodeDto): Promise<ApiMessage> {
    const { email, code } = validateCodeBody;
    const user = await this.userRepository.createQueryBuilder('user').addSelect('user.verificationCode').where('user.email = :email', { email }).getOne();
    if (!user) throw new BadRequestException(AuthErrorMessages.invalidEmail);
    if (code !== user.verificationCode) throw new UnauthorizedException(AuthErrorMessages.invalidPassCode);
    user.verificationCode = '';
    user.isPassCodeValid = true;
    await this.userRepository.save(user);
    return { message: SuccessResponseMessages.codeIsValid };
  }

  async changePassword(changePasswordBody: ForgotPassChangeDto): Promise<ApiMessage> {
    const { email, newPassword, confirmPassword } = changePasswordBody;
    const user = await this.userRepository.createQueryBuilder('user').addSelect('user.isPassCodeValid').where('user.email = :email', { email }).getOne();
    if (!user) throw new BadRequestException(AuthErrorMessages.invalidEmail);
    if (!user.isPassCodeValid) throw new BadRequestException(AuthErrorMessages.passCodeNotVerified);
    if (newPassword !== confirmPassword) throw new UnauthorizedException(AuthErrorMessages.passwordNotMatch);
    user.password = await this.appHelper.hashData(newPassword);
    user.isPassCodeValid = false;
    await this.userRepository.save(user);
    return { message: SuccessResponseMessages.passChanged };
  }

  async updatePassword(id: string, updatePasswordBody: UpdatePasswordDto): Promise<ApiMessage> {
    const { currentPassword, newPassword, confirmPassword } = updatePasswordBody;
    const user = await this.userRepository.createQueryBuilder('user').addSelect('user.password').where('user.id = :id', { id }).getOne();
    if (!user) throw new BadRequestException(AuthErrorMessages.invalidEmail);
    if (!(await this.appHelper.compareData(currentPassword, user.password))) throw new UnauthorizedException(AuthErrorMessages.currentPassword);
    if (newPassword !== confirmPassword) throw new UnauthorizedException(AuthErrorMessages.passwordNotMatch);
    user.password = await this.appHelper.hashData(newPassword);
    await this.userRepository.save(user);
    const mailSubject: string = 'Password Update - FBR - Digital  Invoicing';
    await this.appHelper.sendMail(user.email, mailSubject, 'Your password has been updated successfully');
    return { message: SuccessResponseMessages.passChanged };
  }
}
