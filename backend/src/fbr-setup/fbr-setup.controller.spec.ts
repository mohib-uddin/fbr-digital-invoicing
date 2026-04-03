import { Test, TestingModule } from '@nestjs/testing';
import { FbrSetupController } from './fbr-setup.controller';
import { FbrSetupService } from './fbr-setup.service';

describe('FbrSetupController', () => {
  let controller: FbrSetupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FbrSetupController],
      providers: [FbrSetupService],
    }).compile();

    controller = module.get<FbrSetupController>(FbrSetupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
