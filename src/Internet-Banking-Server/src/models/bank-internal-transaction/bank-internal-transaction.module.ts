import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/identity/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { BankInternalTransaction } from '../../entities/bank-internal-transaction.entity';
import { CreateBankInternalTransactionHandler } from './commands/create-bank-internal-transaction.handler';
import { BankInternalTransactionController } from './bank-internal-transaction.controller';
import { BankInternalAccount } from '../../entities/bank-internal-account.entity';
import {
  GetBankInternalAccountByIdHandler
} from '../bank-internal-account/queries/get-bank-internal-account-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User, BankInternalTransaction, BankInternalAccount]), CqrsModule],
  controllers: [BankInternalTransactionController],
  providers: [CreateBankInternalTransactionHandler, GetBankInternalAccountByIdHandler]
})
export class BankInternalTransactionModule {

}
