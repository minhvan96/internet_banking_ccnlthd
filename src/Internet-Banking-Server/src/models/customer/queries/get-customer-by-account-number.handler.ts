import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetCustomerByAccountNumberQuery} from "./get-customer-by-account-number.query";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../entities/identity/user.entity";
import {Repository} from "typeorm";

@QueryHandler(GetCustomerByAccountNumberQuery)
export class GetCustomerByAccountNumberHandler implements IQueryHandler<GetCustomerByAccountNumberQuery>{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }
    async execute(query: GetCustomerByAccountNumberQuery): Promise<any> {
        return this.userRepository.findOne({
            where:{
                bankAccount:{
                    accountNumber: query.accountNumber
                }
            },select: {
                id: true
            }
        })
    }
}