import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {
    FilterExternalTransactionResponse,
    FilterTransactionQuery,
    FilterTransactionResponse
} from "./filter-transaction.query";
import {InjectRepository} from "@nestjs/typeorm";
import {BankExternalTransaction} from "../../../entities/bank-external-transaction.entity";
import {Between, Repository} from "typeorm";

@QueryHandler(FilterTransactionQuery)
export class FilterTransactionHandler implements IQueryHandler<FilterTransactionQuery>{
    constructor(
        @InjectRepository(BankExternalTransaction)
        private bankExternalTransactionRepository: Repository<BankExternalTransaction>
    ) {
    }
    async execute(query: FilterTransactionQuery): Promise<any> {
        let condition;
        let selection = {
            id: true,
            external: {
                accountNumber: true
            },
            transferAmount: true
        }
        if(query.payload.bank && query.payload.fromDate && query.payload.toDate){
            condition = {
                createdDate: Between(
                    new Date(query.payload.fromDate),
                    new Date(query.payload.toDate)
                ),
                external: {
                    externalBank:{
                        name: query.payload.bank
                    }
                },
                isDeleted: false
            }

        }
        else if(query.payload.fromDate && query.payload.toDate){
            condition = {
                createdDate: Between(
                    new Date(query.payload.fromDate),
                    new Date(query.payload.toDate)
                ),
                isDeleted: false
            }
        }
        else if(query.payload.bank){
            condition = { external: {
                    externalBank:{
                        name: query.payload.bank
                    }
                },
                isDeleted: false
            }
        }

        const trans : BankExternalTransaction[] =  await this.bankExternalTransactionRepository.find({
            where: condition,
            relations:{
                external: {
                    externalBank: true
                },
            },
            select: {
                id: true,
                external: {
                    externalBank:{
                        name: true
                    },
                    accountNumber: true
                },
                transferAmount: true,
                createdDate: true,
                description: true
            }
        })

        let totalAmount : number = 0;
        let arrayTransaction: FilterTransactionResponse[] = []
        trans.forEach(value => {
            totalAmount += value.transferAmount;
            arrayTransaction.push(new FilterTransactionResponse(value.id, value.external.externalBank.name,
                value.external.accountNumber, value.transferAmount, value.description, value.createdDate))
        })

        return new FilterExternalTransactionResponse(arrayTransaction, totalAmount);
    }

}