import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddInternalBeneficiaryCommand } from './add-internal-beneficiary.command';
import { Repository } from 'typeorm';
import { User } from '../../../entities/identity/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CustomerInternalBeneficiary } from '../../../entities/customer-internal-beneficiary.entity';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';

@CommandHandler(AddInternalBeneficiaryCommand)
export class AddInternalBeneficiaryHandler implements ICommandHandler<AddInternalBeneficiaryCommand> {
  constructor(private readonly userRepository: Repository<User>,
              private readonly bankInternalAccountRepository: Repository<BankInternalAccount>) {
  }

  async execute(command: AddInternalBeneficiaryCommand): Promise<any> {
    const user = await this.userRepository.findOneBy({
      id: command.userId,
    });
    if (!user) {
      throw new NotFoundException(`User with id = ${command.userId} not found`);
    }

    const internalBankAccount = await this.bankInternalAccountRepository.findOneBy({
      id: command.payload.bankAccountId
    })
    if (!internalBankAccount) {
      throw new NotFoundException(`Internal Bank Account with id = ${command.payload.bankAccountId} not found`);
    }

    const newBeneficiary = new CustomerInternalBeneficiary(command.payload.alias, internalBankAccount);
    user.customerInternalBeneficiaries.push(newBeneficiary);
    await this.userRepository.save(user);
  }

}