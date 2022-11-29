import { Module } from '@nestjs/common';
import { BankInternalAccountController } from './bank-internal-account.controller';

@Module({
  controllers: [BankInternalAccountController],
})
export class BankInternalAccountModule {
}
