import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/identity/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AddBankInternalAccountHandler } from './commands/add-bank-internal-account.handler';
import { CreateExternalBankTransferHandler } from './commands/create-external-bank-transfer.handler';
import { CreateInternalBankTransferHandler } from './commands/create-internal-bank-transfer.handler';
import { AddExternalBeneficiaryHandler } from './commands/add-external-beneficiary.handler';
import { AddInternalBeneficiaryHandler } from './commands/add-internal-beneficiary.handler';
import { BankExternalAccount } from '../../entities/bank-external-account.entity';
import { BankInternalAccount } from '../../entities/bank-internal-account.entity';
import {
  GetBankInternalAccountByIdHandler
} from '../bank-internal-account/queries/get-bank-internal-account-by-id.handler';
import {
  GetBankInternalAccountByAccountNumberHandler
} from '../bank-internal-account/queries/get-bank-internal-account-by-account-number.handler';
import { GetCustomerHandler } from './queries/get-customer.handler';
import { GetInternalBeneficiaryHandler } from './queries/get-internal-beneficiary.handler';
import { GetExternalBeneficiaryHandler } from './queries/get-external-beneficiary.handler';
import {GetCustomerByAccountNumberHandler} from "./queries/get-customer-by-account-number.handler";

@Module({
  imports: [TypeOrmModule.forFeature([User, BankExternalAccount, BankInternalAccount]), CqrsModule],
  controllers: [CustomerController],
  providers: [
    GetCustomerHandler,
    AddBankInternalAccountHandler,
    AddInternalBeneficiaryHandler,
    AddExternalBeneficiaryHandler,
    CreateExternalBankTransferHandler,
    CreateInternalBankTransferHandler,
    GetBankInternalAccountByIdHandler,
    GetCustomerByAccountNumberHandler,
    GetBankInternalAccountByAccountNumberHandler,
    GetExternalBeneficiaryHandler,
    GetInternalBeneficiaryHandler],
})
export class CustomerModule {
}
