import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddBankInternalAccountCommand } from './add-bank-internal-account.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(AddBankInternalAccountCommand)
export class AddBankInternalAccountHandler implements ICommandHandler<AddBankInternalAccountCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async execute(command: AddBankInternalAccountCommand): Promise<string> {
    const user = await this.userRepository.findOneBy({
      id: command.userId,
    });

    if(!user)
      throw new NotFoundException(`User with Id ${command.userId} is not found`);

    user.bankAccount = new BankInternalAccount(user.phoneNumber);
    await this.userRepository.save(user);

    return user.bankAccount.accountNumber;
  }
}