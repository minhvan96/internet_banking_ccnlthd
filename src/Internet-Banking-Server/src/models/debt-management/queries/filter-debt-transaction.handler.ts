import {IQueryHandler, QueryBus, QueryHandler} from "@nestjs/cqrs";
import {DebtFilterResponse, FilterDebtTransactionQuery} from "./filter-debt-transactions.query";
import {GetCustomerQuery} from "../../customer/queries/get-customer.query";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";
import {DebtTransaction} from "../../../entities/debt-transaction.entity";

@QueryHandler(FilterDebtTransactionQuery)
export class FilterDebtTransactionHandler implements IQueryHandler<FilterDebtTransactionQuery> {
    constructor(
        @InjectRepository(DebtTransaction)
        private readonly debtTransactionRepository: Repository<DebtTransaction>,
        private readonly queryBus: QueryBus,
    ) {
    }

    async execute(query: FilterDebtTransactionQuery): Promise<any> {
        const customer = await this.queryBus.execute(new GetCustomerQuery(query.payload.userId));
        if (!customer) {
            throw new NotFoundException(`Customer with Id = ${query.payload.userId} is not found`);
        }
        let condition = {};
        let select = {};
        let relation={};
        if(query.payload.isCreator){
            condition= {
                loanAccount: { accountNumber: customer.accountNumber},
                isDeleted: false
            };

            relation= {
                debtAccount: true,
            }

            select = {
                id: true,
                transferAmount: true,
                description: true,
                isPaid: true,
                createdDate: true,
                updatedDate: true,
                debtAccount: {
                    accountNumber: true
                },
            }
        }else{
            if(query.payload.isUnpaid){
                condition = {
                    debtAccount: {accountNumber: customer.accountNumber},
                    isPaid: false,
                    isDeleted: false
                }

            }else{
                condition = {
                    debtAccount: {accountNumber: customer.accountNumber},
                    isDeleted: false
                };
            }
            relation = {
                loanAccount: true,
            }
            select = {
                id: true,
                transferAmount: true,
                description: true,
                isPaid: true,
                createdDate: true,
                updatedDate: true,
                loanAccount: {
                    accountNumber: true
                },
            }
        }
        const trans =  await this.debtTransactionRepository.find({
            where: condition,
            relations: relation,
            select: select
        });

        return trans.map(value => new DebtFilterResponse(value.id,
            value.debtAccount? value.debtAccount.accountNumber : value.loanAccount.accountNumber,
            value.transferAmount, value.description, value.createdDate, value.updatedDate, value.isPaid))
    }
}