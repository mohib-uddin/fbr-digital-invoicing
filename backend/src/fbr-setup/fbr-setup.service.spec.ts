import { Test, TestingModule } from '@nestjs/testing';
import { FbrSetupService } from './fbr-setup.service';

describe('FbrSetupService', () => {
  let service: FbrSetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FbrSetupService],
    }).compile();

    service = module.get<FbrSetupService>(FbrSetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
