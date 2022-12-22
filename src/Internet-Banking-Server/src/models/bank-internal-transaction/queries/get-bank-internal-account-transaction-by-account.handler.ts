import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetBankInternalAccountTransactionByAccountQuery
} from './get-bank-internal-account-transaction-by-account.query';
import { InjectRepository } from '@nestjs/typeorm';
import { BankInternalTransaction } from '../../../entities/bank-internal-transaction.entity';
import { Repository } from 'typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { NotFoundException } from '@nestjs/common';
import { BankInternalTransactionResponseModel } from '../response-models/bank-internal-transaction.response-model';

@QueryHandler(GetBankInternalAccountTransactionByAccountQuery)
export class GetBankInternalAccountTransactionByAccountHandler implements IQueryHandler<GetBankInternalAccountTransactionByAccountQuery> {
  constructor(
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>,
    @InjectRepository(BankInternalTransaction)
    private readonly bankInternalTransactionRepository: Repository<BankInternalTransaction>
  ) {
  }

  async execute(query: GetBankInternalAccountTransactionByAccountQuery): Promise<BankInternalTransactionResponseModel[]> {
    const account = await this.bankInternalAccountRepository.findOne({
      where: {
        accountNumber: query.accountNumber
      }
    });

    if (!account) {
      throw new NotFoundException(`Bank internal account with Account Number ${query.accountNumber} is not found!!`);
    }

    const bankInternalTransactions = await this.bankInternalTransactionRepository.find({
      where: {
        transferFrom: {
          accountNumber: account.accountNumber
        },
        idDeleted: false
      },
      relations: {
        transferFrom: true,
        transferTo: true
      }
    });
    return bankInternalTransactions.map(tran => new BankInternalTransactionResponseModel(tran.transferFrom.accountNumber,
      tran.transferTo.accountNumber,
      tran.transferAmount,
      tran.description,
      tran.fee,
      tran.transactionPaymentType));
  }
}