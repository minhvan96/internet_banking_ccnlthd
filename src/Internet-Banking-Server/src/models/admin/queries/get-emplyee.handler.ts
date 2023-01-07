import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetEmployeeQuery} from "./get-employee.query";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../entities/identity/user.entity";
import {Repository} from "typeorm";
import {RoleConstants} from "../../../common/constants/role-constants";

@QueryHandler(GetEmployeeQuery)
export class GetEmplyeeHandler implements IQueryHandler<GetEmployeeQuery>{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }
    async execute(query: GetEmployeeQuery): Promise<any> {
        return this.userRepository.find({
            where: {
                roles: {
                    name: RoleConstants.Employee,
                },
                isDeleted: false
            },
            select:{
                id: true,
                userName : true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                email: true
            }
        })
    }

}