import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { VerifyBankInternalTransactionCommand } from "./verify-bank-internal-transaction.command";
import { InjectRepository } from "@nestjs/typeorm";
import { BankInternalTransaction } from "../../../entities/bank-internal-transaction.entity";
import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import {
  GetBankInternalAccountByAccountNumberQuery
} from "../../bank-internal-account/queries/get-bank-internal-account-by-account-number.query";
import { BankTransactionPaymentType } from "../../../entities/enums/bank-transaction-payment-type.enum";
import { BankInternalAccount } from "../../../entities/bank-internal-account.entity";

@CommandHandler(VerifyBankInternalTransactionCommand)
export class VerifyBankInternalTransactionHandler implements ICommandHandler<VerifyBankInternalTransactionCommand> {
  fee = 10000;

  constructor(
    @InjectRepository(BankInternalTransaction)
    private readonly bankInternalTransactionRepository: Repository<BankInternalTransaction>,
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>,
    private readonly queryBus: QueryBus
  ) {
  }

  async execute(command: VerifyBankInternalTransactionCommand): Promise<any> {
    const transfer = await this.bankInternalTransactionRepository.findOne({
      where: {
        id: command.payload.transferId
      },
      relations: {
        transferFrom: true,
        transferTo: true
      }
    });


    if (!transfer)
      throw new NotFoundException(`Bank transfer with id = ${command.payload.transferId} not found`);

    if (command.payload.verificationCode != transfer.verifyCode) {
      throw new BadRequestException("Verification code is incorrect");
    }

    const transferFromAccount = await this.queryBus.execute(new GetBankInternalAccountByAccountNumberQuery(transfer.transferFrom.accountNumber));
    if (!transferFromAccount) {
      throw new NotFoundException(`Bank Account with account number = ${transfer.transferFrom.accountNumber} is not found`);
    }

    const transferToAccount = await this.queryBus.execute(new GetBankInternalAccountByAccountNumberQuery(transfer.transferTo.accountNumber));
    if (!transferToAccount) {
      throw new NotFoundException(`Bank Account with account number = ${transfer.transferTo.accountNumber} is not found`);
    }

    let transferAmount = transfer.transferAmount;
    let receiverAmount = transferAmount;
    if (transfer.transactionPaymentType === BankTransactionPaymentType.RECEIVER_PAY) {
      receiverAmount -= this.fee;
    } else {
      transferAmount += this.fee;
    }
    if (transferFromAccount.balance < transferAmount) {
      throw new BadRequestException("Source account does not have enough money to process this transfer");
    }

    transferFromAccount.balance -= transferAmount;
    transferToAccount.balance += receiverAmount;
    await this.bankInternalAccountRepository.save(transferFromAccount);
    await this.bankInternalAccountRepository.save(transferToAccount);

    await this.bankInternalTransactionRepository.update({
      id: transfer.id
    }, {
      isVerified: true,
      verifyCode: null
    });
  }

}