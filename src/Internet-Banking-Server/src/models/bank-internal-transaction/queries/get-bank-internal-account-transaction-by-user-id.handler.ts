import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  GetBankInternalAccountTransactionByUserIdQuery
} from './get-bank-internal-account-transaction-by-user-id.query';
import { Repository } from 'typeorm';
import { User } from '../../../entities/identity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import {
  GetBankInternalAccountTransactionByAccountQuery
} from './get-bank-internal-account-transaction-by-account.query';
import { BankInternalTransactionResponseModel } from '../response-models/bank-internal-transaction.response-model';

@QueryHandler(GetBankInternalAccountTransactionByUserIdQuery)
export class GetBankInternalAccountTransactionByUserIdHandler implements IQueryHandler<GetBankInternalAccountTransactionByUserIdQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly queryBus: QueryBus) {
  }

  async execute(query: GetBankInternalAccountTransactionByUserIdQuery): Promise<BankInternalTransactionResponseModel[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: query.userId
      },
      relations: {
        bankAccount: true
      }
    });
    if (!user) {
      throw new NotFoundException(`User with id = ${query.userId} is not found`);
    }

    return await this.queryBus.execute(new GetBankInternalAccountTransactionByAccountQuery(user.bankAccount.accountNumber));
  }
}