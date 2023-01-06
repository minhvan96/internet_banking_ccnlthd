import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankInternalAccount } from "../../entities/bank-internal-account.entity";
import { User } from "../../entities/identity/user.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { DepositController } from "./deposit.controller";
import { MakeDepositHandler } from "./commands/make-deposit.handler";
import { DepositRecord } from "../../entities/deposit-record.entity";
import { GetDepositHandler } from "./queries/get-deposit.handler";

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    BankInternalAccount,
    DepositRecord]), CqrsModule],
  controllers: [DepositController],
  providers: [
    GetDepositHandler,
    MakeDepositHandler
  ]
})
export class DepositModule {
}
