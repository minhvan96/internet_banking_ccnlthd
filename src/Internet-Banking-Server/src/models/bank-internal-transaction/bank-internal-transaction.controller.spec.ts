import { Test, TestingModule } from '@nestjs/testing';
import { BankInternalTransactionController } from './bank-internal-transaction.controller';

describe('BankInternalTransactionController', () => {
  let controller: BankInternalTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankInternalTransactionController],
    }).compile();

    controller = module.get<BankInternalTransactionController>(BankInternalTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
