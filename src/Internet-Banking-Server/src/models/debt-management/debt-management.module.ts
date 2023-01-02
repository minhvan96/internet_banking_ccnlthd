import {Module} from '@nestjs/common';
import {DebtManagementController} from "./debt-management.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BankInternalAccount} from "../../entities/bank-internal-account.entity";
import {CqrsModule} from "@nestjs/cqrs";
import {DebtTransaction} from "../../entities/debt-transaction.entity";
import {CreateDebtTransactionCommand} from "./commands/create-debt-transaction.command";
import {DeleteDebtTransactionCommand} from "./commands/delete-debt-transaction.command";
import {FilterDebtTransactionHandler} from "./queries/filter-debt-transaction.handler";
import {GetDebtTransactionByIdHandler} from "./queries/get-debt-transaction-by-id.handler";

@Module({
    imports: [TypeOrmModule.forFeature([DebtTransaction, BankInternalAccount]), CqrsModule],
    controllers: [DebtManagementController],
    providers: [
        CreateDebtTransactionCommand,
        DeleteDebtTransactionCommand,
        FilterDebtTransactionHandler,
        GetDebtTransactionByIdHandler
    ]
})
export class DebtManagementModule {


}
