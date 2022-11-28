import { Test, TestingModule } from '@nestjs/testing';
import { BankInternalAccountController } from './bank-internal-account.controller';

describe('BankInternalAccountController', () => {
  let controller: BankInternalAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankInternalAccountController],
    }).compile();

    controller = module.get<BankInternalAccountController>(BankInternalAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
