import {Module} from '@nestjs/common';
import {DebtManagementController} from "./debt-management.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BankInternalAccount} from "../../entities/bank-internal-account.entity";
import {CqrsModule} from "@nestjs/cqrs";
import {DebtTransaction} from "../../entities/debt-transaction.entity";
import {FilterDebtTransactionHandler} from "./queries/filter-debt-transaction.handler";
import {GetDebtTransactionByIdHandler} from "./queries/get-debt-transaction-by-id.handler";
import {User} from "../../entities/identity/user.entity";
import {DebtCustomer} from "../../entities/debt-customer.entity";
import {CreateDebtTransactionHandler} from "./commands/create-debt-transaction.handler";
import {CreateDebtorHandler} from "./commands/create-debtor.handler";
import {UpdateDebtTransactionHandler} from "./commands/update-debt-transaction.handler";
import {DeleteDebtTransactionHandler} from "./commands/delete-debt-transaction.handler";
import {GetDebtorHandler} from "./queries/get-debtor.handler";
import {RequestDebtTransactionHandler} from "./commands/request-debt-transaction.handler";

@Module({
    imports: [TypeOrmModule.forFeature([DebtTransaction, BankInternalAccount, User, DebtCustomer]), CqrsModule],
    controllers: [DebtManagementController],
    providers: [
        CreateDebtTransactionHandler,
        CreateDebtorHandler,
        DeleteDebtTransactionHandler,
        UpdateDebtTransactionHandler,
        RequestDebtTransactionHandler,
        FilterDebtTransactionHandler,
        GetDebtTransactionByIdHandler,
        GetDebtorHandler
    ]
})
export class DebtManagementModule {


}
