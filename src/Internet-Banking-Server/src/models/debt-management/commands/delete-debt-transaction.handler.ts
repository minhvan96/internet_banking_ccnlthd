import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {DeleteDebtTransactionCommand} from "./delete-debt-transaction.command";
import {InjectRepository} from "@nestjs/typeorm";
import {DebtTransaction} from "../../../entities/debt-transaction.entity";
import {Repository} from "typeorm";
import {GetDebtTransactionByIdQuery} from "../queries/get-debt-transaction-by-id.query";

@CommandHandler(DeleteDebtTransactionHandler)
export class DeleteDebtTransactionHandler implements ICommandHandler<DeleteDebtTransactionCommand>{
    constructor(
        @InjectRepository(DebtTransaction)
        private readonly debtTransactionRepository: Repository<DebtTransaction>,
        private readonly queryBus: QueryBus,
    ) {
    }
    async execute(command: DeleteDebtTransactionCommand): Promise<boolean> {
        let debTransaction : DebtTransaction = await this.queryBus.execute(
            new GetDebtTransactionByIdQuery(command.payload.debtTransactionId));

        debTransaction.debtCancellationContent = command.payload.description;
        debTransaction.isDeleted = true;

        const result =  await this.debtTransactionRepository.save(debTransaction);
        return !!result;
    }

}