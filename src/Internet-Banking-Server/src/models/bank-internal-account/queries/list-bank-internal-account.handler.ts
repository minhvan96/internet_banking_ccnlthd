import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListBankInternalAccountQuery } from './list-bank-internal-account.query';
import { BankInternalAccountResponseModel } from '../response-models/bank-internal-account.response-model';
import { InjectRepository } from '@nestjs/typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { Repository } from 'typeorm';

@QueryHandler(ListBankInternalAccountQuery)
export class ListBankInternalAccountHandler implements IQueryHandler<ListBankInternalAccountQuery> {
  constructor(
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>
  ) {
  }

  async execute(query: ListBankInternalAccountQuery): Promise<BankInternalAccountResponseModel[]> {
    const bankInternalAccounts = await this.bankInternalAccountRepository.findBy({

    });
    return bankInternalAccounts;
  }
}