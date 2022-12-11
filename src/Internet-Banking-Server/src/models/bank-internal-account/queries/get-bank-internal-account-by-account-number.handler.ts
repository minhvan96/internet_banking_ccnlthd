import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBankInternalAccountByIdQuery } from './get-bank-internal-account-by-id.query';
import { BankInternalAccountResponseModel } from '../response-models/bank-internal-account.response-model';
import { InjectRepository } from '@nestjs/typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { Repository } from 'typeorm';
import { GetBankInternalAccountByAccountNumberQuery } from './get-bank-internal-account-by-account-number.query';

@QueryHandler(GetBankInternalAccountByAccountNumberQuery)
export class GetBankInternalAccountByAccountNumberHandler implements IQueryHandler<GetBankInternalAccountByAccountNumberQuery> {
  constructor(
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>) {
  }

  async execute(query: GetBankInternalAccountByAccountNumberQuery): Promise<BankInternalAccountResponseModel> {
    const bankInternalAccount = await this.bankInternalAccountRepository.findOneBy({
      accountNumber: query.accountNumber,
    })
    return bankInternalAccount;
  }
}