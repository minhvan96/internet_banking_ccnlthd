import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateInternalBankTransferCommand } from './create-internal-bank-transfer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import {
  GetBankInternalAccountByAccountNumberQuery
} from '../../bank-internal-account/queries/get-bank-internal-account-by-account-number.query';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateInternalBankTransferCommand)
export class CreateInternalBankTransferHandler implements ICommandHandler<CreateInternalBankTransferCommand> {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly queryBus: QueryBus) {
  }

  async execute(command: CreateInternalBankTransferCommand): Promise<any> {
    const bankInternalAccount = await this.queryBus.execute(new GetBankInternalAccountByAccountNumberQuery(command.payload.internalAccountNumber))
    if(!bankInternalAccount){
      throw new NotFoundException(`Destination bank internal account ${command.payload.internalAccountNumber} is not found`);
    }
  }
}