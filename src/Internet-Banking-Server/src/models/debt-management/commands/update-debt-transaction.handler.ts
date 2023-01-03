import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {UpdateDebtTransactionCommand} from "./update-debt-transaction.command";
import {InjectRepository} from "@nestjs/typeorm";
import {DebtTransaction} from "../../../entities/debt-transaction.entity";
import {Repository} from "typeorm";
import {GetDebtTransactionByIdQuery} from "../queries/get-debt-transaction-by-id.query";

@CommandHandler(UpdateDebtTransactionCommand)
export class UpdateDebtTransactionHandler implements ICommandHandler<UpdateDebtTransactionCommand>{
    constructor(
        @InjectRepository(DebtTransaction)
        private readonly debtTransactionRepository: Repository<DebtTransaction>,
        private readonly queryBus: QueryBus,
    ) {
    }
    async execute(command: UpdateDebtTransactionCommand): Promise<any> {
        const debtTransaction = await this.queryBus.execute(
            new GetDebtTransactionByIdQuery(command.transactionId))
        debtTransaction.isPaid = true;

        return await this.debtTransactionRepository.save(debtTransaction);
    }

}