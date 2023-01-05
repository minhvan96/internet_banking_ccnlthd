import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CreateBankInternalTransactionCommand } from "./create-bank-internal-transaction.command";
import { BankInternalTransaction } from "../../../entities/bank-internal-transaction.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { BankInternalAccount } from "../../../entities/bank-internal-account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {
  GetBankInternalAccountByAccountNumberQuery
} from "../../bank-internal-account/queries/get-bank-internal-account-by-account-number.query";
import { GetCustomerQuery } from "../../customer/queries/get-customer.query";
import { BankTransactionPaymentType } from "../../../entities/enums/bank-transaction-payment-type.enum";
import { AuthService } from "../../../auth/auth.service";

@CommandHandler(CreateBankInternalTransactionCommand)
export class CreateBankInternalTransactionHandler implements ICommandHandler<CreateBankInternalTransactionCommand> {
  private readonly fee = 10000;
  private readonly code: number;

  constructor(
    @InjectRepository(BankInternalTransaction)
    private readonly bankInternalTransactionRepository: Repository<BankInternalTransaction>,
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>,
    private readonly authService: AuthService,
    private readonly queryBus: QueryBus) {
    this.code = Math.floor(10000 + Math.random() * 90000);
  }

  async execute(command: CreateBankInternalTransactionCommand): Promise<any> {
    let sendToEmail = '';
    if (command.payload.transferAmount <= 0) {
      throw new BadRequestException("Transfer amount must be greater than 0");
    }
    if (command.payload.transferAmount % 50000 !== 0) {
      throw new BadRequestException("Transfer amount must be multiply by 50000");
    }
    if (command.payload.fromAccount === command.payload.toAccount) {
      throw new BadRequestException("Source and destination account cannot be the same");
    }

    let fromAccountNumber = command.payload.fromAccount;
    if (!command.payload.fromAccount) {
      const customer = await this.queryBus.execute(new GetCustomerQuery(command.payload.userId));
      if (!customer) {
        throw new NotFoundException(`Customer with Id = ${command.payload.userId} is not found`);
      }
      fromAccountNumber = customer.accountNumber;
      sendToEmail = customer.email;
    }

    const transferFromAccount = await this.queryBus.execute(new GetBankInternalAccountByAccountNumberQuery(fromAccountNumber));
    if (!transferFromAccount) {
      throw new NotFoundException(`Bank Account with account number = ${command.payload.fromAccount} is not found`);
    }

    const transferToAccount = await this.queryBus.execute(new GetBankInternalAccountByAccountNumberQuery(command.payload.toAccount));
    if (!transferToAccount) {
      throw new NotFoundException(`Bank Account with account number = ${command.payload.toAccount} is not found`);
    }

    let transferAmount = command.payload.transferAmount;
    if (command.payload.transactionPaymentType === BankTransactionPaymentType.SENDER_PAY) {
      transferAmount += this.fee;
    }
    if (transferFromAccount.balance < transferAmount) {
      throw new BadRequestException("Source account does not have enough money to process this transfer");
    }
    await this.authService.sendOtpVerifyTransactionAsync(sendToEmail, this.code);

    const transaction = new BankInternalTransaction(transferFromAccount,
      transferToAccount,
      command.payload.transferAmount,
      this.fee,
      command.payload.transactionPaymentType,
      this.code,
      command.payload.description);
    await this.bankInternalTransactionRepository.save(transaction);

    return transaction.id;
  }
}