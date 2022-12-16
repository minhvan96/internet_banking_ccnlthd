import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerQuery } from './get-customer.query';
import { CustomerResponseModel } from '../response-models/customer.response-model';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async execute(query: GetCustomerQuery): Promise<CustomerResponseModel> {
    const user = await this.userRepository.findOne({
      where: {
        id: query.id
      },
      relations:{
        bankAccount: true
      },
      select:{
        id: true,
        userName: true,
        bankAccount:{
          accountNumber: true,
          balance: true
        }
      }
    })
    return new CustomerResponseModel(user.id, user.userName, user.bankAccount.accountNumber, user.bankAccount.balance);
  }
}