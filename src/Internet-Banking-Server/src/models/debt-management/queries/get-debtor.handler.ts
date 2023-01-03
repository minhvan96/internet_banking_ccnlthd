import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetDebtorQuery} from "./get-debtor.query";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../../../entities/identity/user.entity";

@QueryHandler(GetDebtorQuery)
export class GetDebtorHandler implements IQueryHandler<GetDebtorQuery>{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }
    async execute(query: GetDebtorQuery): Promise<any> {
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