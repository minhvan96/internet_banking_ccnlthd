import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { BankInternalTransaction } from "../../entities/bank-internal-transaction.entity";
import { CreateBankInternalTransactionHandler } from "./commands/create-bank-internal-transaction.handler";
import { BankInternalTransactionController } from "./bank-internal-transaction.controller";
import { BankInternalAccount } from "../../entities/bank-internal-account.entity";
import {
  GetBankInternalAccountByIdHandler
} from "../bank-internal-account/queries/get-bank-internal-account-by-id.handler";
import {
  GetBankInternalAccountTransactionByAccountHandler
} from "./queries/get-bank-internal-account-transaction-by-account.handler";
import {
  GetBankInternalAccountTransactionByUserIdHandler
} from "./queries/get-bank-internal-account-transaction-by-user-id.handler";
import { User } from "../../entities/identity/user.entity";
import { VerifyBankInternalTransactionHandler } from "./commands/verify-bank-internal-transaction.handler";
import { AuthService } from "../../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { GetBankInternalTransactionByIdHandler } from "./queries/get-bank-internal-transaction-by-id.handler";
import { CustomerInternalBeneficiary } from "../../entities/customer-internal-beneficiary.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    BankInternalTransaction,
    BankInternalAccount,
    User,
    CustomerInternalBeneficiary]),
    CqrsModule],
  controllers: [BankInternalTransactionController],
  providers: [
    AuthService,
    JwtService,
    CreateBankInternalTransactionHandler,
    VerifyBankInternalTransactionHandler,
    GetBankInternalAccountByIdHandler,
    GetBankInternalAccountTransactionByAccountHandler,
    GetBankInternalAccountTransactionByUserIdHandler,
    GetBankInternalTransactionByIdHandler]
})
export class BankInternalTransactionModule {

}
