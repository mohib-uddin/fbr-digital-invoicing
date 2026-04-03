import { Module } from '@nestjs/common';
import { FbrSetupService } from './fbr-setup.service';
import { FbrSetupController } from './fbr-setup.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../company/entities/company.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Company])],
  controllers: [FbrSetupController],
  providers: [FbrSetupService],
})
export class FbrSetupModule {}
