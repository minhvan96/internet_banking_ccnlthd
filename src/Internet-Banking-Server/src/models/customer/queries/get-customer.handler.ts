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
    const user : CustomerResponseModel = await this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user.bankAccount', 'bankAccount')
      .where('user.id = :userId', {userId: query.id})
      .select(['user.id', 'user.userName', 'bankAccount.accountNumber', 'bankAccount.balance'])
      .execute();
    return user
  }
}