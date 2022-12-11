import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBankInternalAccountQuery } from './get-bank-internal-account.query';
import { BankInternalAccountResponseModel } from '../response-models/bank-internal-account.response-model';
import { InjectRepository } from '@nestjs/typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetBankInternalAccountQuery)
export class GetBankInternalAccountHandler implements IQueryHandler<GetBankInternalAccountQuery> {
  constructor(
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>) {
  }

  async execute(query: GetBankInternalAccountQuery): Promise<BankInternalAccountResponseModel> {
    const bankInternalAccount = await this.bankInternalAccountRepository.findOneBy({
      id: query.accountId,
    })
    return bankInternalAccount;
  }
}