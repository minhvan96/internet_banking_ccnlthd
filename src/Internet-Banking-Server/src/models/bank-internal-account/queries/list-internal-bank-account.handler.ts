import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListInternalBankAccountQuery } from './list-internal-bank-account.query';
import { BankInternalAccountResponseModel } from '../response-models/bank-internal-account.response-model';
import { InjectRepository } from '@nestjs/typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { Repository } from 'typeorm';

@QueryHandler(ListInternalBankAccountQuery)
export class ListInternalBankAccountHandler implements IQueryHandler<ListInternalBankAccountQuery> {
  constructor(
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>
  ) {
  }

  execute(query: ListInternalBankAccountQuery): Promise<BankInternalAccountResponseModel> {
    return Promise.resolve(undefined);
  }
}