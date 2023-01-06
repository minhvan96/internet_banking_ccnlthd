import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {
  GetBankInternalAccountTransactionToByAccountQuery
} from "./get-bank-internal-account-transaction-to-by-account.query";
import { NotFoundException } from "@nestjs/common";
import { BankInternalTransactionResponseModel } from "../response-models/bank-internal-transaction.response-model";
import { InjectRepository } from "@nestjs/typeorm";
import { BankInternalAccount } from "../../../entities/bank-internal-account.entity";
import { Repository } from "typeorm";
import { BankInternalTransaction } from "../../../entities/bank-internal-transaction.entity";

@QueryHandler(GetBankInternalAccountTransactionToByAccountQuery)
export class GetBankInternalAccountTransactionToByAccountHandler implements IQueryHandler<GetBankInternalAccountTransactionToByAccountQuery> {
  constructor(
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>,
    @InjectRepository(BankInternalTransaction)
    private readonly bankInternalTransactionRepository: Repository<BankInternalTransaction>
  ) {
  }

  async execute(query: GetBankInternalAccountTransactionToByAccountQuery): Promise<any> {
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
        transferTo: {
          accountNumber: account.accountNumber
        },
        isDeleted: false
      },
      relations: {
        transferFrom: true,
        transferTo: true
      }
    });
    return bankInternalTransactions.map(tran => new BankInternalTransactionResponseModel(
      tran.id,
      tran.transferFrom.accountNumber,
      tran.transferTo.accountNumber,
      tran.transferAmount,
      tran.description,
      tran.fee,
      tran.transactionPaymentType));
  }

}