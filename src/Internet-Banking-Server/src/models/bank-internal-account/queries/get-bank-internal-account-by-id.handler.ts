import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBankInternalAccountByIdQuery } from './get-bank-internal-account-by-id.query';
import { BankInternalAccountResponseModel } from '../response-models/bank-internal-account.response-model';
import { InjectRepository } from '@nestjs/typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetBankInternalAccountByIdQuery)
export class GetBankInternalAccountByIdHandler implements IQueryHandler<GetBankInternalAccountByIdQuery> {
  constructor(
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>) {
  }

  async execute(query: GetBankInternalAccountByIdQuery): Promise<BankInternalAccountResponseModel> {
    const bankInternalAccount = await this.bankInternalAccountRepository.findOneBy({
      id: query.accountId,
    })
    return bankInternalAccount;
  }
}