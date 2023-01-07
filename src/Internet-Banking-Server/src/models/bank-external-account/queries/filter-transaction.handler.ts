import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FilterTransactionQuery} from "./filter-transaction.query";
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
                }
            }

        }
        else if(query.payload.fromDate && query.payload.toDate){
            condition = {
                createdDate: Between(
                    new Date(query.payload.fromDate),
                    new Date(query.payload.toDate)
                ),
            }
        }
        else if(query.payload.bank){
            condition = { external: {
                    externalBank:{
                        name: query.payload.bank
                    }
                }}
        }

        return this.bankExternalTransactionRepository.find({
            where: condition,
            select: selection
        })

    }

}