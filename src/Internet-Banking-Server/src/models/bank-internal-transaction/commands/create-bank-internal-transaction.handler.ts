import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateBankInternalTransactionCommand } from './create-bank-internal-transaction.command';
import { BankInternalTransaction } from '../../../entities/bank-internal-transaction.entity';
import {
  GetBankInternalAccountByIdQuery
} from '../../bank-internal-account/queries/get-bank-internal-account-by-id.query';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    if(command.payload.from === command.payload.to){
      throw new BadRequestException("Source and destination account cannot be the same");
    }
    const transferFromAccount = await this.queryBus.execute(new GetBankInternalAccountByIdQuery(command.payload.from));
    if (!transferFromAccount) {
      throw new NotFoundException(`Bank Account with Id = ${command.payload.from} is not found`);
    }

    const transferToAccount = await this.queryBus.execute(new GetBankInternalAccountByIdQuery(command.payload.to));
    if (transferToAccount) {
      throw new NotFoundException(`Bank Account with Id = ${command.payload.to} is not found`);
    }

    if (transferFromAccount.balance < command.payload.amount) {
      throw new BadRequestException('Source account does not have enough money to process this transfer');
    }
    transferFromAccount.balance -= command.payload.amount;
    transferToAccount.balance += command.payload.amount;
    await this.bankInternalAccountRepository.save(transferFromAccount);
    await this.bankInternalAccountRepository.save(transferToAccount);

    const transaction = new BankInternalTransaction(transferFromAccount, transferToAccount, command.payload.amount, command.payload.description);
    await this.bankInternalTransactionRepository.save(transaction);
  }
}