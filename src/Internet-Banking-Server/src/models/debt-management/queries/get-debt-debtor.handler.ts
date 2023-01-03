import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetDebtDebtorQuery} from "./get-debt-debtor.query";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DebtCustomer} from "../../../entities/debt-customer.entity";
import {User} from "../../../entities/identity/user.entity";

@QueryHandler(GetDebtDebtorQuery)
export class GetDebtDebtorHandler implements IQueryHandler<GetDebtDebtorQuery>{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }
    async execute(query: GetDebtDebtorQuery): Promise<any> {
        const user = await this.userRepository.findOne({
            where:{
                id: query.userId
            },
            relations:{
                debtCustomer: true
            },
            select:{
                id: false,
                debtCustomer:{
                    id: true,
                    alias: true
                }
            }
        })
        return user.debtCustomer;
    }

}