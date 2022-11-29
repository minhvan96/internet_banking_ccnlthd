import { ICommandHandler } from '@nestjs/cqrs';
import { AddBankInternalAccountCommand } from './add-bank-internal-account.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/identity/user.entity';
import { Repository } from 'typeorm';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';

export class AddBankInternalAccountHandler implements ICommandHandler<AddBankInternalAccountCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async execute(command: AddBankInternalAccountCommand): Promise<any> {
    const user = await this.userRepository.findOneBy({
      id: command.userId
    })
    const bankAccount = new BankInternalAccount("test");
    user.bankAccounts.push(bankAccount);
    await this.userRepository.save(user);
  }
}