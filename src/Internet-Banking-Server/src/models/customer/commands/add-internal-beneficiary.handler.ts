import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddInternalBeneficiaryCommand } from './add-internal-beneficiary.command';
import { Repository } from 'typeorm';
import { User } from '../../../entities/identity/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CustomerInternalBeneficiary } from '../../../entities/customer-internal-beneficiary.entity';
import { BankInternalAccount } from '../../../entities/bank-internal-account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalBeneficiaryResponseModel } from '../response-models/internal-beneficiary.response-model';

@CommandHandler(AddInternalBeneficiaryCommand)
export class AddInternalBeneficiaryHandler implements ICommandHandler<AddInternalBeneficiaryCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(BankInternalAccount)
    private readonly bankInternalAccountRepository: Repository<BankInternalAccount>) {
  }

  async execute(command: AddInternalBeneficiaryCommand): Promise<InternalBeneficiaryResponseModel> {
    const user = await this.userRepository.findOne({
      where: {
        id: command.userId,
      },
      relations: {
        bankAccount: true,
        customerInternalBeneficiaries: true
      },
      select: {
        id: true,
        bankAccount: {
          accountNumber: true
        }
      }
    });
    if (!user) {
      throw new NotFoundException(`User with id = ${command.userId} not found`);
    }
    if (command.payload.bankAccountNumber === user.bankAccount.accountNumber) {
      throw new BadRequestException('Cannot add your bank account as a beneficiary');
    }

    const internalBankAccount = await this.bankInternalAccountRepository.findOneBy({
      accountNumber: command.payload.bankAccountNumber
    })
    if (!internalBankAccount) {
      throw new NotFoundException(`Internal Bank Account with account number = ${command.payload.bankAccountNumber} is not found`);
    }

    const newBeneficiary = new CustomerInternalBeneficiary(command.payload.alias, internalBankAccount);
    user.customerInternalBeneficiaries.push(newBeneficiary);
    await this.userRepository.save(user);
    return new InternalBeneficiaryResponseModel(newBeneficiary.alias, newBeneficiary.bankAccount.accountNumber);
  }
}