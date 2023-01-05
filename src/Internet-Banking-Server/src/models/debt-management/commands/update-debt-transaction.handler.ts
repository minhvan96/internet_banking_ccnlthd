import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {UpdateDebtTransactionCommand} from "./update-debt-transaction.command";
import {InjectRepository} from "@nestjs/typeorm";
import {DebtTransaction} from "../../../entities/debt-transaction.entity";
import {Repository} from "typeorm";
import {GetDebtTransactionByIdQuery} from "../queries/get-debt-transaction-by-id.query";
import {BadRequestException} from "@nestjs/common";

@CommandHandler(UpdateDebtTransactionCommand)
export class UpdateDebtTransactionHandler implements ICommandHandler<UpdateDebtTransactionCommand>{
    private readonly code: number;

    constructor(
        @InjectRepository(DebtTransaction)
        private readonly debtTransactionRepository: Repository<DebtTransaction>,
        private readonly queryBus: QueryBus,

    ) {
        this.code = Math.floor(10000 + Math.random() * 90000);
    }
    async execute(command: UpdateDebtTransactionCommand): Promise<any> {

        const debtTransaction = await this.queryBus.execute(
            new GetDebtTransactionByIdQuery(command.payload.transactionId))
        if(debtTransaction.code !== command.payload.code){
            throw new BadRequestException('Incorrect code ');
        }
        debtTransaction.isPaid = true;
        return await this.debtTransactionRepository.save(debtTransaction);
    }

}