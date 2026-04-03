import { PartialType } from '@nestjs/swagger';
import { CreateFbrSetupDto } from './create-fbr-setup.dto';

export class UpdateFbrSetupDto extends PartialType(CreateFbrSetupDto) {}
