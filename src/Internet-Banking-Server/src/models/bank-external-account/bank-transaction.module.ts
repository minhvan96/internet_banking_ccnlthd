import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BankInternalAccount} from "../../entities/bank-internal-account.entity";
import {CqrsModule} from "@nestjs/cqrs";
import {BankExternalTransaction} from "../../entities/bank-external-transaction.entity";
import {BankExternalAccount} from "../../entities/bank-external-account.entity";
import {BankTransactionController} from "./bank-transaction.controller";
import {FilterTransactionHandler} from "./queries/filter-transaction.handler";

@Module({imports: [TypeOrmModule.forFeature([BankExternalTransaction, BankExternalAccount, BankInternalAccount]), CqrsModule],
    controllers: [BankTransactionController],
    providers: [
        FilterTransactionHandler
    ]})
export class BankTransactionModule {}
