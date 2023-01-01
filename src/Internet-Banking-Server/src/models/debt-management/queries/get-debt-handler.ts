import {IQueryHandler, QueryBus, QueryHandler} from "@nestjs/cqrs";
import {GetDebt} from "./get-debt.query";
import {GetCustomerQuery} from "../../customer/queries/get-customer.query";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DebtManagement} from "../../../entities/debt-management.entity";
import {NotFoundException} from "@nestjs/common";

@QueryHandler(GetCustomerQuery)
export class getDebtHandler implements IQueryHandler<GetDebt> {
    constructor(
        @InjectRepository(DebtManagement)
        private readonly debtManagement: Repository<DebtManagement>,
        private readonly queryBus: QueryBus,
    ) {
    }

    async execute(query: GetDebt): Promise<any> {
        const customer = await this.queryBus.execute(new GetCustomerQuery(query.payload.userId));
        if (!customer) {
            throw new NotFoundException(`Customer with Id = ${query.payload.userId} is not found`);
        }
        let condition = {};
        let select = {};

        if(query.payload.isCreated){
            condition= {
                where: {
                    loanAccount: customer.accountNumber,
                    idDeleted: false
                }
            };
            select = {
                id: true,
                transferAmount: true,
                description: true,
                isPaid: true,
                createdDate: true,
                updatedDate: true,
                debitAccount: {
                    accountNumber: true
                },
            }
        }else{
            if(query.payload.isPaid){
                condition = {
                    where: {
                        debitAccount: customer.accountNumber,
                        isPaid: query.payload.isPaid,
                        idDeleted: false
                    }
                }

            }else{
                condition = {
                    where: {
                        debitAccount: customer.accountNumber,
                        idDeleted: false
                    }
                };
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
        return await this.debtManagement.findOne({
            where: condition,
            select: select
        });
    }
}