import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateBankInternalTransactionCommand } from './create-bank-internal-transaction.command';
import { BankInternalTransaction } from '../../../entities/bank-internal-transaction.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GetBankInternalAccountByAccountNumberQuery
} from '../../bank-internal-account/queries/get-bank-internal-account-by-account-number.query';
import { GetCustomerQuery } from '../../customer/queries/get-customer.query';

@CommandHandler(CreateBankInternalTransactionCommand)
export class CreateBankInternalTransactionHandler implements ICommandHandler<CreateBankInternalTransactionCommand> {

  constructor(
    @InjectRepository(BankInternalTransaction)
    private readonly bankInternalTransactionRepository: Repository<BankInternalTransaction>,
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>,
    private readonly queryBus: QueryBus) {
  }

  async execute(command: CreateBankInternalTransactionCommand): Promise<any> {
    if(command.payload.transferAmount <= 0){
      throw new BadRequestException("Transfer amount must be greater than 0");
    }
    if(command.payload.transferAmount % 50000 !== 0){
      throw new BadRequestException("Transfer amount must be multiply by 50000");
    }
    if (command.payload.fromAccount === command.payload.toAccount) {
      throw new BadRequestException('Source and destination account cannot be the same');
    }

    let fromAccountNumber = command.payload.fromAccount;
    if(!command.payload.fromAccount){
      const customer = await this.queryBus.execute(new GetCustomerQuery(command.payload.userId));
      if(!customer){
        throw new NotFoundException(`Customer with Id = ${command.payload.userId} is not found`);
      }
      fromAccountNumber = customer.accountNumber;
    }

    const transferFromAccount = await this.queryBus.execute(new GetBankInternalAccountByAccountNumberQuery(fromAccountNumber));
    if (!transferFromAccount) {
      throw new NotFoundException(`Bank Account with account number = ${command.payload.fromAccount} is not found`);
    }

    const transferToAccount = await this.queryBus.execute(new GetBankInternalAccountByAccountNumberQuery(command.payload.toAccount));
    if (!transferToAccount) {
      throw new NotFoundException(`Bank Account with account number = ${command.payload.toAccount} is not found`);
    }

    if (transferFromAccount.balance < command.payload.transferAmount) {
      throw new BadRequestException('Source account does not have enough money to process this transfer');
    }
    transferFromAccount.balance -= command.payload.transferAmount;
    transferToAccount.balance += command.payload.transferAmount;
    await this.bankInternalAccountRepository.save(transferFromAccount);
    await this.bankInternalAccountRepository.save(transferToAccount);

    const transaction = new BankInternalTransaction(transferFromAccount, transferToAccount, command.payload.transferAmount, command.payload.description);
    await this.bankInternalTransactionRepository.save(transaction);
  }
}