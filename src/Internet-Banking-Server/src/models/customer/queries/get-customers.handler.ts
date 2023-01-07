import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCustomersQuery } from "./get-customers.query";
import { CustomerResponseModel } from "../response-models/customer.response-model";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../entities/identity/user.entity";
import { Repository } from "typeorm";
import { RoleConstants } from "../../../common/constants/role-constants";

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async execute(query: GetCustomersQuery): Promise<CustomerResponseModel[]> {
    const customers = await this.userRepository.find({
      where: {
        roles: {
          name: RoleConstants.Customer
        }
      },
      relations: {
        bankAccount: true
      },
      select: {
        id: true,
        userName: true,
        email: true,
        bankAccount: {
          accountNumber: true,
          balance: true
        }
      }
    });
    return customers.map(customer => new CustomerResponseModel(
      customer.id,
      customer.userName,
      customer.email,
      customer.bankAccount.accountNumber,
      customer.bankAccount.balance));
  }
}