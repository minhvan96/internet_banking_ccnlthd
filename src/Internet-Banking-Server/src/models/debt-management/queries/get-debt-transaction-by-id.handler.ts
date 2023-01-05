import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetDebtTransactionByIdQuery} from "./get-debt-transaction-by-id.query";
import {InjectRepository} from "@nestjs/typeorm";
import {DebtTransaction} from "../../../entities/debt-transaction.entity";
import {Repository} from "typeorm";

@QueryHandler(GetDebtTransactionByIdQuery)
export class GetDebtTransactionByIdHandler implements IQueryHandler<GetDebtTransactionByIdQuery>{

    constructor(
        @InjectRepository(DebtTransaction)
        public readonly debtTransactionRepository: Repository<DebtTransaction>
    ) {
    }
    async execute(query: GetDebtTransactionByIdQuery): Promise<DebtTransaction> {
        return await this.debtTransactionRepository.findOne({
            where: {
            id: query.debtTransactionId
        },
            relations:{
                loanAccount: true,
                debtAccount: true
            }
        })
    }
}