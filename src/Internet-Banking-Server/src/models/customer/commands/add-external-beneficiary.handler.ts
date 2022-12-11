import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddInternalBeneficiaryCommand } from './add-internal-beneficiary.command';
import { Repository } from 'typeorm';
import { User } from '../../../entities/identity/user.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddExternalBeneficiaryCommand } from './add-external-beneficiary.command';
import { BankExternalAccount } from '../../../entities/bank-external-account.entity';
import { CustomerExternalBeneficiary } from '../../../entities/customer-external-beneficiary.entity';

@CommandHandler(AddInternalBeneficiaryCommand)
export class AddExternalBeneficiaryHandler implements ICommandHandler<AddExternalBeneficiaryCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BankExternalAccount)
    private readonly bankExternalAccountRepository: Repository<BankExternalAccount>) {
  }

  async execute(command: AddExternalBeneficiaryCommand): Promise<any> {
    const user = await this.userRepository.findOneBy({
      id: command.userId,
    });
    if (!user) {
      throw new NotFoundException(`User with id = ${command.userId} not found`);
    }

    const externalBankAccount = await this.bankExternalAccountRepository.findOneBy({
      id: command.payload.bankExternalAccountId
    })
    if (!externalBankAccount) {
      throw new NotFoundException(`Internal Bank Account with id = ${command.payload.bankExternalAccountId} not found`);
    }

    const newBeneficiary = new CustomerExternalBeneficiary(command.payload.alias, externalBankAccount);
    user.customerExternalBeneficiaries.push(newBeneficiary);
    await this.userRepository.save(user);
  }
}